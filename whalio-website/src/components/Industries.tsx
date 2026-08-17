'use client';

import React from 'react';
import { Factory, Truck, Package, Wrench, Building2 } from 'lucide-react';

export const Industries = () => {
  const industries = [
    {
      title: 'Manufacturing',
      icon: Factory,
      desc: 'Shop floor tracking, production logs, quality checks & raw materials.',
    },
    {
      title: 'Distribution',
      icon: Package,
      desc: 'Order dispatching, warehouse workflows & inventory management.',
    },
    {
      title: 'Logistics',
      icon: Truck,
      desc: 'Fleet coordination, delivery scheduling & manual entry reduction.',
    },
    {
      title: 'Services',
      icon: Wrench,
      desc: 'Job dispatch, field operations tracking & custom client workflows.',
    },
    {
      title: 'Small & Medium Businesses',
      icon: Building2,
      desc: 'Consolidating scattered registers and spreadsheets into clean tools.',
    },
  ];

  return (
    <section id="industries" className="py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200/60">
            Target Focus
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Built for businesses that want to work better.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            While our initial engineering focus centers around operations-heavy SMBs and factory workflows, Whalio Technologies is architected to adapt across diverse industries.
          </p>
        </div>

        {/* Industry Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-cyan-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-slate-900 text-cyan-400 flex items-center justify-center mb-5 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
