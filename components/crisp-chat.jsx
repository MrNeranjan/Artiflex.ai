'use client'

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("4390cc0f-1360-4b77-b835-4205f897b57d");
    }, [])

    return null;
}