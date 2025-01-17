import { onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth';
import { ReactNode, useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import auth from '@/firebase/firebase.init';


type Props = {
  children: ReactNode;
};
const AuthProvider = ({children}: Props) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  // login with email and password
  const login = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

    // observer auth state change
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setUser(user as User)
            console.log("User from observer: ", user)
        })
        return ()=>{
            unsubscribe();
        }
    },[])
  const authValue = {
    user,
    setUser,
    loading,
    setLoading,
    login,
  };
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;