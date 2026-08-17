'use client';

import React from 'react';

export const ServicesSection = () => {
  const services = [
    {
      num: '01',
      title: 'Business Software',
      description: "Custom software designed around your company's real processes.",
    },
    {
      num: '02',
      title: 'Workflow Automation',
      description: 'Replace repetitive manual tasks with simple, reliable workflows.',
    },
    {
      num: '03',
      title: 'Operations Software',
      description: 'Bring production, inventory, orders and daily operations into one place.',
    },
    {
      num: '04',
      title: 'Dashboards & Reporting',
      description: 'Turn business data into clear information your team can act on.',
    },
  ];

  return (
    <section id="solutions" className="py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200/60">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Software built around your business.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We don't believe businesses should have to change the way they work just to fit complicated software.
          </p>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.num}
              className="p-8 sm:p-10 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-cyan-500/40 hover:bg-slate-50/90 hover:shadow-lg transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle top accent border line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-baseline justify-between mb-6">
                <span className="font-mono text-3xl font-extrabold text-cyan-600/80">
                  {service.num}
                </span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Solution
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-cyan-900 transition-colors">
                {service.title}
              </h3>

              <p className="text-base text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
