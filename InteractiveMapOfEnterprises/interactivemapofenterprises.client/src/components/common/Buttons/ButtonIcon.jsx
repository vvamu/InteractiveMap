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
}) {
    return (
        <Button
            className={`${className} ${classes.btnIcon}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
            isPlayingSound={isPlayingSound}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            <img
                
                width={width}
                height={height}
                src={src}
                alt={alt}
            />
        </Button>
    );
}

export default ButtonIcon;