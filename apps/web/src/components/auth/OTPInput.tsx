'use client'

import React, { useState, useEffect } from 'react'
import { CardContent } from "@/components/ui/card"
import { confirmSignUp, autoSignIn, resendSignUpCode, getCurrentUser } from 'aws-amplify/auth'
import { useRouter } from 'next/navigation'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { Button } from '../ui/button'
import { useToast } from "@/hooks/use-toast"
import { assignClabeToUser } from '@/utils/user-service'

interface OTPInputProps {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const OTPInput: React.FC<OTPInputProps> = ({ email, password, firstName, lastName }) => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const storedEndTime = localStorage.getItem('otpTimerEndTime');
        if (storedEndTime) {
            const remainingTime = Math.max(0, Math.floor((parseInt(storedEndTime) - Date.now()) / 1000));
            setTimer(remainingTime);
            setCanResend(remainingTime === 0);
        } else {
            setCanResend(true);
        }

        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    setCanResend(true);
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleVerifyCode = async () => {
        if (loading) return;
        setLoading(true);

        try {
            await confirmSignUp({
                username: email,
                confirmationCode: code
            });

            const signInResult = await autoSignIn();
            
            if (signInResult.isSignedIn) {
                console.log("User signed in, getting current user...");
                const { username } = await getCurrentUser();
                console.log("Got username:", username);
                await assignClabeToUser(username, email, firstName, lastName);
                console.log("CLABE assigned successfully");
            }

            router.push('/dashboard');
            toast({
                title: "Cuenta verificada",
                description: "Tu cuenta ha sido verificada exitosamente.",
            });
        } catch (error) {
            console.error('Error in verification process:', error);
            toast({
                title: "Error al verificar la cuenta",
                description: error instanceof Error ? error.message : "Ocurrió un error inesperado",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (!canResend) return;

        try {
            await resendSignUpCode({
                username: email
            });
            setTimer(60);
            setCanResend(false);
            const newEndTime = Date.now() + 60000;
            localStorage.setItem('otpTimerEndTime', newEndTime.toString());
            
            toast({
                title: "Código reenviado",
                description: "Por favor revisa tu correo electrónico.",
            });
        } catch (error) {
            console.error('Error al reenviar el código:', error);
            toast({
                title: "Error al reenviar el código",
                description: error instanceof Error ? error.message : "Ocurrió un error inesperado",
                variant: "destructive",
            });
        }
    };

    return (
        <CardContent className="space-y-4 flex flex-col items-center font-clash-display">
            <p className="text-center">Ingresa el código de verificación enviado a tu correo electrónico</p>
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={code} onChange={setCode} className="flex justify-center">
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            <Button className="w-full" onClick={handleVerifyCode} disabled={loading}>
                {loading ? "Verificando..." : "Verificar código"}
            </Button>
            <Button 
                className="w-full" 
                variant="outline" 
                onClick={handleResendCode} 
                disabled={!canResend}
            >
                {canResend 
                    ? "Reenviar código" 
                    : `Reenviar código en ${timer}s`}
            </Button>
        </CardContent>
    );
};

export default OTPInput;
