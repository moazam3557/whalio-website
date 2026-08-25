'use client';

import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { WhalioLogo } from './WhalioLogo';
import { UserProfileData } from '@/context/VisitingCardContext';
import { Mail, Phone, Globe, MapPin, User, Building2 } from 'lucide-react';

interface VisitingCardProps {
  profile: UserProfileData;
  includeQrCode: boolean;
}

export const VisitingCard = React.forwardRef<HTMLDivElement, VisitingCardProps>(
  ({ profile, includeQrCode }, ref) => {
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

    useEffect(() => {
      let isMounted = true;
      if (includeQrCode && profile.profileUrl) {
        QRCode.toDataURL(profile.profileUrl, {
          width: 250,
          margin: 1,
          color: {
            dark: '#0b132b',
            light: '#ffffff',
          },
          errorCorrectionLevel: 'M',
        })
          .then((url) => {
            if (isMounted) setQrCodeDataUrl(url);
          })
          .catch((err) => {
            console.error('Failed to generate QR Code', err);
          });
      } else {
        setQrCodeDataUrl('');
      }
      return () => {
        isMounted = false;
      };
    }, [includeQrCode, profile.profileUrl]);

    // Standard business card aspect ratio 3.5in x 2.0in (88.9mm x 50.8mm)
    return (
      <div
        ref={ref}
        id="visiting-card-printable"
        className="visiting-card-root relative w-[420px] h-[240px] rounded-xl overflow-hidden bg-gradient-to-br from-[#0b132b] via-[#1c2541] to-[#070c1a] border border-slate-700/60 shadow-2xl text-white select-none flex flex-col justify-between p-5"
        style={{
          boxSizing: 'border-box',
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact',
        }}
      >
        {/* Decorative Grid & Ambient Ocean Glow Background */}
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-cyan-500/15 blur-2xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/15 blur-2xl rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-blue-500" />

        {/* Card Header: Brand & Logo */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800 shadow-sm flex items-center justify-center">
              <WhalioLogo className="w-5 h-5" light={true} />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-white leading-tight flex items-center gap-1">
                Whalio
              </span>
              <span className="text-[8px] uppercase tracking-widest font-semibold text-cyan-400 -mt-0.5">
                Technologies
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[9px] tracking-wider uppercase text-slate-400 font-mono block">
              Official Profile
            </span>
            <span className="text-[10px] text-cyan-300 font-medium italic">
              {profile.tagline}
            </span>
          </div>
        </div>

        {/* Card Body: User Info & Details */}
        <div className="relative z-10 grid grid-cols-12 gap-3 items-center py-2">
          
          {/* Main User Bio Info */}
          <div className={`${includeQrCode ? 'col-span-8' : 'col-span-12'} space-y-2`}>
            <div>
              <h3 className="text-[15px] font-bold text-white tracking-tight leading-tight">
                {profile.name}
              </h3>
              <p className="text-[11px] text-cyan-400 font-medium mt-0.5">
                {profile.title}
              </p>
              <p className="text-[9px] text-slate-400 font-mono mt-0.5">
                {profile.company}
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-1 text-[10px] text-slate-300 pt-1 border-t border-slate-800/60">
              {profile.email && (
                <div className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>
              )}

              {profile.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  <span>{profile.phone}</span>
                </div>
              )}

              {profile.website && (
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  <span className="text-slate-200 font-medium">{profile.website}</span>
                </div>
              )}

              {profile.address && (
                <div className="flex items-center gap-1.5 truncate text-[9px] text-slate-400">
                  <MapPin className="w-3 h-3 text-cyan-400/80 flex-shrink-0" />
                  <span className="truncate">{profile.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* QR Code Container (Conditional) */}
          {includeQrCode && (
            <div className="col-span-4 flex flex-col items-center justify-center pl-1 border-l border-slate-800/80">
              {qrCodeDataUrl ? (
                <div className="p-1.5 bg-white rounded-lg shadow-lg border border-cyan-400/30 flex flex-col items-center">
                  <img
                    src={qrCodeDataUrl}
                    alt="Scan Public Profile QR Code"
                    className="w-16 h-16 block"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 text-[9px] text-slate-500 text-center">
                  Loading QR...
                </div>
              )}
              <span className="text-[8px] font-mono text-cyan-400 mt-1 uppercase tracking-tighter">
                Scan Profile
              </span>
            </div>
          )}
        </div>

        {/* Card Footer Bar */}
        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[8px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            whaliotechnologies.com
          </span>
          <span>Verified Business Card</span>
        </div>
      </div>
    );
  }
);

VisitingCard.displayName = 'VisitingCard';
