'use client'
import React, { useEffect } from 'react'
import Success from './Sucess'
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function page() {
    const { id } = useSelector((store) => store.user);
    const router = useRouter();

    useEffect(() => {
        if (!id) {
            router.push("/sign-in");
        }
    }, []);


    return (
        <>
            <Success />
        </>
    )
}