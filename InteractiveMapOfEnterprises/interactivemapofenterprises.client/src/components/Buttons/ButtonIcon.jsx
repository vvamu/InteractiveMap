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
      className={`${className} ${classes.bntIcon}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      isPlayingSound={isPlayingSound}
    >
      <img width={width} height={height} src={src} alt={alt} />
    </Button>
  );
}

export default ButtonIcon;
