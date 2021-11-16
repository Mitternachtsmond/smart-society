import TableMobileCell from "../basicComponents/TableMobileCell";
import TableMobileHeader from "../basicComponents/TableMobileHeader";
import PropTypes from "prop-types";

function PersonalStaffMobileTable({ s_no, name, occupation, image }) {
  return (
    <div className="py-3 align-middle inline-block min-w-full px-5">
      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <table className="min-w-full">
          <tbody className="bg-white ">
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Name" />
              <TableMobileCell
                value={name}
                link={`/personalstaff/change/${s_no}`}
              />
            </tr>

            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Occupation" />
              <TableMobileCell value={occupation} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Image" />
              <td className="px-3 py-3 md:py-4 whitespace-normal">
                <img
                  className="h-20 w-20 float-right"
                  src={image}
                  alt="Personal Staff"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

PersonalStaffMobileTable.propTypes = {
  s_no: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
export default PersonalStaffMobileTable;
