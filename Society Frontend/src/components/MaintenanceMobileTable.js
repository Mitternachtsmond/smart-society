import TableMobileCell from "./TableMobileCell";
import TableMobileHeader from "./TableMobileHeader";
import PropTypes from "prop-types";

function MaintenanceMobileTable(props) {
  return (
    <div className="py-3 align-middle inline-block min-w-full px-5">
      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <table className="min-w-full">
          <tbody className="bg-white ">
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Property" />
              <TableMobileCell value={props.property} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Month" />
              <TableMobileCell value={props.month} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Basic" />
              <TableMobileCell value={props.basic} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Paid" />
              <TableMobileCell value={props.paid} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Penalty" />
              <TableMobileCell value={props.penalty} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Due" />
              <TableMobileCell value={props.due} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Paid On" />
              <TableMobileCell value={props.paidOn} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
MaintenanceMobileTable.propTypes = {
  property: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  basic: PropTypes.string.isRequired,
  paid: PropTypes.string.isRequired,
  penalty: PropTypes.string.isRequired,
  due: PropTypes.string.isRequired,
  paidOn: PropTypes.string.isRequired,
};

export default MaintenanceMobileTable;
