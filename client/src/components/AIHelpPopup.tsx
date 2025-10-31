import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Bot, Send, X, MessageCircle, Zap, Star, AlertTriangle, Shield, RefreshCw } from 'lucide-react';
import { useWhatsApp } from '@/shared/hooks/useWhatsApp';

interface AIHelpFormData {
  name: string;
  email: string;
  subject: string;
  requirements: string;
  urgency: string;
  budget: string;
}

export const AIHelpPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { sendMessage } = useWhatsApp();
  const [formData, setFormData] = useState<AIHelpFormData>({
    name: '',
    email: '',
    subject: '',
    requirements: '',
    urgency: 'normal',
    budget: ''
  });

  // Show popup after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const generateRequirements = (type: string) => {
    const templates = {
      'ai-removal': `I need help removing AI detection from my work:

Subject: ${formData.subject || 'Academic Assignment'}

Current Situation:
- I used AI tools to help with my assignment
- My work is being flagged as AI-generated
- I need human rewriting to pass AI detection
- I want to keep the same content but make it human-written

Requirements:
- Remove all AI detection markers
- Rewrite content in human style
- Maintain academic quality and structure
- Ensure originality and authenticity
- Add human insights and personal analysis
- Include proper citations and references

Additional Notes:
- Please make it sound like I wrote it myself
- Keep the same topic and main points
- Add personal examples and experiences
- Use natural language patterns
- Ensure it passes Turnitin and other AI detectors`,

      'ai-rewrite': `I need my AI-generated work completely rewritten:

Subject: ${formData.subject || 'Academic Assignment'}

Current Situation:
- My assignment was written using AI
- I need it completely rewritten by a human
- I want to avoid AI detection completely
- I need original human research and analysis

Requirements:
- Complete human rewriting from scratch
- Original research and analysis
- Human-style writing patterns
- Personal insights and critical thinking
- Proper academic structure
- Original examples and case studies

Additional Notes:
- Please do fresh research on the topic
- Include current sources and references
- Add personal perspective and analysis
- Make it completely original work
- Ensure it's indistinguishable from human writing`,

      'ai-detection-fix': `I'm failing due to AI detection issues:

Subject: ${formData.subject || 'Academic Assignment'}

Current Situation:
- My work is being flagged as AI-generated
- I'm at risk of failing my course
- I need immediate help to fix this
- I want to understand what went wrong

Requirements:
- Identify AI detection markers in my work
- Provide human alternatives for AI phrases
- Rewrite problematic sections
- Add human writing patterns
- Include personal examples and experiences
- Ensure academic integrity

Additional Notes:
- Please help me understand AI detection
- Show me how to write more naturally
- Add personal insights and experiences
- Make it sound like my own work
- Include tips for future assignments`,

      'research-paper': `I need help with a research paper:

Subject: ${formData.subject || 'Research Topic'}

Requirements:
- Original research and analysis
- Well-structured academic paper
- Proper literature review
- Methodology section
- Data analysis and findings
- Conclusions and recommendations
- Proper citations and references

Additional Notes:
- Please ensure 100% human research
- Include current academic sources
- Add critical analysis and insights
- Follow academic writing standards
- Include proper formatting and structure
- Ensure originality and authenticity`,

      'thesis-help': `I need help with my thesis/dissertation:

Subject: ${formData.subject || 'Thesis Topic'}

Requirements:
- Comprehensive thesis development
- Literature review and gap analysis
- Research methodology design
- Data collection and analysis
- Results interpretation
- Discussion and implications
- Conclusion and recommendations

Additional Notes:
- Please ensure academic rigor
- Include extensive research
- Add critical analysis and insights
- Follow university guidelines
- Ensure originality and authenticity
- Include proper citations and references`,

      'custom': `I need custom help with my academic work:

Subject: ${formData.subject || 'Academic Topic'}

Requirements:
- Professional academic writing
- Original research and analysis
- Human-style writing patterns
- Proper academic structure
- Personal insights and critical thinking
- Proper citations and references

Additional Notes:
- Please ensure 100% human work
- Add personal examples and experiences
- Include current sources and references
- Make it sound natural and authentic
- Ensure it passes all detection tools
- Follow academic writing standards`
    };

    setFormData(prev => ({
      ...prev,
      requirements: templates[type as keyof typeof templates] || templates.custom
    }));
  };

  const handleSubmit = () => {
    const message = `Hi McGibs Digital Solutions! I need custom AI research help:

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Urgency: ${formData.urgency}
Budget: ${formData.budget}

Requirements:
${formData.requirements}

Please let me know if you can help with this custom request and provide a quote.`;

    sendMessage(message);
    setIsDialogOpen(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      requirements: '',
      urgency: 'normal',
      budget: ''
    });
  };

  if (!showPopup) return null;

  return (
    <>
      {/* Enhanced Blinking Popup */}
      <div className="fixed bottom-6 left-6 z-50">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div className="relative group cursor-pointer">
              {/* Main Button */}
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">🤖 AI Research Help</div>
                    <div className="text-sm opacity-90">Get expert assistance!</div>
                  </div>
                  <Zap className="w-5 h-5 animate-bounce" />
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </DialogTrigger>
          
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold flex items-center gap-3 text-center justify-center">
                <div className="relative">
                  <Bot className="w-8 h-8 text-purple-600" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  AI Research & Writing Help
                </span>
                <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Enhanced Info Section */}
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 p-6 rounded-xl border-2 border-purple-200 shadow-lg">
                <h3 className="font-bold text-purple-800 mb-4 text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  What I can help you with:
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Badge variant="secondary" className="text-sm py-2 px-3 bg-red-100 text-red-800 hover:bg-red-200">AI Removal</Badge>
                  <Badge variant="secondary" className="text-sm py-2 px-3 bg-orange-100 text-orange-800 hover:bg-orange-200">AI Rewriting</Badge>
                  <Badge variant="secondary" className="text-sm py-2 px-3 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Detection Fix</Badge>
                  <Badge variant="secondary" className="text-sm py-2 px-3 bg-green-100 text-green-800 hover:bg-green-200">Research Papers</Badge>
                  <Badge variant="secondary" className="text-sm py-2 px-3 bg-blue-100 text-blue-800 hover:bg-blue-200">Thesis Help</Badge>
                  <Badge variant="secondary" className="text-sm py-2 px-3 bg-purple-100 text-purple-800 hover:bg-purple-200">Custom Work</Badge>
                </div>
              </div>

              {/* Auto-Generate Options */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200 shadow-lg">
                <h3 className="font-bold text-amber-800 mb-4 text-lg flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-amber-600" />
                  Quick Templates (Click to Auto-Generate):
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => generateRequirements('ai-removal')}
                    className="h-12 text-sm bg-red-50 hover:bg-red-100 border-red-200 text-red-800 hover:text-red-900"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    AI Detection Removal
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => generateRequirements('ai-rewrite')}
                    className="h-12 text-sm bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-800 hover:text-orange-900"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Complete AI Rewrite
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => generateRequirements('ai-detection-fix')}
                    className="h-12 text-sm bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-yellow-800 hover:text-yellow-900"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Fix AI Detection Issues
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => generateRequirements('research-paper')}
                    className="h-12 text-sm bg-green-50 hover:bg-green-100 border-green-200 text-green-800 hover:text-green-900"
                  >
                    <Bot className="w-4 h-4 mr-2" />
                    Research Paper Help
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => generateRequirements('thesis-help')}
                    className="h-12 text-sm bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800 hover:text-blue-900"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Thesis/Dissertation Help
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => generateRequirements('custom')}
                    className="h-12 text-sm bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-800 hover:text-purple-900"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Custom Requirements
                  </Button>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold mb-2 block text-gray-700">Your Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      className="h-12 text-base"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block text-gray-700">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      className="h-12 text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block text-gray-700">Subject/Topic *</label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="e.g., Machine Learning, Business Strategy, Psychology Research"
                    className="h-12 text-base"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold mb-2 block text-gray-700">Urgency</label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="normal">Normal (3-5 days)</option>
                      <option value="urgent">Urgent (1-2 days)</option>
                      <option value="express">Express (Same day)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block text-gray-700">Budget Range</label>
                    <Input
                      value={formData.budget}
                      onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                      placeholder="e.g., $50-100, $100-200"
                      className="h-12 text-base"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-700">Detailed Requirements *</label>
                    <div className="text-xs text-gray-500">Click templates above to auto-generate</div>
                  </div>
                  <Textarea
                    value={formData.requirements}
                    onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                    placeholder="Describe your specific requirements, or click a template above to auto-generate..."
                    rows={10}
                    className="text-base"
                  />
                </div>
              </div>

              {/* Enhanced Submit Button */}
              <div className="flex gap-4">
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email || !formData.subject || !formData.requirements}
                  className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Send to WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="h-14 px-6"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Enhanced Note */}
              <div className="text-sm text-center space-y-2">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-800">✨ Our team will review your request and get back to you within 24 hours</p>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
                  <p className="font-semibold text-red-800">🚨 Specializing in AI detection removal and human rewriting</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                  <p className="font-semibold text-purple-800">💡 Click templates above to quickly generate professional requirements</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
