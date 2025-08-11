
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Leaf, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('test123');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // For demo purposes, simulate successful login
            if (email === 'test@example.com' && password === 'test123') {
                // Store auth state in localStorage for demo
                localStorage.setItem('agriverse_auth', 'true');
                localStorage.setItem('agriverse_user', JSON.stringify({
                    email: email,
                    name: 'Test User'
                }));
                navigate('/');
            } else {
                setError('Invalid credentials. Use test@agriverse.com / password123');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <Leaf className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Welcome to AgriVerse</CardTitle>
                    <CardDescription>
                        Sign in to access rice production forecasting tools
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-400" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>

                        <div className="text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-green-600 hover:underline">
                                Sign up
                            </Link>
                        </div>
                    </form>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 font-medium mb-2">Test Credentials:</p>
                        <p className="text-sm text-blue-600">Email: test@example.com</p>
                        <p className="text-sm text-blue-600">Password: test123</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
