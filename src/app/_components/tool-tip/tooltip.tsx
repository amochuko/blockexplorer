import './tooltip.scss';

interface ToolTipProps {
  children?: React.ReactNode;
  title: string;
}
export function ToolTip(props: ToolTipProps) {
  return (
    <div className='tool-tip'>
      <p className='title'>{props.title}</p>
      {props.children}
    </div>
  );
}
