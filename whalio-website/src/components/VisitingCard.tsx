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
        className="visiting-card-root relative w-[420px] h-[240px] rounded-xl overflow-hidden shadow-2xl select-none flex flex-col justify-between p-5"
        style={{
          boxSizing: 'border-box',
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact',
          background: 'linear-gradient(to bottom right, #0b132b, #1c2541, #070c1a)',
          borderColor: 'rgba(51, 65, 85, 0.6)',
          borderWidth: '1px',
          borderStyle: 'solid',
          color: '#ffffff'
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '16px 16px', opacity: 0.2 }} />
        <div className="absolute -top-12 -right-12 w-44 h-44 blur-2xl rounded-full pointer-events-none" style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)' }} />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 blur-2xl rounded-full pointer-events-none" style={{ backgroundColor: 'rgba(37, 99, 235, 0.15)' }} />
        <div className="absolute top-0 right-0 w-32 h-1" style={{ background: 'linear-gradient(to right, transparent, #22d3ee, #3b82f6)' }} />

        <div className="relative z-10 flex items-center justify-between pb-3" style={{ borderBottom: '1px solid rgba(30, 41, 59, 0.8)' }}>
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg shadow-sm flex items-center justify-center" style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid #1e293b' }}>
              <WhalioLogo className="w-5 h-5" light={true} />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight leading-tight flex items-center gap-1" style={{ color: '#ffffff' }}>
                Whalio
              </span>
              <span className="text-[8px] uppercase tracking-widest font-semibold -mt-0.5" style={{ color: '#22d3ee' }}>
                Technologies
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[9px] tracking-wider uppercase font-mono block" style={{ color: '#94a3b8' }}>
              Official Profile
            </span>
            <span className="text-[10px] font-medium italic" style={{ color: '#67e8f9' }}>
              {profile.tagline}
            </span>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-12 gap-3 items-center py-2">
          
          <div className={`${includeQrCode ? 'col-span-8' : 'col-span-12'} space-y-2`}>
            <div>
              <h3 className="text-[15px] font-bold tracking-tight leading-tight" style={{ color: '#ffffff' }}>
                {profile.name}
              </h3>
              <p className="text-[11px] font-medium mt-0.5" style={{ color: '#22d3ee' }}>
                {profile.title}
              </p>
              <p className="text-[9px] font-mono mt-0.5" style={{ color: '#94a3b8' }}>
                {profile.company}
              </p>
            </div>

            <div className="space-y-1 text-[10px] pt-1" style={{ color: '#cbd5e1', borderTop: '1px solid rgba(30, 41, 59, 0.6)' }}>
              {profile.email && (
                <div className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3 h-3 flex-shrink-0" style={{ color: '#22d3ee' }} />
                  <span className="truncate">{profile.email}</span>
                </div>
              )}

              {profile.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 flex-shrink-0" style={{ color: '#22d3ee' }} />
                  <span>{profile.phone}</span>
                </div>
              )}

              {profile.website && (
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3 h-3 flex-shrink-0" style={{ color: '#22d3ee' }} />
                  <span className="font-medium" style={{ color: '#e2e8f0' }}>{profile.website}</span>
                </div>
              )}

              {profile.address && (
                <div className="flex items-center gap-1.5 truncate text-[9px]">
                  <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(34, 211, 238, 0.8)' }} />
                  <span className="truncate" style={{ color: '#94a3b8' }}>{profile.address}</span>
                </div>
              )}
            </div>
          </div>

          {includeQrCode && (
            <div className="col-span-4 flex flex-col items-center justify-center pl-1" style={{ borderLeft: '1px solid rgba(30, 41, 59, 0.8)' }}>
              {qrCodeDataUrl ? (
                <div className="p-1.5 rounded-lg shadow-lg flex flex-col items-center" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(34, 211, 238, 0.3)' }}>
                  <img
                    src={qrCodeDataUrl}
                    alt="Scan Public Profile QR Code"
                    className="w-16 h-16 block"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-lg flex items-center justify-center text-[9px] text-center" style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', color: '#64748b' }}>
                  Loading QR...
                </div>
              )}
              <span className="text-[8px] font-mono mt-1 uppercase tracking-tighter" style={{ color: '#22d3ee' }}>
                Scan Profile
              </span>
            </div>
          )}
        </div>

        <div className="relative z-10 flex items-center justify-between pt-2 text-[8px] font-mono" style={{ borderTop: '1px solid rgba(30, 41, 59, 0.8)', color: '#94a3b8' }}>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#22d3ee' }} />
            whaliotechnologies.com
          </span>
          <span>Verified Business Card</span>
        </div>
      </div>
    );
  }
);

VisitingCard.displayName = 'VisitingCard';
