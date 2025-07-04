"use client"
import { Button } from "@/components/ui/button";
import { KeyRound } from 'lucide-react';

export default function Protected() {
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Tenant-ID': '949347316'
                  },
                  credentials: 'include',
            });

            if (response.ok) {
                window.location.href = '/';
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            You are logged in! <Button onClick={handleLogout}>Logout <KeyRound/></Button>
        </div>
    );
}