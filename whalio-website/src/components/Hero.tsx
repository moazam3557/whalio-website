'use client';

import React from 'react';
import { ArrowRight, Database, Cpu, Workflow, BarChart3, CheckCircle2 } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 bg-[#0b132b] text-white overflow-hidden border-b border-slate-800/80">
      {/* Background Subtle Mesh & Ocean Data Glow */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Copy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-cyan-400 text-xs font-semibold tracking-wide shadow-inner">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Whalio Technologies</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-100">
              Simple Software.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                Smarter Business.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              Whalio Technologies builds practical software that helps businesses replace manual work, streamline operations, and make better decisions.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="mailto:moazam.ali@whaliotechnologies.com"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/35"
              >
                Let's Talk
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#solutions"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-semibold text-base transition-all duration-200"
              >
                See What We Do
              </a>
            </div>

            {/* Micro value props */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Custom Built Workflows</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>No Over-engineered Bloat</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Designed Around You</span>
              </div>
            </div>
          </div>

          {/* Hero Visual: Sophisticated Ocean Data Flow Animation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer visual card */}
              <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#1c2541]/90 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden">
                
                {/* SVG Connecting Flow Canvas */}
                <div className="relative w-full h-80 flex flex-col justify-between items-center py-2">
                  
                  {/* Watermark subtle background whale arc curve */}
                  <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" viewBox="0 0 400 300">
                    <path
                      d="M 20 180 C 80 80, 240 60, 380 120 C 320 220, 160 260, 20 180 Z"
                      fill="none"
                      stroke="#00b4d8"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  </svg>

                  {/* Node 1: Raw Business Input */}
                  <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between shadow-md transform hover:-translate-y-0.5 transition-transform">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-200">Raw Business Data</div>
                        <div className="text-[11px] text-slate-400">Spreadsheets • Registers • Messages</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">Input</span>
                  </div>

                  {/* Flow Connector Line 1 */}
                  <div className="flex flex-col items-center my-1">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-amber-500/50 to-cyan-500 animate-pulse" />
                  </div>

                  {/* Node 2: Whalio Automation Hub (Centerpiece) */}
                  <div className="w-full bg-gradient-to-r from-slate-900 via-[#1c2541] to-slate-900 border border-cyan-500/40 rounded-xl p-4 flex items-center justify-between shadow-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors" />
                    <div className="flex items-center gap-3.5 relative z-10">
                      <div className="p-2.5 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 animate-float">
                        <Workflow className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider font-mono text-cyan-400 font-semibold">Whalio Engine</div>
                        <div className="text-sm font-bold text-white">Smart Workflow & Automation</div>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-center gap-1.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                      </span>
                      <span className="text-[11px] font-mono text-cyan-300">Active</span>
                    </div>
                  </div>

                  {/* Flow Connector Line 2 */}
                  <div className="flex flex-col items-center my-1">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-500 to-emerald-500/80 animate-pulse" />
                  </div>

                  {/* Node 3: Streamlined Results */}
                  <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between shadow-md transform hover:translate-y-0.5 transition-transform">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-200">Smarter Operations</div>
                        <div className="text-[11px] text-slate-400">Real-time Visibility • Clean Control</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 font-mono">Results</span>
                  </div>

                </div>

                {/* Card footer description */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono text-cyan-400/90">Business → Data → Workflow → Results</span>
                  <span>Continuous Improvement</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
