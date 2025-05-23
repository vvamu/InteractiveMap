import classes from "./Input.module.css";

function Input({
  label,
  name,
  type = "text",
  em = "",
  value = "",
  minLength = 0,
  maxLength = 1000,
  pattern,
  isRequired = false,
  isDisabled = false,
  accept = "",
  onChange,
  onClick,
  Classes,
  placeholder
}) {
    return (
        <div  className={classes.container}>
       <label className={classes.label} htmlFor={name}>
                <span className={Classes ?? ""}>{label}:</span>
        {isRequired ? (
          <abbr className={classes.abbr} title="required">
            *
          </abbr>
        ) : (
          ""
        )}
        <div className={classes.em}>{em}</div>
      </label>
            <input
                className={ "" ?? classes.input}
              id={name}
              name={name}
              type={type}
              value={value}
              minLength={minLength}
              maxLength={maxLength}
              pattern={pattern}
              onChange={onChange}
              onClick={onClick}
              accept={accept}
              required={isRequired}
              disabled={isDisabled}
              placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
