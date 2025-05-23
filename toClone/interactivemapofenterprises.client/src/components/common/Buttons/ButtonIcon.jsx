import Button from "./Button";
import classes from "./Button.module.css";

function ButtonIcon({
    className = "",
    type = "button",
    width = 24,
    height = 24,
    onClick,
    disabled = false,
    isPlayingSound = true,
    src,
    alt,
    imgStyle,
    heightBtn,
    title
}) {
    return (
        <Button
            className={`${className} ${classes.btnIcon}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
            isPlayingSound={isPlayingSound}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", height: { heightBtn } }}
            
        >
            {/*{*/}
                
            {/*    src.split('.')[src.split('.').length - 1] == "svg" ? <:*/}
            {/*}*/}
            <img
                title={title }
                style={imgStyle}
                width={width}
                height={height}
                src={src}
                alt={alt}
            />
        </Button>
    );
}

export default ButtonIcon;