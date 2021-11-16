import React, { useState, useEffect } from 'react';
import TableCell from '../basicComponents/TableCell';
import TableHeader from '../basicComponents/TableHeader';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Contents from '../navigation/Contents';

function ReadParking() {
  const [data, setData] = useState([]);
  let navigate = useNavigate();
  const url = 'http://127.0.0.1:8000/api/parking_lot/parking';
  const fetchData = async () => {
    const response = await fetch(url, {
      headers: {
        authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    const array = await response.json();
    if (response.ok) {
      setData(array.results);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.setItem('isLoggedIn', 'false');
      navigate('/login');
    }
  };
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'false') {
      navigate('/login');
    }
    fetchData();
  }, [navigate]);
  return (
    <div className="h-screen flex">
      <div className="bg-green-300 dark:bg-gray-800 w-64 hidden md:flex">
        <Contents />
      </div>
      <div className="overflow-x-auto py-5">
        <div className="flex px-5">
          <div className="invisible flex-grow-0 px-2 py-1 w-auto border rounded bg-blue-100 text-blue-500">
            + Add Parking
          </div>
          <div className="flex-grow text-center dark:text-white uppercase tracking-wider font-semibold text-3xl">
            Parking
          </div>
          <div className="flex-grow-0 px-2 py-1 w-auto border rounded bg-blue-100 text-blue-500">
            <Link to="/parking/add">+ Add Parking</Link>
          </div>
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
                      <TableCell
                        value={element.parking_id}
                        link={`/parking/change/${element.parking_id}`}
                      />
                      <TableCell
                        value={
                          element.property_no ? element.property_no : 'Visitor'
                        }
                      />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReadParking;
