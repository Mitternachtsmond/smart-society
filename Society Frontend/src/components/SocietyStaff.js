import React, { useState, useEffect } from "react";
import SocietyStaffMobileTable from "./SocietyStaffMobileTable";
import TableCell from "./TableCell";
import TableHeader from "./TableHeader";

function SocietyStaff() {
  const [societyStaff, setsocietyStaff] = useState([]);
  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/staff/society_staff/";
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            authorization: "Token da23af938d92b82b766f2085b57ae037c4b29851",
          },
        });
        const array = await response.json();
        setsocietyStaff(array.results);
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
            Society Staff
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
                    <TableHeader title="Salary" />
                    <TableHeader title="Aadhar Number" />
                    <TableHeader title="Works In" />
                    {/* <TableHeader title="ComesFrom" /> */}
                    <TableHeader title="Mobile No." />
                    <TableHeader title="Photo" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {societyStaff &&
                    societyStaff.map((element) => {
                      let src = element.image;
                      // console.log(src);
                      return (
                        <tr
                          key={element.aadhar}
                          className="divide-x-2 divide-gray-200 even:bg-gray-100"
                        >
                          <TableCell value={element.name} />
                          <TableCell value={element.occupation} />
                          <TableCell value={element.salary.toString()} />
                          <TableCell value={element.aadhaar} />
                          <TableCell value={element.work_place} />
                          {/* <TableCell value={element.from_place} /> */}
                          <TableCell value={element.mobile_no} />
                          <td className="px-3 py-3 md:py-4 whitespace-normal">
                            <img src={src} alt="Personal Image" />
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
          <div className="text-center uppercase font-semibold text-xl dark:text-white">
            Society Staff
          </div>
          {societyStaff &&
            societyStaff.map((element) => {
              return (
                <div key={element.aadhaar}>
                  <SocietyStaffMobileTable
                    name={element.name}
                    occupation={element.occupation}
                    aadhar={element.aadhaar}
                    salary={element.salary.toString()}
                    worksIn={element.work_place}
                    // comesFrom={element.from_place}
                    mobileNo={element.mobile_no}
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

export default SocietyStaff;
