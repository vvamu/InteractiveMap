import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
function EmergingDiv({
    children,
    className = "",
    style = {},
    duration = 400,
    delay = 0
}) {
    const [isVisible, setVisibility] = useState(false);
    const nodeRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setVisibility(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <CSSTransition
            in={isVisible}
            timeout={duration}
            nodeRef={nodeRef}
            classNames="emerging"
            unmountOnExit
        >
            <div
                ref={nodeRef}
                className={`emerging-content ${className}`}
                style={{
                    ...style,
                    '--duration': `${duration}ms`,
                    '--delay': `${delay}ms`
                }}
            >
                {children}
            </div>
        </CSSTransition>
    );
}

export default EmergingDiv;