'use client';

import React from 'react';
import { WhalioLogo } from './WhalioLogo';
import { useContactModal } from '@/context/ContactContext';

export const Footer = () => {
  const { openContactModal } = useContactModal();

  return (
    <footer className="bg-[#070c1a] text-slate-400 py-16 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <WhalioLogo className="w-6 h-6" light={true} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white">
                  Whalio
                </span>
                <span className="text-[9px] uppercase tracking-widest font-semibold text-cyan-400 -mt-1">
                  Technologies
                </span>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 max-w-sm italic">
              "Simple software. Smarter business."
            </p>

            <div className="text-xs text-slate-500 pt-2 space-y-1">
              <div>Founder: Moazam Ali (Founder & Software Engineer)</div>
              <div>Domain: whaliotechnologies.com</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#solutions" className="hover:text-cyan-400 transition-colors">
                  Solutions
                </a>
              </li>
              <li>
                <a href="#how-we-work" className="hover:text-cyan-400 transition-colors">
                  How We Work
                </a>
              </li>
              <li>
                <a href="#industries" className="hover:text-cyan-400 transition-colors">
                  Industries
                </a>
              </li>
              <li>
                <a href="#why-whalio" className="hover:text-cyan-400 transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-slate-200">
              Contact
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <button
                  onClick={openContactModal}
                  className="text-cyan-400 font-semibold hover:underline cursor-pointer block text-left"
                >
                  Send Inquiry Form →
                </button>
              </div>
              <div>
                <a
                  href="mailto:moazam.ali@whaliotechnologies.com"
                  className="hover:text-cyan-400 transition-colors block break-all text-xs"
                >
                  moazam.ali@whaliotechnologies.com
                </a>
              </div>
              <div>
                <a
                  href="mailto:hello@whaliotechnologies.com"
                  className="hover:text-cyan-400 transition-colors block text-xs"
                >
                  hello@whaliotechnologies.com
                </a>
              </div>
              <div className="text-xs text-slate-500 pt-1">
                Website: <span className="text-slate-400">whaliotechnologies.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 Whalio Technologies. All rights reserved.
          </div>
          <div className="text-slate-600">
            Engineered for reliability & clarity.
          </div>
        </div>
      </div>
    </footer>
  );
};
