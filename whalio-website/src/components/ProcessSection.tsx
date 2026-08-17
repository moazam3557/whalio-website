'use client';

import React from 'react';

export const ProcessSection = () => {
  const steps = [
    {
      step: '01',
      title: 'Understand',
      description: 'We learn how your business actually works.',
    },
    {
      step: '02',
      title: 'Design',
      description: 'We identify the processes worth improving and design a practical solution.',
    },
    {
      step: '03',
      title: 'Build',
      description: 'We build reliable software around your workflow.',
    },
    {
      step: '04',
      title: 'Improve',
      description: 'We learn from real usage and continuously improve the system.',
    },
  ];

  return (
    <section id="how-we-work" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-cyan-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Understand first. Build second.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A practical, step-by-step approach to digitizing operational workflows without disruption.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-6 z-0" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item, index) => (
              <div
                key={item.step}
                className="bg-slate-950/80 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300 group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-[#1c2541] text-cyan-400 font-mono font-extrabold text-xl flex items-center justify-center border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                      {item.step}
                    </div>
                    {index < steps.length - 1 && (
                      <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">→</span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
