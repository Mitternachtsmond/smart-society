import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Poll from "../components/Poll";
import Contents from "../components/Contents";
import SearchBar from "../components/SearchBar";

function Polls() {
    const [polls, setPolls] = useState([]);
    const url = "http://127.0.0.1:8000/api/polls";

    const fetchData = async (url) => {
      try {
        const response = await fetch(url, {
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const array = await response.json();
        setPolls(array.results);
        console.log(array);
      } catch (err) {
        console.log(err);
      }
    };

    async function endPoll(id){
      await fetch(`${url}/${id}`, {
        method : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Token ${localStorage.getItem("token")}`,
        },
      });
      await fetchData();
    }

    useEffect(() => {
      fetchData(url);
    },[]);
  
    // <div className="h-screen flex">
    async function onSearch(search){
      console.log('hiiii')
      await fetchData(`${url}/?search=${search}`);
    }

    return (
    <div className="h-screen flex">
      <div className="bg-green-300 dark:bg-gray-800 w-64 hidden md:flex">
        <Contents />
      </div>
      <div
        className="
        pt-4
        px-5
        sm:px-10
        md:px-20
        bg-green-200
        lg:w-full
        mx-auto
        dark:bg-gray-800
      "
      >
        <SearchBar search={onSearch}/>
        {/* <h1 className="text-xl uppercase md:text-4xl font-bold text-center md:p-5 dark:text-white"> */}
        <Link to={'/polls/create'} className="
              py-2
              px-2
              font-medium
              text-white
              dark:text-gray-900
              bg-blue-500
              rounded
              hover:bg-blue-400
              transition
              duration-300
              ">
        Create Poll
        </Link>
        {console.log(polls)}
        {polls && polls.map((element) => {
          return (
            <Poll
              key={element.s_no}
              id={element.s_no}
              title={element.title}
              question={element.question}
              handler={endPoll}
            />
          );
        })}
      </div>
    </div>
    );
}
  
export default Polls;
  