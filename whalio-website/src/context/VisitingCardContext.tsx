'use client';

import React, { createContext, useContext, useState } from 'react';

export interface UserProfileData {
  name: string;
  title: string;
  company: string;
  tagline: string;
  email: string;
  secondaryEmail?: string;
  phone?: string;
  website: string;
  address?: string;
  profileUrl: string;
  photoUrl?: string;
}

export const DEFAULT_USER_PROFILE: UserProfileData = {
  name: 'Moazam Ali',
  title: 'Founder & Software Engineer',
  company: 'Whalio Technologies',
  tagline: 'Simple software. Smarter business.',
  email: 'moazam.ali@whaliotechnologies.com',
  secondaryEmail: 'hello@whaliotechnologies.com',
  phone: '+1 (555) 843-9254',
  website: 'whaliotechnologies.com',
  address: 'Lahore, PK & Global Remote',
  profileUrl: 'https://whaliotechnologies.com/profile/moazam-ali',
};

interface VisitingCardContextType {
  isCardModalOpen: boolean;
  openCardModal: () => void;
  closeCardModal: () => void;
  profile: UserProfileData;
}

const VisitingCardContext = createContext<VisitingCardContextType | undefined>(undefined);

export const VisitingCardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const openCardModal = () => setIsCardModalOpen(true);
  const closeCardModal = () => setIsCardModalOpen(false);

  return (
    <VisitingCardContext.Provider
      value={{
        isCardModalOpen,
        openCardModal,
        closeCardModal,
        profile: DEFAULT_USER_PROFILE,
      }}
    >
      {children}
    </VisitingCardContext.Provider>
  );
};

export const useVisitingCardModal = () => {
  const context = useContext(VisitingCardContext);
  if (!context) {
    throw new Error('useVisitingCardModal must be used within a VisitingCardProvider');
  }
  return context;
};
