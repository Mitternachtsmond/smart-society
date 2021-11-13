import React, { useEffect, useState } from "react"
import GateLogForm from "./GateLogForm"
import ExitCard from "./ExitCard"

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
        setLogs(array.results);
        console.log(array);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(()=>{
          fetchData();
    },[])
    console.log(logs)

    const notExited = []
    logs.forEach((log)=>{
        if(!log.exited)
        notExited.push(log)
    })
    console.log(notExited)

    return(
        <div>
            <GateLogForm refresh={fetchData}/>
            <div className = "flex">
                {notExited.map((log) => <ExitCard data={log}/>)}
            </div>
        </div>   
    )
}

export default GateLogs