'use client';

import React, { createContext, useContext, useState } from 'react';

interface ContactContextType {
  isOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openContactModal = () => setIsOpen(true);
  const closeContactModal = () => setIsOpen(false);

  return (
    <ContactContext.Provider value={{ isOpen, openContactModal, closeContactModal }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContactModal = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContactModal must be used within a ContactProvider');
  }
  return context;
};
