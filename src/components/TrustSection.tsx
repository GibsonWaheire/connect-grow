import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/shared/components/OptimizedImage';
import { useWhatsApp } from '@/shared/hooks/useWhatsApp';

const chatMessages = [
  {
    id: 1,
    name: "Sarah M.",
    message: "Peter, the research paper you wrote for me got an A+! My professor was impressed with the quality.",
    time: "2 days ago",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=center"
  },
  {
    id: 2,
    name: "Michael R.",
    message: "Thanks for the Python assignment help. The code was clean and well-documented. Got full marks!",
    time: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=center"
  },
  {
    id: 3,
    name: "Emily T.",
    message: "The presentation slides you created were perfect. My group presentation went really well.",
    time: "3 days ago",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=center"
  },
  {
    id: 4,
    name: "David L.",
    message: "Your help with the statistics assignment saved me. The explanations were clear and thorough.",
    time: "5 days ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=center"
  },
  {
    id: 5,
    name: "Jessica K.",
    message: "The essay you wrote was exactly what I needed. No AI detection and plagiarism-free!",
    time: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=center"
  }
];

const courses = {
  technical: [
    { name: "Python Programming", icon: "🐍" },
    { name: "Java Development", icon: "☕" },
    { name: "C++ Programming", icon: "⚡" },
    { name: "Data Analysis", icon: "📊" },
    { name: "Statistics", icon: "📈" },
    { name: "Mathematics", icon: "🔢" },
    { name: "Engineering", icon: "⚙️" },
    { name: "Machine Learning", icon: "🤖" }
  ],
  nonTechnical: [
    { name: "English Literature", icon: "📚" },
    { name: "History", icon: "🏛️" },
    { name: "Philosophy", icon: "🤔" },
    { name: "Psychology", icon: "🧠" },
    { name: "Sociology", icon: "👥" },
    { name: "Business", icon: "💼" },
    { name: "Marketing", icon: "📢" },
    { name: "Economics", icon: "💰" }
  ]
};

const samples = [
  { name: "Research Paper - Psychology", subject: "Psychology", type: "Research Paper", download: "#" },
  { name: "Python Code Analysis", subject: "Python", type: "Programming", download: "#" },
  { name: "Business Case Study", subject: "Business", type: "Case Study", download: "#" },
  { name: "Statistics Report", subject: "Statistics", type: "Report", download: "#" },
  { name: "Literature Review", subject: "English", type: "Literature Review", download: "#" },
  { name: "Marketing Presentation", subject: "Marketing", type: "PPT", download: "#" }
];

export const TrustSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<'technical' | 'nonTechnical'>('technical');

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trust & Quality
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what others are saying and explore the subjects I can help with
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Chat Messages Modal */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Recent Messages</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full h-12 text-lg">
                  View Recent Chat Messages
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Recent Client Messages</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {chatMessages.map((chat) => (
                    <Card key={chat.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <OptimizedImage
                          src={chat.avatar}
                          alt={chat.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground">{chat.name}</span>
                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{chat.message}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Course Categories */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Subjects I Help With</h3>
            <div className="space-y-6">
              <div className="flex gap-2 mb-4">
                <Button
                  variant={selectedCategory === 'technical' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('technical')}
                  className="flex-1"
                >
                  Technical
                </Button>
                <Button
                  variant={selectedCategory === 'nonTechnical' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('nonTechnical')}
                  className="flex-1"
                >
                  Non-Technical
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {courses[selectedCategory].map((course, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg border">
                    <span className="text-lg">{course.icon}</span>
                    <span className="text-sm font-medium">{course.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SamplesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sample Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download samples to see the quality of work I deliver
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {samples.map((sample, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{sample.name}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="secondary">{sample.subject}</Badge>
                  <Badge variant="outline">{sample.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Download Sample
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Quality Guarantee</h3>
            <p className="text-blue-800 mb-4">
              Every order comes with <strong>Turnitin report</strong> and <strong>plagiarism report</strong> attached. 
              I deliver <strong>100% human-written work</strong> - no AI content.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-700">
              <span>✓ Turnitin Report</span>
              <span>✓ Plagiarism Report</span>
              <span>✓ Human-Written Only</span>
              <span>✓ No AI Content</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
