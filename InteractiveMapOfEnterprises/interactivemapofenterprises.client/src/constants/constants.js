import AchievementsComponyStep from "../components/EditCompanyPage/Steps/AchievementsComponyStep";
import MinimalInfoAboutComponyStep from "../components/EditCompanyPage/Steps/MinimalInfoAboutComponyStep";
import VideoComponyStep from "../components/EditCompanyPage/Steps/VideoComponyStep";

export const VOLUME_SOUND_UI = 1;

export const ERRORS = {
  NOT_VALUE_NAME: {
    message: "Не введенно название предприятия.",
  },
  NOT_VALUE_FOUNDATION_DATE: {
    message: "Не заданна дата основания предприятия.",
  },
  NOT_SELECTED_LOGO: {
    message: "Не выброн логотип предприятия.",
  },
  NOT_CORRECT_EXTENSION_LOGO: {
    message: "Расшерение файла логотипа не типа <.png>.",
  },
  NOT_VALUE_POSITION: {
    message: "Не указанно местоположение предприятия.",
  },
  NOT_SELECTED_VIDEO: {
    message: "Не выброн видеоролик.",
  },
  VERY_BIG_SIZE_VIDEO: {
    message: "Видеоролик не может превышать размер 500мб.",
  },
  NOT_CORRECT_EXTENSION_VIDEO: {
    message: "Расшерение файла видео не типа <.mp4>.",
  },
  ACHIEVEMENTS_IS_ZERO:{
    message: "Должно быть хотя бы одно достижение.",
  }
};

export const WARNINGS = {
  SMALL_NAME: {
    message:
      "Название предприятие очень короткое. Проверте его, если все хорошо, проигнорируйте данное сообщние.",
  },
  SMALL_ADD_NAME: {
    message:
      "Сокращенное название предприятие очень короткое. Проверте его, если все хорошо, проигнорируйте данное сообщние.",
  },
};

export const TYPE_LIST = {
  vertical: "vertical",
  horizontal: "horizontal",
};

export const TYPE_CHAPTER = {
  MINIMAL_INFO_ABOUT: {
    type: "MINIMAL_INFO_ABOUT",
    name: "Краткая инфо.",
    description:
      "Заполнение минимальной информации для отображения предприятия на карте.",
    isVisible: false,
    componentStep: MinimalInfoAboutComponyStep,
  },
  VIDEO: {
    type: "VIDEO",
    name: "Видиоролик",
    description: "Ознакомительный видеоролик об предприятии.",
    isVisible: true,
    componentStep: VideoComponyStep,
  },
  ACHIEVEMENTS: {
    type: "ACHIEVEMENTS",
    name: "Достежения",
    description: "Перечесление достежений предприятия.",
    isVisible: true,
    componentStep: AchievementsComponyStep,
  },
};
