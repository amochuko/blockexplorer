import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Suspense } from 'react';
import { Footer } from './_components/footer/footer';
import { NavBar } from './_components/nav-bar/navBar';
import { navMenuList } from './api/data';
import './globals.scss';
import Loading from './loading';
import { Providers } from './providers';

const roboto = Roboto({ subsets: ['latin'], weight: '400', display: 'swap' });

export const metadata: Metadata = {
  title: 'MBlock Explorer',
  description: 'A simple Etheruem Blockchain Explorer',
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: LayoutProps) {
  return (
    <html lang='en'>
      <body
        className={roboto.className}
        style={{ position: 'relative', minHeight: '100vh' }}
      >
        {/* <WebVitals /> */}
        <Suspense fallback={<Loading />}>
          <Providers>
            <NavBar navMenuList={navMenuList}  logoTitle='MBlock Explorer' />
            <Suspense fallback={<Loading />}>
              <div style={{ paddingBottom: '3rem' }}>{props.children}</div>
            </Suspense>
            <Footer />
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
