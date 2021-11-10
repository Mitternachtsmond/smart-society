import PropTypes from "prop-types";

function TableHeader(props) {
  return (
    <th
      scope="col"
      className="
        px-3
        py-3
        text-sm
        font-medium
        text-gray-600
        uppercase
        tracking-wider
        text-center
        "
    >
      {props.title}
    </th>
  );
}

TableHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
export default TableHeader;
