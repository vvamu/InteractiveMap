import ListDetails from "./ListDetails";

const errorIcon = "/error.svg";

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
