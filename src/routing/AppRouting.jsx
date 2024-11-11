import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useAuthContext } from '@/auth';
import { useLoaders } from '@/providers';
import { AppRoutingSetup } from '.';

const AppRouting = () => {
  const { setProgressBarLoader } = useLoaders();
  const { verify } = useAuthContext();
  const location = useLocation();
  const path = location.pathname;

  const [previousLocation, setPreviousLocation] = useState(path);

  useEffect(() => {
    const init = async () => {
      setProgressBarLoader(true);
      try {
        if (verify) {
          await verify();
        }
      } catch (error) {
        console.error('Verification error:', error);
      } finally {
        setProgressBarLoader(false);
        // Update `previousLocation` only if it has changed
        if (path !== previousLocation) {
          setPreviousLocation(path);
        }
      }
    };

    init();
    // Dependency on `path` ensures re-run on route change
  }, [path, verify, previousLocation, setProgressBarLoader]);

  useEffect(() => {
    // Scroll to page top on route change if there’s no hash
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [previousLocation]);

  return <AppRoutingSetup />;
};

export { AppRouting };
