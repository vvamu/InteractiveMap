import { NavLink } from "react-router-dom";
import OperationType from "../../models/OperationType";

const NavLinkWithImage = ({
    to = "/",
    operationType = OperationType.back,
    width = 24,
    height = 24,
    onClick,
    disabled = false,
    alt,
    imgStyle,
    heightBtn,
    title
}) => { 
    let styleOld = { display: "flex", alignItems: "center", justifyContent: "center", height: { heightBtn } }
    let styleByIcon = operationType?.style 
    return (
       <button>
            <NavLink
                onClick={onClick}
                disabled={disabled}
                style={
                    { ...styleOld, ...styleByIcon }
                    }
                to={`${to}?returnUrl=${encodeURIComponent(window.location.href)}`}>

                <img
                    title={title}
                    style={imgStyle}
                    width={width}
                    height={height}
                    src={operationType?.src}
                    alt={alt}
                />

            </NavLink>
        </button>
    );
}

export default NavLinkWithImage;


//import OperationType from "../../models/OperationType";

// const NavLinkWithImage =({
//    to,
//    width = 24,
//    height = 24,
//    onClick,
//    disabled = false,
//    alt,
//    imgStyle,
//    heightBtn,
//    title
//    ,operationType
//}) => {
//    return
//     (

//         <div style={{ width: "1000px", height: "1000px", backgroundColor: "black" }}></div>

        ////<NavLink
        ////    className={`${className} ${classes.btnIcon}`}
        ////    onClick={onClick}
        ////    disabled={disabled}
        ////    style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid black",height:"1000px"  }}
        ////    to={`${to}?returnUrl=${encodeURIComponent(window.location.href)}`}>

        ////        <img
        ////            title={title}
        ////            style={imgStyle}
        ////            width={width}
        ////            height={height}
        ////            src={operationType?.src ?? OperationType.back.src }
        ////        alt={alt}
        ////    />

        ////</NavLink>
//    )
//}
//export default NavLinkWithImage;