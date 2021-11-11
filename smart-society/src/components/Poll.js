import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Poll(props) {
  let bgColor = "bg-blue-50",
  divideColor = "divide-blue-600";

  let text = props.question.split("\n").map((i, index) => {
    return <p key={index}>{i}</p>;
  });
  return (
  <div className={` ${bgColor} p-6 rounded-lg shadow-md divide-y-2 ${divideColor} divide-solid my-5 md:my-10 `}>
    <div className="flex justify-between font-semibold text-gray-800">
      <h2 className="md:text-2xl mb-2">{props.title}</h2>
      <div>
        <Link to={`/polls/vote/${props.id}`} className="
          py-2
          px-2
          mr-8
          font-medium
          text-white
          dark:text-gray-900
          bg-blue-500
          rounded
          hover:bg-blue-400
          transition
          duration-300
          ">
          Vote
        </Link>
        <button className="
          py-1  
          px-2
          font-medium
          text-white
          dark:text-gray-900
          bg-blue-500
          rounded
          hover:bg-blue-400
          transition
          duration-300
          "
          onClick={()=>props.handler(props.id)}
          >
        End Poll
        </button>
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
  handler: PropTypes.func.isRequired
};

export default Poll;