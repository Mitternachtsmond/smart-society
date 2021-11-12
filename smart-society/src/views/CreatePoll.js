import { useState } from "react";
import { Formik, Field, Form, FieldArray } from 'formik';

function CreatePoll(){
  const [msg, setMsg] = useState("");

  return (
  <div className="h-full flex">
    <h1>Create a Poll</h1>
    <Formik
      initialValues={{ title:'',description:'',options: [''] }}
      onSubmit={async (values, { resetForm }) => {
        const response = await fetch(`http://127.0.0.1:8000/api/polls/`, {
          method : 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            options:[...new Set(values.options)].join(';'),
            question:values.description,
            title:values.title 
          })  
        });
        
        if(response.ok){
          setMsg('New Poll created')
        }
        resetForm();
        console.log(values);
      }}
    >
      {({ values }) => (
        <Form>
          <label htmlFor="title">Title</label>
          <Field name="title" placeholder="Title" />

          <label htmlFor="description">Description</label>
          <Field name="description" placeholder="Description" component="textarea"
            className="w-full px-4 py-2 border rounded"
            rows={12}/>

          <FieldArray name="options">
            {({ insert, remove, push }) => (
              <div>
                {values.options.length > 0 && values.options.map((friend, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`options.${index}`}>Name</label>
                        <Field name={`options.${index}`} type="text" required />
                      </div>
                      <div className="col">
                        <button type="button" className="secondary" onClick={() => values.options.length>1 && remove(index)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                <button type="button" className="secondary" onClick={() => push('')} >
                  Add Option
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Post</button>
        </Form>
      )}
    </Formik>
    <div className="text-center text-black dark:text-white">{msg}</div>
  </div>
)}

export default CreatePoll;
