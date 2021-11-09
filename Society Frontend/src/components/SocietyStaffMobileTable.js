import TableMobileCell from "./TableMobileCell";
import TableMobileHeader from "./TableMobileHeader";
import PropTypes from "prop-types";

function SocietyStaffMobileTable(props) {
  return (
    <div className="py-3 align-middle inline-block min-w-full px-5">
      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <table className="min-w-full">
          <tbody className="bg-white ">
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Name" />
              <TableMobileCell value={props.name} />
            </tr>

            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Occupation" />
              <TableMobileCell value={props.occupation} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Salary" />
              <TableMobileCell value={props.salary} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="AadharNumber" />
              <TableMobileCell value={props.aadhaar} />
            </tr>

            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Works In" />
              <TableMobileCell value={props.work_place} />
            </tr>

            {/* <tr className="even:bg-gray-100">
              <TableMobileHeader value="FromPlace" />
              <TableMobileCell value={props.from_place} />
            </tr> */}
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Mobile" />
              <TableMobileCell value={props.mobile_no} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Photo" />
              <td className="px-3 py-3 md:py-4 whitespace-normal">
                <img src={props.image} alt="Person Image" />
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
  aadhar: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  worksIn: PropTypes.string.isRequired,
  // comesFrom:PropTypes.string.isRequired,
  mobileNo: PropTypes.string.isRequired,
};

export default SocietyStaffMobileTable;
