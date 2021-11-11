import { useState, useEffect } from "react";
import { useParams }from "react-router-dom";
import { useNavigate } from "react-router";
import { Formik, Field, Form } from 'formik';

function Vote(){
  let bgColor = "bg-blue-50", divideColor = "divide-blue-600";
  let navigate = useNavigate();
  const {id} = useParams();

  const [msg, setMsg] = useState("");
  const [poll, setPoll] = useState({
    title:"Loading...",
    question:"loading",
    options:"loading..."});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/polls/${id}`, {
          headers: {
            authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        const obj = await response.json();
        setPoll(obj);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  },[id]);

  console.log(poll)
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-md divide-y-2 ${divideColor} divide-solid my-5 md:my-10 `}>
      <div className="flex justify-between font-semibold text-gray-800">
        <h2 className="md:text-2xl mb-2">{poll.title}</h2>
      </div>
      <div className="text-gray-700 py-3">
        { poll.question.split('\n') &&  poll.question.split("\n").map((i, index) => {
          return <p key={index}>{i}</p>;
        })}
      </div>
      <Formik
        initialValues={{
          decision: '',
        }}
        onSubmit={async (values, { resetForm }) => {
          if(!window.confirm("Are you sure ?\nYou have selected : \""+values.decision+"\"")) return;
          const response = await fetch(`http://127.0.0.1:8000/api/polls/vote/${id}`, {
              method : 'POST',
              headers: {
                'Content-Type': 'application/json',
                authorization: `Token ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({decision:values.decision})  
          });
          const obj = await response.json();
          console.log(response.ok)
          if(response.ok){
            alert(obj.status);
            navigate("/polls");
          }
          else{
            setMsg(obj.status)
            resetForm();
          }
        }}
      >
        {({ values }) => (
          <Form>
            { poll.options.split(';').map((option,index)=>{
              return (
              <div key={index}>
                <label>
                  <Field type="radio" name="decision" value={option} required/>
                  {option}
                </label>
                <br/>
              </div>
              )})
            }
            <div>Picked: {values.decision}</div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      <div className="text-center text-black dark:text-white">{msg}</div>
    </div>
      
  );
}

// Vote.propTypes = {
// };

export default Vote;