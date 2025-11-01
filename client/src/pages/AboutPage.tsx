import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";
import { OptimizedImage } from "@/shared/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Users, Target, Award, Heart } from "lucide-react";
import { useEffect } from "react";

const AboutPage = () => {

  useEffect(() => {
    document.title = "About Us | McGibs Digital Solutions";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Learn about McGibs Digital Solutions - A team of experienced developers delivering custom digital solutions, web apps, mobile apps, and e-commerce platforms.');
    }
  }, []);

  const handleContact = () => {
    const email = "pwriter455@gmail.com";
    const subject = "Request for Quote - About Your Services";
    const body = `Hello McGibs Digital Solutions,

I'd like to learn more about your services and team, and get a quote.

Please provide me with:
- Information about your services
- Pricing details
- Team availability
- Timeline estimates

My email is: [Your email]
My phone: [Your phone]

Looking forward to hearing from you!`;
    
    // Create mailto link with proper encoding
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Try multiple methods to ensure email client opens
    try {
      window.location.href = mailtoLink;
    } catch (e) {
      // Fallback: try window.open
      window.open(mailtoLink, '_blank');
    }
  };

  return (
    <>
      <Header />
      <MainLayout>
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              About McGibs Digital Solutions
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              We are a team of passionate developers and designers dedicated to building
              production-grade digital solutions that drive real business results.
            </p>
          </div>

          {/* Company Overview */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-slate-900">Who We Are</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Founded with a vision to bridge the gap between innovative ideas and
                  scalable digital products, McGibs Digital Solutions has been delivering
                  exceptional results since 2020.
                </p>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  We specialize in full-stack development, creating web applications,
                  mobile apps, e-commerce platforms, and custom software solutions that
                  meet the unique needs of our clients.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Our approach combines technical expertise with business acumen,
                  ensuring that every project not only meets technical standards but
                  also drives measurable business outcomes.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Our Team"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Values Section */}
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Target,
                  title: "Excellence",
                  desc: "We strive for excellence in every project, delivering solutions that exceed expectations.",
                  color: "text-blue-600",
                  bg: "bg-blue-100"
                },
                {
                  icon: Users,
                  title: "Collaboration",
                  desc: "We believe in working closely with clients to understand their vision and goals.",
                  color: "text-purple-600",
                  bg: "bg-purple-100"
                },
                {
                  icon: Award,
                  title: "Innovation",
                  desc: "We leverage cutting-edge technologies and best practices to build future-proof solutions.",
                  color: "text-emerald-600",
                  bg: "bg-emerald-100"
                },
                {
                  icon: Heart,
                  title: "Integrity",
                  desc: "Honest communication, transparent processes, and ethical business practices guide everything we do.",
                  color: "text-pink-600",
                  bg: "bg-pink-100"
                },
              ].map((value) => (
                <div key={value.title} className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-lg ${value.bg} flex items-center justify-center mb-4`}>
                    <value.icon className={`w-6 h-6 ${value.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900">{value.title}</h3>
                  <p className="text-slate-600 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What We Do */}
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">What Sets Us Apart</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Full-Stack Expertise",
                  desc: "From frontend to backend, we handle every aspect of development, ensuring seamless integration and optimal performance.",
                  features: ["React, Next.js, Vue.js", "Node.js, Python, PHP", "MongoDB, PostgreSQL", "AWS, Vercel, Docker"]
                },
                {
                  title: "Agile Development",
                  desc: "We follow agile methodologies to deliver projects on time and adapt to changing requirements.",
                  features: ["Sprint Planning", "Regular Updates", "Iterative Development", "Quick Adaptability"]
                },
                {
                  title: "Client-Centric Approach",
                  desc: "Your success is our priority. We work as an extension of your team, ensuring alignment with your goals.",
                  features: ["Regular Communication", "Transparent Process", "Client Feedback Integration", "Post-Launch Support"]
                },
                {
                  title: "Quality Assurance",
                  desc: "Every line of code is tested, reviewed, and optimized to ensure reliability and performance.",
                  features: ["Code Reviews", "Automated Testing", "Performance Optimization", "Security Audits"]
                },
              ].map((item) => (
                <div key={item.title} className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
                  <h3 className="font-semibold text-xl mb-3 text-slate-900">{item.title}</h3>
                  <p className="text-slate-600 mb-4">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="max-w-6xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-12 text-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { number: "50+", label: "Projects Delivered" },
                  { number: "100+", label: "Happy Clients" },
                  { number: "5+", label: "Years Experience" },
                  { number: "24/7", label: "Support Available" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">{stat.number}</div>
                    <div className="text-sm md:text-base text-slate-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Let's Build Something Great Together</h2>
            <p className="text-lg text-slate-600 mb-8">
              Ready to transform your ideas into reality? Get in touch and let's discuss your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleContact} size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Start a Conversation
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/contact">View Contact Page</a>
              </Button>
            </div>
          </section>
        </section>
      </MainLayout>
    </>
  );
};

export default AboutPage;


