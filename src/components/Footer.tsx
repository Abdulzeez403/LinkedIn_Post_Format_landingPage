import React from 'react';
import { Mail, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="animate-fade-in-up">
            <h3 className="text-xl font-bold mb-4 text-[#0077B5]">
              LinkedIn Formatter
            </h3>
            <p className="text-gray-400 leading-relaxed">
              The ultimate Chrome extension for professional LinkedIn post formatting. 
              Transform your content and boost engagement.
            </p>
          </div>

          <div className="animate-fade-in-up animate-delay-200">
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors hover-scale inline-block">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover-scale inline-block">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover-scale inline-block">Chrome Store</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover-scale inline-block">Roadmap</a></li>
            </ul>
          </div>

          <div className="animate-fade-in-up animate-delay-300">
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors hover-scale inline-block">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover-scale inline-block">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover-scale inline-block">Bug Reports</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover-scale inline-block">Feature Requests</a></li>
            </ul>
          </div>

          <div className="animate-fade-in-up animate-delay-400">
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors hover-scale inline-block">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover-scale inline-block">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover-scale inline-block">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover-scale inline-block">GDPR</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 animate-fade-in-up animate-delay-500">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2025 LinkedIn Formatter. All rights reserved.
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#0077B5] transition-colors hover-scale">
                <Mail size={20} className="hover:animate-bounce-gentle" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0077B5] transition-colors hover-scale">
                <Twitter size={20} className="hover:animate-bounce-gentle" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0077B5] transition-colors hover-scale">
                <Linkedin size={20} className="hover:animate-bounce-gentle" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0077B5] transition-colors hover-scale">
                <Github size={20} className="hover:animate-bounce-gentle" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;