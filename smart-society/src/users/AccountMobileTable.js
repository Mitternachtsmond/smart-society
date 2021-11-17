import TableMobileCell from "../basicComponents/TableMobileCell";
import TableMobileHeader from "../basicComponents/TableMobileHeader";
import PropTypes from "prop-types";

function AccountMobileTable({ username, email, category }) {
  return (
    <div className="py-3 align-middle inline-block min-w-full px-5">
      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <table className="min-w-full">
          <tbody className="bg-white ">
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Username" />
              <TableMobileCell
                value={username}
                link={
                  localStorage.getItem("group") === "1"
                    ? `/accounts/${username}`
                    : 0
                }
              />
            </tr>

            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Email" />
              <TableMobileCell value={email} />
            </tr>
            <tr className="even:bg-gray-100">
              <TableMobileHeader value="Category" />
              <TableMobileCell value={category} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

AccountMobileTable.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
export default AccountMobileTable;
