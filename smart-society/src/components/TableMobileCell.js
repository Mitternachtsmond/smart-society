import PropTypes from "prop-types";

function TableMobileCell(props) {
  return (
    <td className="whitespace-normal py-2">
      <div className="font-medium text-gray-900 text-right px-4 tracking-wide">{props.value}</div>
    </td>
  );
}

TableMobileCell.propTypes = {
  value: PropTypes.string.isRequired,
};

export default TableMobileCell;
