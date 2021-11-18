import TableMobileCell from "../basicComponents/TableMobileCell";
import TableMobileHeader from "../basicComponents/TableMobileHeader";
import PropTypes from "prop-types";

function PropertyMobileTable({ propertyType, maintenance, coveredArea }) {
  return (
    <div className="py-3 align-middle inline-block min-w-full px-5">
      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <table className="min-w-full">
          <tbody className="bg-white ">
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Property Type" />
              <TableMobileCell
                value={propertyType}
                link={
                  localStorage.getItem("group") === "1"
                    ? `/properties/change/${propertyType}`
                    : null
                }
              />
            </tr>

            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Maintenance" />
              <TableMobileCell value={maintenance} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Covered Area" />
              <TableMobileCell value={coveredArea} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

PropertyMobileTable.propTypes = {
  propertyType: PropTypes.string.isRequired,
  maintenance: PropTypes.string.isRequired,
  coveredArea: PropTypes.string.isRequired,
};
export default PropertyMobileTable;
