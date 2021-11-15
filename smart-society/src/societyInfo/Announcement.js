import PropTypes from "prop-types";

function Announcement({ category, date, description, author }) {
  let bgColor, divideColor;

  switch (category) {
    case "Notification":
      bgColor = "bg-yellow-50";
      divideColor = "divide-yellow-500";
      break;
    case "Voting Result":
      bgColor = "bg-blue-50";
      divideColor = "divide-blue-600";
      break;
    case "Complaint":
      bgColor = "bg-red-50";
      divideColor = "divide-red-500";
      break;
    default:
      bgColor = "bg-yellow-50";
      divideColor = "divide-yellow-600";
  }
  let text = description.split("\n").map((i, index) => {
    return <p key={index}>{i}</p>;
  });
  return (
    <div>
      <div
        className={`
        ${bgColor}
        p-6
        rounded-lg
        shadow-md
        divide-y-2 ${divideColor} divide-solid
        my-5
        md:my-10
        `}
      >
        <div className="flex justify-between font-semibold text-gray-800">
          <h2 className="md:text-2xl mb-2">{category}</h2>
          <h3 className="md:text-xl">{date}</h3>
        </div>
        <div>
          <div className="text-gray-700 py-3">{text}</div>
          <p className="py-2">
            <em>- {author}</em>
          </p>
        </div>
      </div>
    </div>
  );
}
Announcement.propTypes = {
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Announcement;
