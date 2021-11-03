import PropTypes from "prop-types";

function Announcement(props) {
  let bgColor, divideColor, authorName;
  if (props.category === "Notification") {
    bgColor = "bg-yellow-50";
    divideColor = "divide-yellow-600";
    authorName = props.author;
  } else if (props.category === "Voting Result") {
    bgColor = "bg-blue-50";
    divideColor = "divide-blue-600";
    authorName = "Election Committee";
  } else if (props.category === "Complaint") {
    bgColor = "bg-red-100";
    divideColor = "divide-red-600";
    authorName = props.author;
  }

  let text = props.description.split("\n").map((i, index) => {
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
          <h2 className="md:text-2xl mb-2">{props.category}</h2>
          <h3 className="md:text-xl">{props.date}</h3>
        </div>
        <div>
          <div className="text-gray-700 py-3">{text}</div>
          <p className="py-2">By: {authorName}</p>
        </div>
      </div>
    </div>
  );
}
Announcement.propTypes = {
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string,
};
Announcement.defaultProps = {
  author: "Anonymous",
};
export default Announcement;
