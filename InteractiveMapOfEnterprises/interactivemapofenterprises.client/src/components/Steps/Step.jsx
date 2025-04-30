import Button from "./../Buttons/Button";

function Step({ children, onNext }) {
  return (
    <section className="step">
      {children}
      <div className="step__footer">
        <Button onClick={() => window.location = "/catalog"}>Отмена</Button>
        <Button onClick={onNext}>Далее</Button>
      </div>
    </section>
  );
}

export default Step;
