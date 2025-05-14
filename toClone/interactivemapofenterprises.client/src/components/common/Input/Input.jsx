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
}) {
  return (
    <div className={classes.container}>
      <label className={classes.label} htmlFor={name}>
        <span>{label}:</span>
        {isRequired ? (
          <abbr className={classes.abbr} title="required">
            *
          </abbr>
        ) : (
          ""
        )}
        <em className={classes.em}>{em}</em>
      </label>
      <input
        className={classes.input}
        id={name}
        name={name}
        type={type}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        onChange={onChange}
        accept={accept}
        required={isRequired}
        disabled={isDisabled}
      />
    </div>
  );
}

export default Input;
