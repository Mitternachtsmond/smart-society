import Announcement from "./Announcement";
import { useState, useEffect } from "react";

function Dashboard() {
  const [announcement, setAnnouncement] = useState([]);

  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/society_info/announcements/";
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            authorization: "Token 62466cb3721792673088f4ac75187f89e31e1686",
          },
        });
        const array = await response.json();
        setAnnouncement(array.results);
        console.log(array);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div
        className="
        pb-10
        pt-4
        px-5
        sm:px-10
        md:px-20
        bg-green-100
        lg:px-40
        dark:bg-gray-800
      "
      >
        <h1 className="text-xl uppercase md:text-4xl font-bold text-center md:p-5 dark:text-white">
          Announcements
        </h1>
        {announcement &&
          announcement.map((element) => {
            return (
              <Announcement
                key={element.s_no}
                category={element.category}
                description={element.description}
                date={new Date(element.date).toLocaleString("en-in")}
                author={element.author}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Dashboard;