import Button from "../../common/Buttons/Button";

function Step({ children, onNext, onCancel }) {


  return (
    <>
          {children}
          <div className="flexContent" style={{margin:"10px 0px"}}>
              <Button onClick={() => { onCancel() }}>Отмена</Button>
              <Button onClick={onNext}>Подтвердить</Button>
      </div>
    </>
  );
}

export default Step;
