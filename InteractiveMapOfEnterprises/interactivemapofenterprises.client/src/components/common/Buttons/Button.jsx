import { VOLUME_SOUND_UI } from "../../../constants/constants";
import classes from "./Button.module.css";

//sound
import clickSound from "/sounds/click.mp3";

function Button({
  className = "",
  children,
  type = "button",
  onClick,
  disabled = false,
  isPlayingSound = true,
}) {
  const playClikSound = () => {
    const sound = new Audio(clickSound);
    sound.volume = VOLUME_SOUND_UI;
    sound.play();
  };

  return (
      <button
          style={{ minWidth:"50px" }}
      type={type}
      onClick={() => {
        if (isPlayingSound) {
          playClikSound();
        }

        if (onClick) {
          onClick();
        }
      }}
      disabled={disabled}
    >
      <div>
        <div>{children}</div>
      </div>
    </button>
  );
}

export default Button;
