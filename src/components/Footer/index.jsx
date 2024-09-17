// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gray-200 text-white py-4 text-center p-2.5">
            <p className="text-gray-600">&copy; {currentYear} Company Name. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
