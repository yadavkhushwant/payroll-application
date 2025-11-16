"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { KeyRound, Loader2 } from 'lucide-react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useLogin, useGoogleLogin as useGoogleLoginMutation } from '@/lib/hooks/useAuth';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const loginMutation = useLogin();
  const googleLoginMutation = useGoogleLoginMutation();

  const login = useGoogleLogin({
    onSuccess: async codeResponse => {
      console.log(codeResponse);
      try {
        await googleLoginMutation.mutateAsync(codeResponse.code);
      } catch (error) {
        console.error('Google login failed:', error);
      }
    },
    flow: 'auth-code',
  });

  const handleLogin = async () => {
    if (!username || !password) {
      console.error('Username and password are required');
      return;
    }

    try {
      await loginMutation.mutateAsync({ username, password });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the payroll system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loginMutation.isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loginMutation.isPending}
            />
          </div>
          
          <Button 
            onClick={handleLogin} 
            className="w-full"
            disabled={loginMutation.isPending || !username || !password}
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign in <KeyRound className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          {loginMutation.isError && (
            <div className="text-sm text-red-600 text-center">
              Login failed. Please check your credentials.
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log('Google login success:', credentialResponse);
              }}
              onError={() => {
                console.log('Google login failed');
              }}
              useOneTap
              theme="outline"
              size="large"
              width="100%"
            />
            
            <Button 
              onClick={login} 
              variant="outline" 
              className="w-full"
              disabled={googleLoginMutation.isPending}
            >
              {googleLoginMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in with Google...
                </>
              ) : (
                <>
                  Sign in with Google <KeyRound className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {googleLoginMutation.isError && (
              <div className="text-sm text-red-600 text-center">
                Google login failed. Please try again.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
