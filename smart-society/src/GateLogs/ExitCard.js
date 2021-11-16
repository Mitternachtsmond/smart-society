import React from "react"
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

function ExitCard(props){
    let updates = {
        "s_no": props.data.s_no,
        "name": props.data.name,
        "exited": true,
        "property_no": props.data.property_no
    }
    console.log(updates)
    function handleSubmit(){
        fetch(`http://localhost:8000/api/parking_lot/gate_log/${updates.s_no}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: "Token 4a53eb401935147fcfebbeaafcdd3304a36a3016",
        },
        body: JSON.stringify(updates),
        });
        props.clickhandler()
    }

    return(
    <div class="w-full lg:w-1/2 p-3">
    <div class="flex flex-col lg:flex-row rounded  h-auto lg:h-35 border">
      <div class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      <div class="text-black text-xl mb-2 leading-tight"> Name : {props.data.name}</div> 
      <div class="text-black text-xl mb-2 leading-tight"> Property Number : {props.data.property_no} </div>
      <div class="text-black text-xl mb-2 leading-tight"> Parking Id : {props.data.parking_id}</div>
      <button onClick={handleSubmit} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Exit
      </button>
      </div>
    </div>
  </div>
    )
}

export default ExitCard