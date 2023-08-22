import Image from 'next/image';

import styles from './logo.module.css';

interface LogoProps {
  title: string;
  icon?: string;
}

/**
 * Logo component
 * @param props {title: string, icon: string}
 * @returns ReactNode
 */
export function Logo(props: LogoProps) {
  return (
    <p className={styles.logo}>
      {props.icon ? (
        <Image src={props.icon} alt='logo' width={32}/>
      ) : (
        <a href='/'>{props.title}</a>
      )}
    </p>
  );
}
