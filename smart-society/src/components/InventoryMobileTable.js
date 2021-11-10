import TableMobileCell from "./TableMobileCell";
import TableMobileHeader from "./TableMobileHeader";
import PropTypes from "prop-types";

function InventoryMobileTable(props) {
  return (
    <div className="py-3 align-middle inline-block min-w-full px-5">
      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <table className="min-w-full">
          <tbody className="bg-white ">
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Item" />
              <TableMobileCell value={props.item} />
            </tr>

            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Quantity" />
              <TableMobileCell value={props.quantity} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

InventoryMobileTable.propTypes = {
  item: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
};
export default InventoryMobileTable;
