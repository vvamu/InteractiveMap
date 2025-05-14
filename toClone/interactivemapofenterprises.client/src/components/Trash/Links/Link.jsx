import { VOLUME_SOUND_UI } from "../../../constants/constants";
import classes from "./Link.module.css";

//sound
import clickSound from "./../../assets/sounds/click.mp3";

function Link({
  className = "",
  children,
  href,
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
    <a
      href={href}
      className={`${className} ${classes.link}`}
      onClick={(evt) => {
        evt.preventDefault();

        if (isPlayingSound) {
          playClikSound();
        }

        if (onClick) {
          onClick();
        }

        setTimeout(function () {
          window.location.href = href;
        }, 100);
      }}
      disabled={disabled}
    >
      <div>
        <div>{children}</div>
      </div>
    </a>
  );
}

export default Link;
