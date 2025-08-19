import React, { useState, createContext, useContext, useEffect, ReactNode } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    setPersistence,
    browserLocalPersistence,
} from 'firebase/auth';

interface User {
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    loading: boolean; // 👈 added
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // 👈 added

    useEffect(() => {
        // Ensure persistence across reloads (optional, safe to call once)
        setPersistence(auth, browserLocalPersistence).catch(() => { /* ignore */ });

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    email: firebaseUser.email || '',
                    name:
                        firebaseUser.displayName ||
                        firebaseUser.email?.split('@')[0] ||
                        'User',
                });
                localStorage.setItem('uid', firebaseUser.uid);
                localStorage.setItem('accTok', firebaseUser.accessToken);
                // console.log("LOG 1 :", firebaseUser.accessToken);
            } else {
                setUser(null);
                localStorage.removeItem('uid');
                localStorage.removeItem('accTok');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const fbUser = result.user;
        localStorage.setItem('uid', fbUser.uid);
        console.log("LOG 2 :", fbUser);
        setUser({
            email: fbUser.email || '',
            name: fbUser.displayName || email.split('@')[0],
        });
    };

    const signup = async (email: string, password: string, name: string) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, { displayName: name });

        await setDoc(doc(db, 'users', res.user.uid), {
            uid: res.user.uid,
            email: res.user.email,
            name,
            createdAt: new Date(),
        });
        localStorage.setItem('uid', res.user.uid);
        // console.log("LOG3 :", res)

        setUser({ email: res.user.email || '', name });
    };

    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem('uid');
        localStorage.removeItem('accTok');
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                signup,
                logout,
                isAuthenticated: !!user,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
