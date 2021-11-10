import PropTypes from "prop-types";

function TableMobileHeader(props) {
  return (
    <td className="px-4 whitespace-normal py-2">
      <div className="tracking-wider uppercase text-gray-900">
        {props.value}
      </div>
    </td>
  );
}
TableMobileHeader.propTypes = {
  value: PropTypes.string.isRequired,
};
export default TableMobileHeader;
