import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User } from 'firebase/auth';
import { ReactNode, useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import auth from '@/firebase/firebase.init';
import useAxiosPublic from '@/hooks/useAxiosPublic';


type Props = {
  children: ReactNode;
};

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}: Props) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic()

  // create a new user
  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login with email and password
  const login = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // login with google popup
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //update user information
  const updateUserProfile = (updateInfo: object) => {
    return updateProfile(auth.currentUser as User, updateInfo);
  };

  // logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // observer auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user as User);
      // console.log("User from observer: ", user);
      if (user?.email) {
        axiosPublic.post("/jwt", { email: user?.email }).then((res) => {
          localStorage.setItem("access-token", res.data.token);
          console.log(res.data.token);
          setLoading(false);
        });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);
  const authValue = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    login,
    loginWithGoogle,
    updateUserProfile,
    logOut,
  };
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;