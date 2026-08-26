'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, translations, Translations } from '@/lib/i18n/translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('tr');

  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem('bc_locale') as Locale | null;
      if (savedLocale === 'tr' || savedLocale === 'en') {
        setLocaleState(savedLocale);
      }
    } catch {
      // localStorage may be unavailable in private mode
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('bc_locale', newLocale);
    } catch {
      // ignore storage errors
    }
  };

  const toggleLocale = () => {
    const nextLocale: Locale = locale === 'tr' ? 'en' : 'tr';
    setLocale(nextLocale);
  };

  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      locale: 'tr',
      setLocale: () => {},
      toggleLocale: () => {},
      t: translations.tr,
    };
  }
  return context;
}
