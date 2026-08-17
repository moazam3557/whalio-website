'use client';

import React from 'react';
import { FileSpreadsheet, Layers, EyeOff, TrendingUp } from 'lucide-react';

export const ProblemSection = () => {
  const problems = [
    {
      icon: FileSpreadsheet,
      title: 'Manual Work',
      description: 'Too much time spent entering, copying and checking information.',
    },
    {
      icon: Layers,
      title: 'Scattered Information',
      description: 'Important business data lives across spreadsheets, paperwork and messages.',
    },
    {
      icon: EyeOff,
      title: 'Limited Visibility',
      description: "Decision makers don't always have the information they need, when they need it.",
    },
    {
      icon: TrendingUp,
      title: 'Growing Complexity',
      description: 'As the business grows, manual processes become harder to manage.',
    },
  ];

  return (
    <section className="py-24 bg-slate-100 text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-cyan-700 bg-cyan-100/80 px-3 py-1 rounded-full">
            Operational Friction
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Your business shouldn't run on spreadsheets forever.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed pt-2">
            Important work often gets buried in Excel files, paper registers, WhatsApp messages, and repetitive manual processes. We turn those processes into simple digital workflows.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, idx) => {
            const Icon = problem.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-cyan-400 flex items-center justify-center mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-400 group-hover:text-cyan-700 transition-colors">
                  <span>Challenge 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
