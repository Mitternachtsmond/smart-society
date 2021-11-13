import TableMobileCell from "../basicComponents/TableMobileCell";
import TableMobileHeader from "../basicComponents/TableMobileHeader";
import PropTypes from "prop-types";

function MemberMobileTable({ propertyNo, propertyType, name, mobile }) {
  return (
    <div className="py-3 align-middle inline-block min-w-full px-5">
      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <table className="min-w-full">
          <tbody className="bg-white ">
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Property No." />
              <TableMobileCell
                value={propertyNo}
                link={`/members/change/${propertyNo}`}
              />
            </tr>

            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Property Type" />
              <TableMobileCell value={propertyType} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Name" />
              <TableMobileCell value={name} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Mobile" />
              <TableMobileCell value={mobile} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

MemberMobileTable.propTypes = {
  propertyNo: PropTypes.string.isRequired,
  propertyType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
};
export default MemberMobileTable;
