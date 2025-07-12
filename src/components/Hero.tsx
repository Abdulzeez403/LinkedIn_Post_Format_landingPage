import React from 'react';
import { Download, Star, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
            Transform Your LinkedIn Posts with
            <span className="text-[#0077B5] block mt-2 animate-fade-in-up animate-delay-200">Professional Formatting</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-300">
            Add bold, italic, and custom formatting to your LinkedIn posts instantly. 
            Stand out from the crowd with professional-looking content that gets noticed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animate-delay-400">
            <button className="bg-[#0077B5] hover:bg-[#005885] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover-scale group">
              <Download size={20} className="group-hover:animate-bounce-gentle" />
              Install Extension
            </button>
            <button className="border-2 border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover-scale">
              Watch Demo
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-2 animate-fade-in-left animate-delay-500 hover-scale">
              <Star className="text-yellow-500 animate-pulse-gentle" size={20} />
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 animate-fade-in-up animate-delay-600 hover-scale">
              <Users className="text-[#0077B5]" size={20} />
              <span className="font-semibold">50,000+ Users</span>
            </div>
            <div className="flex items-center gap-2 animate-fade-in-right animate-delay-500 hover-scale">
              <Download className="text-green-500" size={20} />
              <span className="font-semibold">Free to Install</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;