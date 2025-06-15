
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const useLocationChangeLogger = () => {
    const location = useLocation();

    useEffect(() => {
        // Create loader element
        const loader = document.createElement('div');
        loader.style.position = 'absolute';
        //loader.style.top = '50%';
        //loader.style.left = '20%';
        loader.style.top = '0%';
        loader.style.left = '0%';
        loader.style.width = '00%';
        loader.style.height = '150%';
        loader.style.minHeight = '728px';
        loader.style.boxShadow = '0 0 35px 10px rgba(234, 147, 147,0.3)';
        //loader.style.backgroundColor = 'rgba(240,120,120,1)';
        loader.style.backgroundColor = 'rgba(255,255,255,1)';
        loader.style.zIndex = '9999';
        loader.style.animation = 'loaderAnimation 2s ease-in-out';

        // Add keyframes for animation
        const style = document.createElement('style');
        style.innerHTML = `
        @keyframes loaderAnimation {
            0% { width: 100%; opacity: 1; }
            50% { width: 50%; opacity: 1; }
            100% { width: 00%; opacity: 0; }
        }
        `   ;

        // Append to document
        document.body.appendChild(style);
        document.body.appendChild(loader);

        // Cleanup function
        return () => {
            // Remove loader after animation completes
            setTimeout(() => {
                if (loader.parentNode) {
                    document.body.removeChild(loader);
                }
                if (style.parentNode) {
                    document.body.removeChild(style);
                }
            }, 2000);
        };
    }, [location]);

    return null;
};

export default useLocationChangeLogger;