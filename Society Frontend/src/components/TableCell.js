import PropTypes from "prop-types";

function TableCell(props) {
  return (
    <td className="px-3 py-3 md:py-4 whitespace-normal">
      <div className="text-base font-medium text-gray-900 tracking-wide text-center">
        {props.value}
      </div>
    </td>
  );
}

TableCell.propTypes = {
  value: PropTypes.string.isRequired,
};

export default TableCell;
