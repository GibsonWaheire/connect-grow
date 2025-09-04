import { useState } from 'react';
import { OptimizedImage } from "@/shared/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Clock, Shield, FileText, Code, Presentation, BookOpen, Calculator, DollarSign } from 'lucide-react';

// Pricing data
const pricingData = [
  {
    name: "Non-Technical Writing",
    price: "$8",
    unit: "per page",
    description: "Essays, research papers, literature reviews",
    features: ["275 words per page", "Turnitin report", "Plagiarism-free", "24/7 support"],
    icon: FileText,
    color: "bg-blue-500",
    popular: false
  },
  {
    name: "Technical Writing", 
    price: "$15",
    unit: "per page",
    description: "Programming, data analysis, technical reports",
    features: ["275 words per page", "Code explanations", "Turnitin report", "Expert review"],
    icon: Code,
    color: "bg-green-500",
    popular: true
  },
  {
    name: "PPT Presentations",
    price: "$5",
    unit: "per slide",
    description: "Professional slides with transcripts included",
    features: ["Transcript included", "Professional design", "Speaker notes", "Editable format"],
    icon: Presentation,
    color: "bg-purple-500",
    popular: false
  },
  {
    name: "Exam Help",
    price: "$30",
    unit: "per exam",
    description: "Complete exam assistance and guidance",
    features: ["Full exam support", "Study materials", "Practice questions", "Confidential"],
    icon: BookOpen,
    color: "bg-orange-500",
    popular: false
  },
  {
    name: "AI Work Refinement",
    price: "$10",
    unit: "per 500 words",
    description: "Remove AI detection and improve quality",
    features: ["AI detection removal", "Human-like writing", "Quality improvement", "Fast turnaround"],
    icon: Shield,
    color: "bg-red-500",
    popular: false
  }
];

// Urgency pricing
const urgencyOptions = [
  { name: "Standard", multiplier: 1, time: "3-5 days", color: "bg-gray-100" },
  { name: "Urgent", multiplier: 1.5, time: "24-48 hours", color: "bg-yellow-100" },
  { name: "Express", multiplier: 2, time: "12-24 hours", color: "bg-red-100" }
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
  { 
    name: "Research Paper - Psychology", 
    subject: "Psychology", 
    type: "Research Paper", 
    download: "https://drive.google.com/uc?export=download&id=1POlzd7atqCJQq9B32fi57NhT3HFrzk7e",
    description: "A+ quality research paper on cognitive psychology"
  },
  { 
    name: "Python Code Analysis", 
    subject: "Python", 
    type: "Programming", 
    download: "https://drive.google.com/uc?export=download&id=1FbD35TWHxrNBYww5siXK23vDS3Cuc1gx",
    description: "Clean, well-documented Python assignment"
  },
  { 
    name: "Business Case Study", 
    subject: "Business", 
    type: "Case Study", 
    download: "https://drive.google.com/uc?export=download&id=11yuP8eMYWkwHXsIg_nkDxaY2VfOhf-8P",
    description: "Comprehensive business analysis with real data"
  },
  { 
    name: "Literature Review", 
    subject: "English", 
    type: "Literature Review", 
    download: "https://drive.google.com/uc?export=download&id=1kIrygLick8hSlbzfSLCvaLic2LMkxIUq",
    description: "Academic literature review with proper citations"
  },
  { 
    name: "Statistics Report", 
    subject: "Statistics", 
    type: "Report", 
    download: "https://drive.google.com/uc?export=download&id=1mPcVy15xUwXqO5lDQg1EQQtY2QQ-eHe2",
    description: "Statistical analysis with clear explanations"
  },
  { 
    name: "Marketing Presentation", 
    subject: "Marketing", 
    type: "PPT", 
    download: "https://drive.google.com/uc?export=download&id=1FaqfrfEcELZrHUbpOFRCuThJK_UOCb08",
    description: "Professional marketing presentation slides"
  }
];

export const TrustSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<'technical' | 'nonTechnical'>('technical');

  const handleDownload = (url: string, name: string) => {
    if (url.includes('YOUR_FILE_ID_HERE')) {
      alert('This sample is being updated. Please check back soon!');
      return;
    }
    window.open(url, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparent Pricing & Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional school help at unbeatable prices. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Pricing Section */}
          <div className="space-y-8">
            {/* Why Choose Me */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Why Choose Me</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">100% Human-Written</h4>
                    <p className="text-sm text-muted-foreground">No AI content. Every word is written by me personally.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Turnitin Reports</h4>
                    <p className="text-sm text-muted-foreground">Every order comes with a detailed plagiarism report.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Fast Turnaround</h4>
                    <p className="text-sm text-muted-foreground">Standard delivery in 3-5 days, urgent options available.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Zap className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">24/7 Support</h4>
                    <p className="text-sm text-muted-foreground">Always available on WhatsApp for questions and updates.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm opacity-90">Happy Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">A+</div>
                  <div className="text-sm opacity-90">Average Grade</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm opacity-90">Support Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm opacity-90">Human-Written</div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Categories */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
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
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
                      <span className="text-lg">{course.icon}</span>
                      <span className="text-sm font-medium">{course.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Combined Urgency & Quality */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Urgency & Quality</h3>
              </div>
              
              {/* Urgency Options */}
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3">Delivery Options</h4>
                <div className="grid grid-cols-3 gap-3">
                  {urgencyOptions.map((option, index) => (
                    <div key={index} className={`p-3 rounded-lg border-2 ${option.color} hover:shadow-md transition-shadow`}>
                      <div className="text-center">
                        <h5 className="font-semibold text-foreground text-sm mb-1">{option.name}</h5>
                        <div className="text-xs text-muted-foreground mb-1">{option.time}</div>
                        <Badge variant="outline" className="bg-white text-xs">
                          {option.multiplier === 1 ? 'No extra' : `${option.multiplier}x`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Guarantee */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Quality Guarantee</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Turnitin Report</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>No AI Detection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Plagiarism-Free</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SamplesSection = () => {
  const handleDownload = (url: string, filename: string) => {
    if (url === "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_HERE") {
      // Show message for placeholder links
      alert("Please update the Google Drive links with your actual sample files. Contact Peter for samples.");
      return;
    }
    
    // Open download link in new tab
    window.open(url, '_blank');
  };

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
                <div className="flex gap-2 mb-3">
                  <Badge variant="secondary">{sample.subject}</Badge>
                  <Badge variant="outline">{sample.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{sample.description}</p>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload(sample.download, sample.name)}
                >
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
