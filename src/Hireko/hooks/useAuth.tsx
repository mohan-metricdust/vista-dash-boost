
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Hub } from 'aws-amplify';
import { getCurrentAuthUser, signOutUser } from '@/services/cognitoService';

interface AuthUser {
  userId: string;
  username: string;
  attributes: {
    email?: string;
    name?: string;
    [key: string]: any;
  };
  signInUserSession: any;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
  clearUserState: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuthState = async () => {
    const currentUser = await getCurrentAuthUser();
    setUser(currentUser);
    setLoading(false);
  };

  useEffect(() => {
    checkAuthState();

    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signIn':
        case 'cognitoHostedUI':
          checkAuthState();
          break;
        case 'signOut':
          setUser(null);
          break;
      }
    });

    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
  };

  const clearUserState = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut: handleSignOut, clearUserState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
