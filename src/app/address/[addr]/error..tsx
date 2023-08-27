import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}
export default function TransactionPageError(props: ErrorProps) {

  useEffect(() => {
    // Log error to a reporting service
    console.error(props.error);
  });
  
  return (
    <>
      <h2>Something went wrong</h2>
      <button onClick={() => props.reset()}>Try again</button>
    </>
  );
}
