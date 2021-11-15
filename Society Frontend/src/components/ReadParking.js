import React, { useState, useEffect } from "react"
import TableHeader from "./TableHeader" 
import TableCell from "./TableCell"



function ReadParking(){
    const [ data , setData] = useState([])
    const url = "http://127.0.0.1:8000/api/parking_lot/parking"
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            authorization: "Token 62466cb3721792673088f4ac75187f89e31e1686",
          },
        });
        const array = await response.json();
        setData(array.results);
        console.log(array.results);
      } catch (err) {
        console.log(err);
      }
    }
    useEffect(()=>{
        fetchData()
        console.log(data)
    },)
    return(
      <div className="flex-col hidden sm:flex">
        <div className="overflow-x-auto py-5">
          <div className="text-center dark:text-white uppercase tracking-wider font-semibold text-3xl">
            Gate Logs
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
                    <TableHeader title="Parking Id" />
                    <TableHeader title="Propery Number" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((element) => {
                    return (
                      <tr
                        key={element.s_no}
                        className="divide-x-2 divide-gray-200 even:bg-gray-100"
                      >
                        
                        <TableCell value={element.parking_id} />
                        <TableCell value={(element.property_no)? element.property_no :'Visitor'} />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ReadParking