import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NavbarMobileLink({slug, title}) {
  return (
    <div>
      <Link
        to={`/${slug}`}
        className={`
            font-bold
            block
            px-4
            py-2
            bg-green-300
            dark:bg-gray-800
            text-md text-black
            dark:text-white
            hover:bg-green-400 hover:text-white
            `}
      >
        {title}
      </Link>
    </div>
  );
}

NavbarMobileLink.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default NavbarMobileLink;
