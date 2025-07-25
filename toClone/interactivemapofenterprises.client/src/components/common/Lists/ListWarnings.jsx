import ListDetails from "./ListDetails";

const warningIcon = "/warning.svg";

function ListWarnings({ warnings }) {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <ListDetails title={"Предуприждения"} icon={warningIcon}>
      {warnings.map((error, i) => (
        <li key={i}>
          <span>{i + 1} - </span>
          {error.message}
        </li>
      ))}
    </ListDetails>
  );
}

export default ListWarnings;
