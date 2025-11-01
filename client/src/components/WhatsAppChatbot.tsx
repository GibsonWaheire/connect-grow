import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { useWhatsApp } from '@/shared/hooks/useWhatsApp';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface QuickReply {
  label: string;
  value: string;
  action: 'quote' | 'purchase' | 'info' | 'support' | 'custom';
}

const QUICK_MESSAGES: Record<string, QuickReply[]> = {
  initial: [
    { label: "💼 Get a Quote", value: "I'm interested in getting a quote for your services", action: 'quote' },
    { label: "🛒 Make a Purchase", value: "I'd like to purchase a package", action: 'purchase' },
    { label: "ℹ️ Learn More", value: "Tell me more about your services", action: 'info' },
    { label: "💬 Need Support", value: "I need help with something", action: 'support' },
  ],
  quote: [
    { label: "🌐 Website Package", value: "I need a quote for the Website Starter package ($499)", action: 'custom' },
    { label: "📱 App Development", value: "I need a quote for the App Pro package ($1,999)", action: 'custom' },
    { label: "🛒 E-commerce Store", value: "I need a quote for the Commerce Plus package ($1,499)", action: 'custom' },
    { label: "📋 Custom Project", value: "I have a custom project requirement", action: 'custom' },
  ],
  purchase: [
    { label: "Website Starter - $499", value: "I want to purchase the Website Starter package for $499", action: 'custom' },
    { label: "App Pro - $1,999", value: "I want to purchase the App Pro package for $1,999", action: 'custom' },
    { label: "Commerce Plus - $1,499", value: "I want to purchase the Commerce Plus package for $1,499", action: 'custom' },
  ],
  info: [
    { label: "Our Services", value: "What services do you offer?", action: 'custom' },
    { label: "Pricing", value: "What are your pricing options?", action: 'custom' },
    { label: "Timeline", value: "How long does a typical project take?", action: 'custom' },
    { label: "Portfolio", value: "Can I see examples of your work?", action: 'custom' },
  ],
};

const BOT_RESPONSES: Record<string, string> = {
  quote: "Great! I'd be happy to help you get a quote. Which package are you interested in?",
  purchase: "Excellent choice! Which package would you like to purchase?",
  info: "I'm here to help! What would you like to know more about?",
  support: "I'm here to help! What do you need assistance with?",
  default: "Hi! I'm here to help. How can I assist you today?",
};

export const WhatsAppChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! 👋 I'm your assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [currentQuickReplies, setCurrentQuickReplies] = useState<QuickReply[]>(QUICK_MESSAGES.initial);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage } = useWhatsApp();

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  const handleQuickReply = (quickReply: QuickReply) => {
    addMessage(quickReply.value, 'user');
    
    setTimeout(() => {
      if (quickReply.action === 'quote') {
        const botResponse = BOT_RESPONSES.quote;
        addMessage(botResponse, 'bot');
        setCurrentQuickReplies(QUICK_MESSAGES.quote);
      } else if (quickReply.action === 'purchase') {
        const botResponse = BOT_RESPONSES.purchase;
        addMessage(botResponse, 'bot');
        setCurrentQuickReplies(QUICK_MESSAGES.purchase);
      } else if (quickReply.action === 'info') {
        const botResponse = BOT_RESPONSES.info;
        addMessage(botResponse, 'bot');
        setCurrentQuickReplies(QUICK_MESSAGES.info);
      } else {
        // Custom action - redirect to WhatsApp with the message
        sendToWhatsApp(quickReply.value);
      }
    }, 500);
  };

  const sendToWhatsApp = (message: string) => {
    sendMessage(message);
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    addMessage(inputMessage, 'user');
    setInputMessage('');

    // Simple bot response logic
    setTimeout(() => {
      const userMessage = inputMessage.toLowerCase();
      let botResponse = "Thanks for your message! Would you like to continue this conversation on WhatsApp?";

      if (userMessage.includes('quote') || userMessage.includes('price')) {
        botResponse = "I can help you get a quote! Which package interests you?";
        setCurrentQuickReplies(QUICK_MESSAGES.quote);
      } else if (userMessage.includes('purchase') || userMessage.includes('buy')) {
        botResponse = "Great! Which package would you like to purchase?";
        setCurrentQuickReplies(QUICK_MESSAGES.purchase);
      } else if (userMessage.includes('help') || userMessage.includes('support')) {
        botResponse = "I'm here to help! What do you need assistance with?";
        setCurrentQuickReplies(QUICK_MESSAGES.support || QUICK_MESSAGES.info);
      } else {
        botResponse = "I'd love to help you further! Let's continue this conversation on WhatsApp.";
      }

      addMessage(botResponse, 'bot');
    }, 800);
  };

  const handleOpenWhatsApp = () => {
    const lastUserMessage = messages.filter(m => m.sender === 'user').pop();
    const messageToSend = lastUserMessage?.text || "Hi! I'd like to get in touch.";
    sendToWhatsApp(messageToSend);
  };

  if (!isOpen && !isMinimized) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 animate-bounce-safe hover:scale-110 group"
        aria-label="Open WhatsApp Chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        
        <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with us on WhatsApp
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900" />
        </div>

        <style>{`
          @keyframes bounce-safe {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce-safe {
            animation: bounce-safe 2s infinite;
          }
        `}</style>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 left-6 z-50 ${isMinimized ? 'w-80' : 'w-96'} transition-all duration-300 safe-area-left safe-area-bottom`}>
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-green-500 overflow-hidden flex flex-col h-full max-h-[600px]">
        {/* Header */}
        <div className="bg-green-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">WhatsApp Support</h3>
              <p className="text-xs text-green-100">We usually reply instantly</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsMinimized(!isMinimized);
                if (isMinimized) setIsOpen(true);
              }}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label={isMinimized ? "Expand" : "Minimize"}
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsMinimized(false);
              }}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === 'user'
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-slate-900 border border-slate-200'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-green-100' : 'text-slate-500'
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Quick Replies */}
              {currentQuickReplies.length > 0 && (
                <div className="space-y-2">
                  {currentQuickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="w-full text-left px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-all text-sm"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-200 p-4 bg-white">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <Button
                onClick={handleOpenWhatsApp}
                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white"
                size="sm"
              >
                Continue on WhatsApp →
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

