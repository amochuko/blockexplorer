interface FallbackProps {
  title: string;
}
export function Fallback(props: FallbackProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <p style={{ fontSize: 18 }}>{props.title}</p>
    </div>
  );
}
