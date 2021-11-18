import TableMobileCell from "../basicComponents/TableMobileCell";
import TableMobileHeader from "../basicComponents/TableMobileHeader";
import PropTypes from "prop-types";

function ParkingMobileTable({ parkingId, propertyNo }) {
  return (
    <div className="py-3 align-middle inline-block min-w-full px-5">
      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <table className="min-w-full">
          <tbody className="bg-white ">
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Parking Id" />
              <TableMobileCell
                value={parkingId}
                link={
                  localStorage.getItem("group") === "1"
                    ? `/parking/change/${parkingId}`
                    : null
                }
              />
            </tr>

            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Property No" />
              <TableMobileCell value={propertyNo} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

ParkingMobileTable.propTypes = {
  parkingId: PropTypes.string.isRequired,
  propertyNo: PropTypes.string.isRequired,
};
export default ParkingMobileTable;
