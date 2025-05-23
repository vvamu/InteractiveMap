import Button from "../../common/Buttons/Button";

function Step({ children, onNext, onCancel }) {


  return (
    <section>
      {children}
      <div className="step__footer">
              <Button onClick={() => { onCancel() }}>Отмена</Button>
              <Button onClick={onNext}>Подтвердить</Button>
      </div>
    </section>
  );
}

export default Step;
