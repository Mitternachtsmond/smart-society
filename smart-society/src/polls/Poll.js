import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Poll(props) {
  let bgColor = "bg-blue-50",
    divideColor = "divide-blue-600";

  let text = props.question.split("\n").map((i, index) => {
    return <p key={index}>{i}</p>;
  });
  return (
    <div
      className={` ${bgColor} p-6 rounded-lg shadow-md divide-y-2 ${divideColor} divide-solid my-5 md:my-10 `}
    >
      <div className="flex justify-between font-semibold text-gray-800">
        <h2 className="md:text-2xl mb-2">{props.title}</h2>
        <div className="md:col-span-2 text-right md:row-start-5">
          <div className="flex flex-row justify-between">
            <button
              className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 mb-3 rounded float-right mr-10"
              onClick={() => props.handler(props.id)}
            >
              End Poll
            </button>
            <Link to={`/polls/vote/${props.id}`}>
              <button className="bg-green-400 hover:bg-green-600 text-white font-bold mb-3 py-2 px-4 rounded float-right">
                Vote
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="text-gray-700 py-3">{text}</div>
      </div>
    </div>
  );
}

Poll.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};

export default Poll;
