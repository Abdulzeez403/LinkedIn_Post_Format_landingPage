import React from 'react';
import { Bold, Italic, List, Sparkles, Zap, Target } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Bold,
      title: "Bold Text",
      description: "Make important words stand out with bold formatting that catches the eye"
    },
    {
      icon: Italic,
      title: "Italic Text", 
      description: "Add emphasis and style with elegant italic formatting"
    },
    {
      icon: List,
      title: "Smart Templates",
      description: "Pre-built templates for common post types to save time"
    },
    {
      icon: Sparkles,
      title: "Special Characters",
      description: "Access unique Unicode characters and symbols for visual appeal"
    },
    {
      icon: Zap,
      title: "One-Click Formatting",
      description: "Apply formatting instantly with our intuitive toolbar"
    },
    {
      icon: Target,
      title: "Engagement Boost",
      description: "Formatted posts get 3x more engagement on average"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            Powerful Features for Professional Posts
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            Everything you need to create engaging, professional-looking LinkedIn content
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up hover-lift group`}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="bg-[#0077B5] w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:animate-pulse-gentle transition-all duration-300">
                <feature.icon size={28} className="text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#0077B5] to-[#005885] rounded-2xl p-8 text-center text-white animate-scale-in animate-delay-600 hover-lift">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your LinkedIn Presence?</h3>
          <p className="text-lg mb-6 opacity-90">Join thousands of professionals who are already using our extension</p>
          <button className="bg-white text-[#0077B5] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover-scale group">
            <span className="group-hover:animate-bounce-gentle inline-block">Install Now - It's Free</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;