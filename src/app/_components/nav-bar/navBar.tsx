'use client';

import { Logo } from '@/app/_components/logo/logo';
import Link from 'next/link';
import { useState } from 'react';
import { ErrorBoundary } from '../hoc/error-boundary';
import { useEtherPrice } from '../hooks/useEtherPrice';
import { useGasPrice } from '../hooks/useGasPrice';
import { NavMenuItem } from './nav-bar-menu/nav-menu-items';
import './nav-bar.css';
import { SearchBar } from '../search/search-form';

interface NavBarProps {
  navMenuList?: any[];
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
      <div className='nav-menu'>
        <Logo title='MBlock Explorer' />
        <NavMenuItem menuItems={props.navMenuList} />
      </div>

      <ErrorBoundary>
        <div className='price'>
          {ethPrice > 0 && (
            <div className='ether-price'>
              <span>
                ETH Price: <Link href={'#'}>${ethPrice}</Link>
              </span>
            </div>
          )}
          {gasPrice > 0 && (
            <div className='gas-price'>
              <span>
                {' '}
                Gas Price: <Link href={'#'}>{gasPrice} Gwei</Link>
              </span>
            </div>
          )}
        </div>
      </ErrorBoundary>
      <div className='search-form'>
        {/* TODO: enable search */}
        {/* <SearchBar /> */}
      </div>
    </nav>
  );
}
