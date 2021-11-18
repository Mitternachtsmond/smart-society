import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NavbarMobileLink({slug, title, activeState}) {
  let bgColor, darkBgColor, textColor;
  if (activeState) {
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
        to={`/${slug}`}
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
        {title}
      </Link>
    </div>
  );
}

NavbarMobileLink.propTypes = {
  activeState: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default NavbarMobileLink;
