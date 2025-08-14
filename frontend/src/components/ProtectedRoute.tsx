// components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

type Props = { children: React.ReactElement };

const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="grid h-screen place-items-center">
                <div
                    className="flex items-center gap-3 text-muted-foreground"
                    role="status"
                    aria-live="polite"
                    aria-busy="true"
                >
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Restoring your session…</span>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
};

export default ProtectedRoute;
