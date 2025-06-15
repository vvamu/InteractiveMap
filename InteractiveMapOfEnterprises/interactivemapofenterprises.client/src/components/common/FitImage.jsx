import React, { useState } from 'react';

export default function FitImage({ src, imageBytes, height, width, style, objectFit, className }) {
    const [isHover, setIsHover] = useState(false);

    const defaultStyles = {
        height: height ?? "100%",
        width: width ?? "100%",
        overflow: "hidden",
    };

    const combinedStyles = {
        ...defaultStyles,
        ...style
    };

    let image = !imageBytes
        ? "/emptyImageGray.jpg"
        : `data:image/png;base64,${imageBytes}`;

    return (
        <div
            style={combinedStyles}
            className={className}
            onMouseEnter={() => {
                setIsHover(true);
              
            }}
            onMouseLeave={() => {
                setIsHover(false);
               
            }}
        >
            <img
                src={src ?? image}
                style={{
                    objectFit: objectFit ?? "cover",
                    width: isHover ? "110%" : "100%",
                    height: isHover ? "110%" : "100%",
                    transition: "width  0.5s, height 0.5s", // Add smooth transition
                   
                }}
                alt="" // Always include alt text for accessibility
            />
        </div>
    );
}




//export default function FitImage({ src, height, width, style }) {

//    const defaultStyles = {
//        //height: height ?? "100%",
//        //width: width ?? "100%",
//        //overflow: "hidden",
//        objectFit: "cover",
//        width: "100%",
//        height: "100%"

//    }

//    const combinedStyles = {
//        ...defaultStyles,
//        ...style
//    };
//    return (
//        <div style={combinedStyles}>
//            <img src={src} style={combinedStyles}></img>
//        </div>
//    )
//}