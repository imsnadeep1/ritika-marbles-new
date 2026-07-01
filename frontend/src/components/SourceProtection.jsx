import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { enableSourceProtection, shouldEnableSourceProtection } from '@/lib/sourceProtection';

const SourceProtection = () => {
  const location = useLocation();

  useEffect(() => {
    if (!shouldEnableSourceProtection(location.pathname)) {
      document.documentElement.classList.remove('source-protected');
      return undefined;
    }

    return enableSourceProtection();
  }, [location.pathname]);

  return null;
};

export default SourceProtection;
