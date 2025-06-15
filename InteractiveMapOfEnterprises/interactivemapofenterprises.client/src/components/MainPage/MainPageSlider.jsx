//const MainPageSlider = () => (
    //<div style={{
    //    backgroundImage: "url(belaz2.jpg)",
    //    height: "380px",
    //    width: "100%",
    //    zoom: "180%",
    //    backgroundSize: "cover",
    //    backgroundRepeat: "no-repeat",
    //    backgroundPositionX: "50%"
    //}}></div>
//);

//export default MainPageSlider;

import React, { useState, useEffect } from 'react';

const MainPageSlider = () => {
    const slides = [
        { id: 1, image: `url('/mainPage/belaz2.jpg')` },
        { id: 2, image: `url('/mainPage/kommunarka.jpg')` },
        { id: 3, image: `url('/mainPage/soligorsk.jpg')` },
        { id: 4, image: `url('/mainPage/naftan.jpg')` },
        { id: 5, image: `url('/mainPage/gorizont.jpg')` },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const sliderContainerStyle = {
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        minHeight: '580px',
        height:"100%",
        marginTop:"0px"
    };

    const sliderWrapperStyle = {
        display: 'flex',
        transition: 'transform 0.7s ease-in-out',
        transform: `translateX(-${currentSlide * 100}%)`,
        height:"80%"
    };

    const slideStyle = {
        flex: '0 0 100%',
        height: '100%',
        minHeight:"450px",
        width: '100%',
        zoom: '180%',
        backgroundImage: `url('/mainPage/belaz2.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: '50%',
    };

    const buttonStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'white',
        border: 'none',
        padding: '10px 15px',
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: 1,
    };

    return (
        <div style={sliderContainerStyle}>
            <div style={sliderWrapperStyle}>
                {slides.map((slide) => (
                    <div key={slide.id} style={{
                        ...slideStyle, backgroundImage: `${slide.image}`
                    }}>
                       
                    </div>))}
            </div>
            <button style={{ ...buttonStyle, left: '10px' }} onClick={prevSlide}>
                ‹
            </button>
            <button style={{ ...buttonStyle, right: '10px' }} onClick={nextSlide}>
                ›
            </button>
        </div>
    );
};

export default MainPageSlider;