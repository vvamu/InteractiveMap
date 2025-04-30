import ListDetails from "./ListDetails";

import errorIcon from "./../../assets/icons/error.svg";

function ListErrors({ errors }) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <ListDetails title={"Ошибки"} icon={errorIcon}>
      {errors.map((error, i) => (
        <li key={i}>
          <span>{i + 1} - </span>
          {error.message}
        </li>
      ))}
    </ListDetails>
  );
}

export default ListErrors;
