import TableMobileCell from "../basicComponents/TableMobileCell";
import TableMobileHeader from "../basicComponents/TableMobileHeader";
import PropTypes from "prop-types";

function SocietyStaffMobileTable({name, occupation, comesFrom, image,number}) {
  return (
    <div className="py-3 align-middle inline-block min-w-full px-5">
      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <table className="min-w-full">
          <tbody className="bg-white ">
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Name" />
              <TableMobileCell value={name} />
            </tr>

            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Occupation" />
              <TableMobileCell value={occupation} />
            </tr>
            {/* <tr className="even:bg-gray-100">
              <TableMobileHeader value="Salary" />
              <TableMobileCell value={salary} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Aadhaar" />
              <TableMobileCell value={aadhaar} />
            </tr> */}

            <tr className="even:bg-gray-100">
              <TableMobileHeader value="ComesFrom" />
              <TableMobileCell value={comesFrom} />
            </tr>
            {/* <tr className="even:bg-gray-100">
              <TableMobileHeader value="Comes From" />
              <TableMobileCell value={comesFrom} />
            </tr> */}
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Mobile No" />
              <TableMobileCell value={number} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Photo" />
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
  image: PropTypes.string.isRequired,
};

export default SocietyStaffMobileTable;
