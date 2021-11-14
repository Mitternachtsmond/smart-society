import React, { useEffect, useState } from "react"
import ExitCard from "./ExitCard"
import {Link} from "react-router-dom"

function GateLogs(){
    const [ logs , setLogs] = useState([])
    const url = "http://127.0.0.1:8000/api/parking_lot/gate_log"
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            authorization: "Token 62466cb3721792673088f4ac75187f89e31e1686",
          },
        });
        const array = await response.json();
        const notExited = []
        array.results.forEach((log)=>{
            if(!log.exited)
            notExited.push(log)
        })
        setLogs(notExited);
        console.log(array);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(()=>{
          fetchData();
    },[])
    const UpdateExit = ()=>fetchData()

    return(
        <div>
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/gate_form"
                className="
                mt-4
                py-2
                px-2
                font-medium
                text-white
                dark:text-gray-900
                bg-green-500
                rounded
                hover:bg-green-400
                transition
                duration-300
              "
              >
                Register Entry
              </Link>
            </div>
            <div className = "flex">
                {logs.map((log) => <ExitCard data={log} clickhandler={UpdateExit}/>)}
            </div>
        </div>   
    )
}

export default GateLogs
