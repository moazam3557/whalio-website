'use client';

import React from 'react';
import { Target, Zap, ShieldCheck, Clock } from 'lucide-react';

export const WhyWhalio = () => {
  const principles = [
    {
      icon: Target,
      title: 'Built for real work',
      description: 'We focus on solving operational problems, not adding unnecessary features.',
    },
    {
      icon: Zap,
      title: 'Simple to use',
      description: "Software should make people's jobs easier, not harder.",
    },
    {
      icon: ShieldCheck,
      title: 'Built to grow',
      description: 'Start with one problem and expand as your business grows.',
    },
    {
      icon: Clock,
      title: 'Long-term thinking',
      description: 'We build solutions designed to become valuable parts of your business.',
    },
  ];

  return (
    <section id="why-whalio" className="py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-cyan-700 bg-cyan-100/80 px-3 py-1 rounded-full">
            Why Whalio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Technology without the unnecessary complexity.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Our guiding engineering principles ensure software stays lean, functional, and intuitive.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((principle, idx) => {
            const Icon = principle.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-cyan-500/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-400">
                  Principle 0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
