"use client"

import { useEffect, useState } from 'react';
import { useSecurity } from '@/components/context/Securitycontex';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const WARNING_THRESHOLD = 60 * 1000; // 1 minute warning

export function SessionWarning() {
  const { lastActivity } = useSecurity();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const timeSinceActivity = Date.now() - lastActivity.getTime();
      const timeUntilTimeout = 30 * 60 * 1000 - timeSinceActivity; // 30 minute timeout
      
      if (timeUntilTimeout <= WARNING_THRESHOLD) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
    };

    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, [lastActivity]);

  const handleExtendSession = () => {
    // Trigger activity
    document.dispatchEvent(new Event('mousedown'));
    setShowWarning(false);
  };

  return (
    <Dialog open={showWarning} onOpenChange={setShowWarning}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Su sesión está por expirar</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>¿Desea mantener la sesión activa?</p>
          <div className="flex justify-end space-x-2">
            <Button onClick={handleExtendSession}>
              Mantener sesión activa
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}