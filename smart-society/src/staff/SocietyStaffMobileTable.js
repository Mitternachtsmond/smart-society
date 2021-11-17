import TableMobileCell from "../basicComponents/TableMobileCell";
import TableMobileHeader from "../basicComponents/TableMobileHeader";
import PropTypes from "prop-types";

function SocietyStaffMobileTable({
  name,
  s_no,
  salary,
  worksIn,
  image,
  occupation,
}) {
  return (
    <div className="py-3 align-middle inline-block min-w-full px-5">
      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <table className="min-w-full">
          <tbody className="bg-white ">
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Name" />
              <TableMobileCell
                value={name}
                link={
                  localStorage.getItem("group") === "1"
                    ? `/societystaff/change/${s_no}`
                    : 0
                }
              />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Occupation" />
              <TableMobileCell value={occupation} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Salary" />
              <TableMobileCell value={salary} />
            </tr>

            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Works In" />
              <TableMobileCell value={worksIn} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Image" />
              <td className="px-3 py-3 md:py-4 whitespace-normal">
                <img
                  src={image}
                  alt="Society Staff"
                  className="h-20 w-20 float-right"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

SocietyStaffMobileTable.propTypes = {
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  worksIn: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default SocietyStaffMobileTable;
