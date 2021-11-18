import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function TableCell({ value, link }) {
  return (
    <td className="px-3 py-3 md:py-4 whitespace-normal">
      {link ? (
        <Link to={link}>
          <div className="text-base font-bold hover:text-blue-400 hover:underline text-blue-600 tracking-wide text-center">
            {value}
          </div>
        </Link>
      ) : (
        <div className="text-base font-medium text-gray-900 tracking-wide text-center">
          {value}
        </div>
      )}
    </td>
  );
}

TableCell.propTypes = {
  value: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default TableCell;
