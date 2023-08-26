'use client';

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}
export default function GlobalError(props: GlobalErrorProps) {
  return (
    <html>
      <body>
        <h2>Something went wrong</h2>
        <button onClick={() => props.reset()}>Try agian</button>
      </body>
    </html>
  );
}
