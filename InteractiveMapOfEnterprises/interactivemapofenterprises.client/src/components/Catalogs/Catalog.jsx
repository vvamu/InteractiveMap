import List from "../Lists/List";
import Pagination from "../Pagination/Pagination";

import { TYPE_LIST } from "../../constants/constants";

function Catalog({ children, currentPage, totalPages, onPageChange }) {
  return (
    <section>
      <List type={TYPE_LIST.vertical}>{children}</List>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        alignment="end"
        onPageChange={onPageChange}
      />
    </section>
  );
}

export default Catalog;
