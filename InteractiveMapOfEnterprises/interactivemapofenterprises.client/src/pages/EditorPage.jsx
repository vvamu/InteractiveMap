import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Title from "../components/Title";
import StepsProgress from "../components/StepsProgress/StepsProgress";
import MinimalInfoAboutComponyStep from "./../components/Steps/MinimalInfoAboutComponyStep";
import LoaderBox from "./../components/InfoBoxs/LoaderBox";

import companiesService from "./../services/companiesService";
import { TYPE_CHAPTER } from "../constants/constants";

function EditorPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");
  const chapterTypes = searchParams.get("chapterTypes")?.split(",");

  const [isActiveLoader, setIsActiveLoader] = useState(false);
  const [messageLoader, setMessageLoader] = useState(undefined);

  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState();

  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const selectedStep = [];
    chapterTypes.forEach((value) =>
      selectedStep.push({ props: TYPE_CHAPTER[value], status: "next" })
    );
    if (chapterTypes.length !== 0) {
      selectedStep[0].status = "progress";

      setSteps(selectedStep);
      setCurrentStep(selectedStep[0]);
    }
  }, []);

  const findStepId = (type) => {
    return steps.findIndex((step) => step.props.type === type);
  };

  const handlePassed = (type, data) => {
    const id = findStepId(type);

    if (id === -1) return;

    const chapter = {
      type: type,
      content: data,
    };

    setChapters([...chapters, chapter]);

    const updateSteps = [...steps];

    updateSteps[id].status = "completed";

    if (id + 1 < steps.length) {
      const nextStep = updateSteps[id + 1];

      nextStep.status = "progress";

      setCurrentStep(nextStep);
      setSteps(updateSteps);
    } else {
      setSteps(updateSteps);
      onOverStept([...chapters, chapter]);
    }
  };

  const onOverStept = (updateSteps) => {
    onActiveLoader("Загрузка данных на сервер");
    companiesService.create(updateSteps).then((isSaved) => {
      onCloseLoader();
      document.location = "/catalog";
    });
  };

  const onActiveLoader = (message) => {
    setIsActiveLoader(true);
    setMessageLoader(message);
  };

  const onCloseLoader = () => {
    setIsActiveLoader(false);
    setMessageLoader(undefined);
  };

  const getStep = () => {
    if (!currentStep) {
      return;
    }

    const Component = currentStep.props.componentStep;
    return (
      <Component
        onPassed={(data) => handlePassed(currentStep.props.type, data)}
      />
    );
  };

  return (
    <>
      <header className="editor-header">
        <Title className="editor-header__title" level={1}>
          Заполнение информации об предприятии
        </Title>
        <StepsProgress steps={steps} />
      </header>
      <main>{getStep()}</main>
      <footer></footer>
      <LoaderBox active={isActiveLoader}>
        <p className="message-loader">{messageLoader}</p>
      </LoaderBox>
    </>
  );
}

export default EditorPage;
