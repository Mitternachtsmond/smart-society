import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function TableMobileCell({ value, link }) {
  return (
    <td className="whitespace-normal py-2">
      {link ? (
        <Link to={link}>
          <div className="font-bold text-blue-600 hover:text-blue-400 hover:underline text-right px-4 tracking-wide">
            {value}
          </div>
        </Link>
      ) : (
        <div className="font-medium text-gray-900 text-right px-4 tracking-wide">
          {value}
        </div>
      )}
    </td>
  );
}

TableMobileCell.propTypes = {
  value: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default TableMobileCell;
