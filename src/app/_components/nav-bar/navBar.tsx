'use client';

import { Logo } from '@/app/_components/logo/logo';
import Link from 'next/link';
import { useState } from 'react';
import { ErrorBoundary } from '../hoc/error-boundary';
import { useEtherPrice } from '../hooks/useEtherPrice';
import { useGasPrice } from '../hooks/useGasPrice';
import { NavMenuItem } from './nav-bar-menu/nav-menu-items';
import './nav-bar.scss';

interface NavBarProps {
  navMenuList?: any[];
  logoTitle: string;
}

export type NavPropsType = {
  title: string;
  href: string;
};

export function NavBar(props: NavBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { ethPrice } = useEtherPrice();
  const { gasPrice } = useGasPrice();

  return (
    <nav className='nav'>
      <ErrorBoundary>
        <div className='price'>
          {ethPrice > 0 && (
            <span>
              ETH Price: <Link href={'#'}>${ethPrice}</Link>
            </span>
          )}
          {gasPrice > 0 && (
            <span>
              ⛽️ <Link href={'#'}>{gasPrice} Gwei</Link>
            </span>
          )}
        </div>
      </ErrorBoundary>
      <div className='nav-menu'>
        <Logo title={props.logoTitle} />
        <NavMenuItem menuItems={props.navMenuList} />
      </div>

      <div className='search-form'>
        {/* TODO: enable search */}
        {/* <SearchBar /> */}
      </div>
    </nav>
  );
}
