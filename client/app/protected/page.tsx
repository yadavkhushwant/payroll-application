"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Loader2 } from 'lucide-react';
import { useLogout, useAuth } from '@/lib/hooks/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function Protected() {
    const { data: user } = useAuth();
    const logoutMutation = useLogout();

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return (
        <ProtectedRoute>
            <div className="flex items-center justify-center min-h-screen p-8 bg-gray-50">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center">Protected Page</CardTitle>
                        <CardDescription className="text-center">
                            You are successfully logged in!
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-4">
                                Welcome, {user?.username || 'User'}!
                            </p>
                            <Button 
                                onClick={handleLogout}
                                disabled={logoutMutation.isPending}
                                className="w-full"
                            >
                                {logoutMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing out...
                                    </>
                                ) : (
                                    <>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ProtectedRoute>
    );
}