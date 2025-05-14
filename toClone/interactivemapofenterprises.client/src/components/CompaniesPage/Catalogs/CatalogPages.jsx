import List from "../../Common/Lists/List";
import Pagination from "../../Trash/Pagination/Pagination";

import { TYPE_LIST } from "../../../constants/constants";

function CatalogPages({ children, currentPage, totalPages, onPageChange }) {
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

export default CatalogPages;
