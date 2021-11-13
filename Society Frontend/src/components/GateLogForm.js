import React, { useEffect, useState } from 'react';
import SelectSearch from 'react-select-search';
import { fuzzySearch } from 'react-select-search';

function GateLogForm({refresh}) {
  const [flats, setFlats] = useState([]);
  let options = [];
  let types = [
    {
      name:"2-wheeler",
      value:"2-wheeler"
    },
    {
      name:"4-wheeler",
      value:"4-wheeler"
    }
  ]
  let choices = {
    name: '',
    property_no: '',
    vehicle_type: '',
    vehicle_number: '',
    exited: false
  };
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/users/members', {
      headers: {
        authorization: 'Token 4a53eb401935147fcfebbeaafcdd3304a36a3016',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFlats(data.results);
        console.log(data.results)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  flats.forEach((element) => {
    options.push({
      name: element.property_no,
      value: element.property_no,
    });
  });

  function handleChange(event){
      choices[event.target.name] = event.target.value
      console.log(choices)
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(choices);
    fetch("http://localhost:8000/api/parking_lot/gate_log/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        authorization: "Token 4a53eb401935147fcfebbeaafcdd3304a36a3016",
    },
    body: JSON.stringify(choices),
    }).then(response => response.json())
    .then(data => alert(data.parking_id))
    .then(refresh())
  }
  return (
    <div>
      <form
        action="http://127.0.0.1:8000/api/parking_lot/gate_log/"
        onSubmit={handleSubmit}
      >
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-state">
          Name:
          </label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />
        <hr />
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-state"
          >
            Vehicle Type
          </label>
          <SelectSearch
            options={types}
            name="vehicle_type"
            placeholder="Choose a Vehicle Type"
            search="true"
            onChange={(value) => {
                choices["vehicle_type"] = value;
              }}
            emptyMessage={() => (
              <div style={{ textAlign: 'center', fontSize: '0.8em' }}>
                Not found
              </div>
            )}
            filterOptions={fuzzySearch}
          />
        <hr />
        <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-state"
          >
            Vehicle Number
          </label>
          <input
            type="text"
            placeholder="Number"
            name="vehicle_number"
            onChange={handleChange}
          />
        <hr />
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-state"
          >
            Property Number
          </label>
          <SelectSearch
            options={options}
            name="property_no"
            placeholder="Choose a property"
            search="true"
            id="property"
            onChange={(value) => {
                choices["property_no"] = value;
              }}
            emptyMessage={() => (
              <div style={{ textAlign: 'center', fontSize: '0.8em' }}>
                Not found
              </div>
            )}
            filterOptions={fuzzySearch}
          />
        <hr />
        <label>
        <input
              type="submit"
              value="submit"
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
            />
        </label>
      </form>
    </div>
  );
}

export default GateLogForm;
