import { FC } from 'react';
import './styles/loading.css'; // Import CSS file for styling

interface LoadingSpinnerProps {
  position?: string,
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({position}) => {
  return (
    <div className={`loading-spinner-overlay ${position?position:"fixed"}`}>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
