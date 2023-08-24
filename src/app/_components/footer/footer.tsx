import React from 'react';
import './footer.css';

export function Footer() {
  const date = new Date();
  return (
    <footer className='footer'>
      <p> &copy; {date.getUTCFullYear()} MBlock Explorer</p>
    </footer>
  );
}
