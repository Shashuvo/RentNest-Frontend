"use client";

import { useEffect } from "react";
import { toast } from "sonner";

interface ProfileErrorToastProps {
    message: string;
}

export function ProfileErrorToast({ message }: ProfileErrorToastProps) {
    useEffect(() => {
        toast.error("Failed to load profile", {
            description: message,
        });
    }, [message]);

    return null;
}