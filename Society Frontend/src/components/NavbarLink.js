import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NavbarLink(props) {
  let borderColor, darkBorderColor, textColor, darkTextColor, dropdown;
  if (props.activeState) {
    borderColor = "border-green-500";
    darkBorderColor = "border-green-500";
    textColor = "text-green-500";
  } else {
    borderColor = "border-white";
    darkBorderColor = "border-gray-900";
    textColor = "text-gray-500";
    darkTextColor = "text-white";
  }
  if (props.title === "Others") {
    dropdown = "inline-block";
  } else {
    dropdown = "hidden";
  }
  return (
    <div>
      <Link
        to={props.slug === "others" ? "#" : `/${props.slug}`}
        className={`
          py-4
          px-2
          ${textColor}
          dark:${darkTextColor}
          font-semibold
          border-b-4 
          ${borderColor}
          dark:${darkBorderColor}
          hover:text-green-500
          transition
          duration-300
          `}
      >
        {props.title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={` h-5 w-5 ${dropdown} `}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  );
}

NavbarLink.propTypes = {
  activeState: PropTypes.bool,
  title: PropTypes.string,
  slug: PropTypes.string,
};

NavbarLink.defaultProps = {
  title: "Home",
  slug: "",
  activeState: false,
};
export default NavbarLink;
