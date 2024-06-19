'use client'

import React,{useState,useEffect} from 'react'
import  ProModal  from './pro-Modal';

export const ModalProvider =()=>{
    const [isMounted,setIsMounted] = useState(false)
    useEffect(()=>{
        setIsMounted(true)
    },[])
    if(!isMounted){
        return null
    }
    return (
        <>
            <ProModal/>
        </>
    )
}