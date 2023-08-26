import { ErrorBoundary } from '../hoc/error-boundary';
import './header.scss';

interface HeaderProps {
  data: any[];
}
export const Header = (props: HeaderProps) => {
  return (
    <ErrorBoundary>
      <div className='header-layout'>
        <ul className='list'>
          {props.data.length > 0 &&
            props.data.map((itm, i) => (
              <li key={i} className='list-itm'>
                <span className='title'>{itm.title.toUpperCase()}</span>
                <span className='value'>{itm.value}</span>
              </li>
            ))}
        </ul>
      </div>
    </ErrorBoundary>
  );
};
