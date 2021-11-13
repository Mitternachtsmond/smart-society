import TableMobileCell from "../basicComponents/TableMobileCell";
import TableMobileHeader from "../basicComponents/TableMobileHeader";
import PropTypes from "prop-types";

function MaintenanceMobileTable({property, month, basic, paid, penalty, due}) {
  return (
    <div className="py-3 align-middle inline-block min-w-full px-5">
      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <table className="min-w-full">
          <tbody className="bg-white ">
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Property" />
              <TableMobileCell value={property} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Month" />
              <TableMobileCell value={month} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Basic" />
              <TableMobileCell value={basic} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Paid" />
              <TableMobileCell value={paid} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Penalty" />
              <TableMobileCell value={penalty} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Due" />
              <TableMobileCell value={due} />
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
};

export default MaintenanceMobileTable;
