import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NavbarMobileLink(props) {
  let bgColor, darkBgColor, textColor;
  if (props.activeState) {
    bgColor = "bg-green-500";
    darkBgColor = "bg-green-500";
    textColor = "text-white";
  } else {
    bgColor = "bg-white";
    darkBgColor = "bg-gray-900";
    textColor = "text-gray-700";
  }
  return (
    <div>
      <Link
        to={`/${props.slug}`}
        className={`
            block
            px-4
            py-2
            ${bgColor}
            dark:${darkBgColor}
            text-sm ${textColor}
            dark:text-white
            hover:bg-green-500 hover:text-white
            `}
      >
        {props.title}
      </Link>
    </div>
  );
}

NavbarMobileLink.propTypes = {
  activeState: PropTypes.bool,
  title: PropTypes.string,
  slug: PropTypes.string,
};

NavbarMobileLink.defaultProps = {
  title: "Home",
  slug: "",
  activeState: false,
};
export default NavbarMobileLink;
