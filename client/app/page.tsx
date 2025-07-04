"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound } from 'lucide-react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async codeResponse => {
      console.log(codeResponse);
      //call backend api to login 
      const response = await fetch('http://localhost:8080/api/auth/google/callback?code='+codeResponse.code, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Tenant-ID': '949347316'
        },
        credentials: 'include'
      });
      if (response.ok) {
        router.push('/protected');
      } else {
        console.error('Login failed');
      }
    },
    flow: 'auth-code',
  });

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Tenant-ID': '949347316'
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        router.push('/protected');
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>
        Login <KeyRound />
      </Button>
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
        />
      <Button onClick={login}>
        Login with google<KeyRound />
      </Button>
    </div>
  );
}