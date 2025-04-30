"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ClientLayoutWrapper = ({ children }) => {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogoInTopHeader, setIsLogoInTopHeader] = useState(false);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);
  useEffect(() => {
    // const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsAuthenticated(!!session);
    };

    fetchSession();

    const handleScroll = () => {
      const headerHeight = document.querySelector(`.${styles.header}`).offsetHeight;
      setIsLogoInTopHeader(window.scrollY > headerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <header>
        <p>{currentPath}</p>
      </header>
      {children}
    </div>
  );
};

export default ClientLayoutWrapper;