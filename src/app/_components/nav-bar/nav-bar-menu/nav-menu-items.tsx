import Link from 'next/link';
import { ErrorBoundary } from '../../hoc/error-boundary';

import { useState } from 'react';
import { HamburgerIcon } from '../../hamburger-icon';
import styles from './nav-menu-items.module.css';

export const NavMenuItem = (props: any) => {
  // const isActive = pathname.startsWith(+'/' + link.href);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ul className={styles.navMenuList}>
      {/* <HamburgerIcon isMenuOpen={isOpen} setIsMenuOpen={setIsOpen} /> */}
      <ErrorBoundary>
        {props.menuItems?.length > 0 &&
          props.menuItems.map((itm: any, i: number) => (
            <li className={styles.navMenuListItem} key={itm.title}>
              <Link href={itm.href.toLowerCase()}>{itm.title}</Link>
            </li>
          ))}
      </ErrorBoundary>
    </ul>
  );
};
