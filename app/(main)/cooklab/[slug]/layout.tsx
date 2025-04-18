import React from 'react';
import  "./styles.module.css"

export default function CookLabLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="cooklab-layout">
            {children}
        </div>
    );
}