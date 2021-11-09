import React, { useState, useEffect } from "react";
import PersonalStaffMobileTable from "./PersonalStaffMobileTable";
import TableCell from "./TableCell";
import TableHeader from "./TableHeader";


function PersonalStaff() {
  const [personalStaff, setpersonalStaff] = useState([])
  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/staff/personal_staff/";
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            "authorization": "Token da23af938d92b82b766f2085b57ae037c4b29851"
          }
        });
        const array = await response.json()
        setpersonalStaff(array.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="flex-col hidden sm:flex">
        <div className="overflow-x-auto py-5">
          <div className="text-center dark:text-white uppercase tracking-wider font-semibold text-3xl">
            Personal Staff
          </div>
          <div
            className="
              py-3
              align-middle
              inline-block
              min-w-full
              px-5
              sm:px-16
              md:px-20
              lg:px-44
              xl:px-64
              md:py-5
            "
          >
            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white ">
                  <tr>
                    <TableHeader title="Name" />
                    <TableHeader title="Occupation" />
                    <TableHeader title="Photo" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {personalStaff && personalStaff.map((element) => {
                    let src=element.image
                    return (
                      <tr
                        key={element.occupation}
                        className="divide-x-2 divide-gray-200 even:bg-gray-100"
                      >
                        <TableCell value={element.name} />
                        <TableCell value={element.occupation} />
                        <td className="px-3 py-3 md:py-4 whitespace-normal">
                          <img src={src} alt="Person Image" height='200' width='200' />
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col flex sm:hidden">
        <div className="overflow-x-auto py-5">
          <div className="text-center uppercase font-semibold text-xl dark:text-white">Personal Staff</div>
          {personalStaff && personalStaff.map((element) => {
            return (
              <div key={element.occupation}>
                <PersonalStaffMobileTable
                  name={element.name}
                  occupation={element.occupation}
                  image={element.image}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PersonalStaff;
