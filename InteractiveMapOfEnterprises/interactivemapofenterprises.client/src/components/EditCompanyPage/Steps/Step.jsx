import Button from "../../common/Buttons/Button";

function Step({ children, onNext }) {
  return (
    <section>
      {children}
      <div className="step__footer">
        <Button onClick={() => window.location = "/catalog"}>Отмена</Button>
        <Button onClick={onNext}>Далее</Button>
      </div>
    </section>
  );
}

export default Step;
