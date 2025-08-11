import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {}
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check for stored auth state
        const authState = localStorage.getItem('agriverse_auth');
        const userData = localStorage.getItem('agriverse_user');

        if (authState === 'true' && userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing user data:', error);
                logout();
            }
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('agriverse_auth', 'true');
        localStorage.setItem('agriverse_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('agriverse_auth');
        localStorage.removeItem('agriverse_user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
