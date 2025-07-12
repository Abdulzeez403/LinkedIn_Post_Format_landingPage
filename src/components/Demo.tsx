import React from 'react';
import { Play, ChevronRight } from 'lucide-react';

const Demo = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            Watch how easy it is to format your LinkedIn posts with professional styling
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in animate-delay-300 hover-lift">
            <div className="aspect-video bg-gradient-to-br from-[#0077B5] to-[#005885] flex items-center justify-center relative group">
              <div className="text-center text-white animate-fade-in animate-delay-500">
                <Play size={80} className="mx-auto mb-4 opacity-90 group-hover:animate-pulse-gentle transition-all duration-300" />
                <p className="text-xl font-semibold mb-2">Demo Video</p>
                <p className="text-blue-100">Click to watch the extension in action</p>
              </div>
              <button className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center group">
                <Play size={100} className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 group-hover:animate-bounce-gentle" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-fade-in-left animate-delay-600 hover-lift">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Before</h3>
              <div className="bg-gray-100 rounded-lg p-4 text-gray-700">
                <p>Just finished reading an amazing book about entrepreneurship. The insights on building a successful startup were incredible. Highly recommend it to anyone looking to start their own business.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-fade-in-right animate-delay-600 hover-lift">
              <h3 className="text-xl font-bold text-gray-900 mb-4">After</h3>
              <div className="bg-gray-100 rounded-lg p-4 text-gray-700">
                <p>Just finished reading an <strong>amazing book</strong> about <em>entrepreneurship</em>. 
                
                The insights on building a <strong>successful startup</strong> were incredible. 
                
                <strong>Highly recommend it</strong> to anyone looking to start their own business.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;