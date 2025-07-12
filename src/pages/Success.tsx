import React, { useEffect, useState } from 'react';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';

const Success = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionIdParam = urlParams.get('session_id');
    setSessionId(sessionIdParam);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="animate-scale-in">
          <CheckCircle size={80} className="text-green-500 mx-auto mb-6 animate-bounce-gentle" />
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            Welcome to Pro! 🎉
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 animate-fade-in-up animate-delay-200">
            Your subscription has been activated successfully. You now have access to all Pro features.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fade-in-up animate-delay-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Next?</h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3 hover-scale">
                <div className="w-8 h-8 bg-[#0077B5] rounded-full flex items-center justify-center text-white font-bold">1</div>
                <span className="text-gray-700">Download the Chrome extension</span>
              </div>
              
              <div className="flex items-center gap-3 hover-scale">
                <div className="w-8 h-8 bg-[#0077B5] rounded-full flex items-center justify-center text-white font-bold">2</div>
                <span className="text-gray-700">Sign in with your account</span>
              </div>
              
              <div className="flex items-center gap-3 hover-scale">
                <div className="w-8 h-8 bg-[#0077B5] rounded-full flex items-center justify-center text-white font-bold">3</div>
                <span className="text-gray-700">Start formatting your LinkedIn posts</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-400">
            <button className="bg-[#0077B5] hover:bg-[#005885] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover-scale group">
              <Download size={20} className="group-hover:animate-bounce-gentle" />
              Download Extension
            </button>
            
            <button className="border-2 border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 hover-scale group">
              View Dashboard
              <ArrowRight size={20} className="group-hover:animate-bounce-gentle" />
            </button>
          </div>

          {sessionId && (
            <p className="text-sm text-gray-500 mt-6">
              Session ID: {sessionId}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Success;