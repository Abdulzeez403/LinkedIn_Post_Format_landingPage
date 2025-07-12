import React, { useState } from 'react';
import { Chrome, Shield, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';
import UserDashboard from './UserDashboard';

const Login = () => {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0077B5] mx-auto"></div>
        </div>
      </section>
    );
  }

  if (user) {
    return <UserDashboard />;
  }

  return (
    <>
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Get Started in Seconds
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
              Create your account and start formatting your LinkedIn posts professionally
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-scale-in animate-delay-300 hover-lift">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-left animate-delay-400">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Sign Up for Free
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 animate-fade-in-up animate-delay-500 hover-scale">
                    <Shield className="text-green-500 animate-pulse-gentle" size={20} />
                    <span className="text-gray-700">Secure Authentication</span>
                  </div>
                  <div className="flex items-center gap-3 animate-fade-in-up animate-delay-600 hover-scale">
                    <User className="text-blue-500" size={20} />
                    <span className="text-gray-700">Save Your Formatting Preferences</span>
                  </div>
                  <div className="flex items-center gap-3 animate-fade-in-up animate-delay-700 hover-scale">
                    <Chrome className="text-[#0077B5]" size={20} />
                    <span className="text-gray-700">Sync Across All Devices</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setShowAuthModal(true);
                    }}
                    className="w-full bg-[#0077B5] hover:bg-[#005885] text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover-scale group"
                  >
                    <span className="group-hover:animate-bounce-gentle inline-block">Create Free Account</span>
                  </button>

                  <button
                    onClick={() => {
                      setAuthMode('signin');
                      setShowAuthModal(true);
                    }}
                    className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover-scale"
                  >
                    Already have an account? Sign In
                  </button>
                </div>

                <p className="text-sm text-gray-500 mt-4 text-center animate-fade-in animate-delay-800">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>

              <div className="relative animate-fade-in-right animate-delay-400">
                <div className="bg-gradient-to-br from-[#0077B5] to-[#005885] rounded-xl p-6 text-white hover-lift">
                  <h4 className="text-lg font-semibold mb-4">What you get:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 animate-fade-in-up animate-delay-500 hover-scale">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse-gentle"></div>
                      <span>Unlimited post formatting</span>
                    </li>
                    <li className="flex items-center gap-2 animate-fade-in-up animate-delay-600 hover-scale">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse-gentle"></div>
                      <span>Custom templates</span>
                    </li>
                    <li className="flex items-center gap-2 animate-fade-in-up animate-delay-700 hover-scale">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse-gentle"></div>
                      <span>Analytics dashboard</span>
                    </li>
                    <li className="flex items-center gap-2 animate-fade-in-up animate-delay-800 hover-scale">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse-gentle"></div>
                      <span>Priority support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </>
  );
};

export default Login;