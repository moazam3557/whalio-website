'use client';

import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="py-24 bg-[#0b132b] text-white relative overflow-hidden">
      {/* Background glow and mesh */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#1c2541]/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
          
          <span className="text-xs uppercase tracking-widest font-semibold text-cyan-400 bg-slate-800/90 px-3.5 py-1.5 rounded-full border border-slate-700 inline-block mb-6">
            Get In Touch
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Have a process you'd like to simplify?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Tell us what you're doing manually today. We'll help you explore whether software can make it simpler.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:moazam.ali@whaliotechnologies.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/35"
            >
              Talk to Whalio
              <ArrowRight className="w-5 h-5" />
            </a>
            
            <a
              href="mailto:hello@whaliotechnologies.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-semibold text-base transition-all duration-200"
            >
              <Mail className="w-5 h-5 text-cyan-400" />
              Email Us (hello@whaliotechnologies.com)
            </a>
          </div>

          <div className="mt-8 text-xs text-slate-400 font-mono">
            Direct Founder Contact: <span className="text-cyan-400">moazam.ali@whaliotechnologies.com</span>
          </div>

        </div>
      </div>
    </section>
  );
};
