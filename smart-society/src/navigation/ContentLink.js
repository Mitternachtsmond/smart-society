import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NavbarMobileLink({ slug, title }) {
  return (
    <div>
      <Link
        to={`/${slug}`}
        className={`
            font-bold
            block
            px-6
            py-2
            bg-white
            dark:bg-gray-800
            text-md text-gray-600
            dark:text-white
            hover:text-green-500
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
