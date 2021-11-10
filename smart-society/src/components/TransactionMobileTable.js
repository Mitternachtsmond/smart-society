import TableMobileCell from "./TableMobileCell";
import TableMobileHeader from "./TableMobileHeader";
import PropTypes from "prop-types";

function TransactionMobileTable(props) {
  return (
    <div className="py-3 align-middle inline-block min-w-full px-5">
      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <table className="min-w-full">
          <tbody className="bg-white ">
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="To/From" />
              <TableMobileCell value={props.to} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Date and Time" />
              <TableMobileCell value={props.date} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Paid/Received" />
              <TableMobileCell value={props.option} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Amount" />
              <TableMobileCell value={props.amount} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
TransactionMobileTable.propTypes = {
  to: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
};

export default TransactionMobileTable;
