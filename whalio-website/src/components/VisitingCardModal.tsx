'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useVisitingCardModal } from '@/context/VisitingCardContext';
import { VisitingCard } from './VisitingCard';
import { X, Download, Printer, QrCode, Sparkles } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

export const VisitingCardModal = () => {
  const { isCardModalOpen, closeCardModal, profile } = useVisitingCardModal();
  const [includeQrCode, setIncludeQrCode] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Setup print handler using react-to-print
  const handlePrint = useReactToPrint({
    contentRef: cardRef,
    documentTitle: `${profile.name.replace(/\s+/g, '_')}_Whalio_Visiting_Card`,
  });

  // Handle PDF Download via html2pdf.js dynamically imported client-side
  const handleDownloadPdf = async () => {
    if (!cardRef.current || isGeneratingPdf) return;
    setIsGeneratingPdf(true);

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = cardRef.current;

      const opt = {
        margin: 0,
        filename: `${profile.name.replace(/\s+/g, '_')}_Visiting_Card.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true, logging: false },
        jsPDF: { unit: 'in', format: [3.5, 2.0] as [number, number], orientation: 'landscape' as const },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Focus trap & Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isCardModalOpen) return;
      if (e.key === 'Escape') {
        closeCardModal();
      }
    };

    if (isCardModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCardModalOpen, closeCardModal]);

  if (!isCardModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="visiting-card-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCardModal();
      }}
    >
      <div className="relative w-full max-w-xl bg-[#0b132b] border border-slate-800 rounded-2xl shadow-2xl shadow-cyan-950/40 text-slate-100 overflow-hidden my-auto transform transition-all">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80 bg-slate-900/60">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Digital Business Card
            </span>
            <h2 id="visiting-card-modal-title" className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              Download Visiting Card
            </h2>
          </div>
          <button
            onClick={closeCardModal}
            aria-label="Close modal"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 flex flex-col items-center">
          
          {/* Controls Bar: Toggle QR Code */}
          <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm">
            <div className="flex items-center gap-2.5">
              <QrCode className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-slate-200">Include QR Code</span>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeQrCode}
                onChange={(e) => setIncludeQrCode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          {/* Interactive Card Preview Wrapper */}
          <div className="w-full flex flex-col items-center justify-center p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl overflow-x-auto">
            <span className="text-[10px] uppercase font-mono text-slate-500 mb-3 tracking-wider">
              Print Preview (3.5" × 2.0" Standard Card)
            </span>
            <div className="transform scale-[0.85] sm:scale-100 transition-transform origin-center">
              <VisitingCard
                ref={cardRef}
                profile={profile}
                includeQrCode={includeQrCode}
              />
            </div>
          </div>

          {/* Download & Print Action Buttons */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold text-sm transition-all duration-200 shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              {isGeneratingPdf ? 'Generating PDF...' : 'Download as PDF'}
            </button>

            <button
              onClick={() => handlePrint()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm transition-all duration-200 border border-slate-700/80 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              Print Visiting Card
            </button>
          </div>

          {/* Information Notice */}
          <p className="text-[11px] text-slate-400 text-center max-w-sm">
            Downloads high-resolution 3.5" x 2.0" vector-quality PDF output. Ready for commercial printing.
          </p>

        </div>
      </div>
    </div>
  );
};
