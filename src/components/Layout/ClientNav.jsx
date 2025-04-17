'use client'; // Only this part will be client-side

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const ClientNav = () => {
  const pathname = usePathname();
  return (
    <nav>
      <ul>
        <li><Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link></li>
        <li><Link href="/about" className={pathname === '/about' ? 'active' : ''}>About</Link></li>
      </ul>
    </nav>
  );
};

export default ClientNav;