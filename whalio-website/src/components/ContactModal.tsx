'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useContactModal } from '@/context/ContactContext';
import { X, Send, CheckCircle2, AlertCircle, Loader2, Mail, Phone, Building2, User, MessageSquare, ChevronDown } from 'lucide-react';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  service?: string;
  message?: string;
}

const SERVICE_OPTIONS = [
  'Custom Workflow Automation',
  'Web & Software Development',
  'Legacy System Integration',
  'Process Audit & Optimization',
  'Other / General Inquiry',
];

export const ContactModal = () => {
  const { isOpen, closeContactModal } = useContactModal();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: SERVICE_OPTIONS[0],
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus trap & escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        closeContactModal();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeContactModal]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.company.trim()) newErrors.company = 'Company Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.service) newErrors.service = 'Please select a topic';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setServerErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setServerErrorMessage(data.message || 'Something went wrong. Please try again or email us directly.');
      }
    } catch (err) {
      setStatus('error');
      setServerErrorMessage('Failed to connect to network. Please check your connection and try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      service: SERVICE_OPTIONS[0],
      message: '',
    });
    setErrors({});
    setStatus('idle');
    setServerErrorMessage('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeContactModal();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-xl bg-[#0b132b] border border-slate-800 rounded-2xl shadow-2xl shadow-cyan-950/40 text-slate-100 overflow-hidden my-auto transform transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80 bg-slate-900/60">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-cyan-400">
              Direct Inquiry
            </span>
            <h2 id="contact-modal-title" className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              Let's Talk — Whalio Technologies
            </h2>
          </div>
          <button
            onClick={closeContactModal}
            aria-label="Close modal"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {status === 'success' ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 bg-cyan-500/10 text-cyan-400 rounded-full flex items-center justify-center mx-auto border border-cyan-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Received!</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                Thank you for reaching out, <span className="font-semibold text-cyan-400">{formData.name}</span>. We've received your request and will review your process details shortly.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={closeContactModal}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-colors"
                >
                  Close Window
                </button>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block mb-0.5">Submission Error</span>
                    {serverErrorMessage}
                  </div>
                </div>
              )}

              {/* Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      ref={firstInputRef}
                      id="contact-name"
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border ${
                        errors.name ? 'border-red-500' : 'border-slate-700/80'
                      } rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors`}
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="contact-company" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Company Name <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      id="contact-company"
                      type="text"
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border ${
                        errors.company ? 'border-red-500' : 'border-slate-700/80'
                      } rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors`}
                    />
                  </div>
                  {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Work Email <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="jane@acme.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border ${
                        errors.email ? 'border-red-500' : 'border-slate-700/80'
                      } rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors`}
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Phone / WhatsApp <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Service Needed Dropdown */}
              <div>
                <label htmlFor="contact-service" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  What can we help you with? <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <select
                    id="contact-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors appearance-none pr-8 cursor-pointer"
                  >
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-slate-900 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Message / Process Details <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <textarea
                    id="contact-message"
                    rows={3}
                    placeholder="Briefly describe your current manual workflow or project requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border ${
                      errors.message ? 'border-red-500' : 'border-slate-700/80'
                    } rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none`}
                  />
                </div>
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold text-sm transition-all duration-200 shadow-md shadow-cyan-500/20"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer Fallback Email link */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <span>Prefer direct email?</span>
            <a
              href="mailto:moazam.ali@whaliotechnologies.com"
              className="text-cyan-400 hover:underline font-medium inline-flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              moazam.ali@whaliotechnologies.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
