import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getLoggedInUser } from '@/lib/auth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const user = getLoggedInUser();

    if (!user) {
      // Redirect to login if not logged in
      router.push('/login');
    }else{
        setAuthorized(true);
    }
  }, [authorized, router]);

  // If user is logged in, render children
  if (authorized) {
    return <>{children}</>;
  }

  // While the check is being done, you could show a loading indicator or something else
  return <div>Loading...</div>;
};

export default ProtectedRoute;
