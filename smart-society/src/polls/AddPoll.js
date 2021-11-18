import { Formik, Field, Form, FieldArray } from "formik";
import Contents from "../navigation/Contents";
import { useNavigate } from "react-router";

function AddPoll() {
  let navigate = useNavigate();

  return (
    <div className="h-screen flex">
      <div className="bg-white dark:bg-gray-800 w-48 hidden md:flex">
        <Contents />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll">
          <div className="md:py-5 flex-grow py-3 text-center dark:text-white uppercase tracking-wider font-semibold text-xl md:text-3xl">
            Add Poll
          </div>
          <div className="mx-3 lg:mx-10 border rounded bg-black flex items-center justify-center">
            <div className="bg-white w-full rounded shadow-lg pt-8 pb-4 px-6 md:p-8">
              <div className="grid gap-4 gap-y-2 grid-cols-1 lg:grid-cols-2">
                <div className="lg:col-span-2">
                  <Formik
                    initialValues={{
                      title: "",
                      description: "",
                      options: [""],
                    }}
                    onSubmit={async (values, { resetForm }) => {
                      const response = await fetch(
                        `http://127.0.0.1:8000/api/polls/`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            authorization: `Token ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                          body: JSON.stringify({
                            options: [...new Set(values.options)].join(";"),
                            question: values.description,
                            title: values.title,
                          }),
                        }
                      );

                      if (response.ok) {
                        navigate("/polls");
                      }
                      resetForm();
                    }}
                  >
                    {({ values }) => (
                      <Form>
                        <div className="grid gap-4 gap-y-4 grid-cols-1 md:grid-cols-2">
                          <div className="md:col-span-1">
                            <label htmlFor="title">Title*</label>
                            <Field
                              name="title"
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 mb-4"
                              placeholder="Enter Title"
                              required
                            />

                            <label htmlFor="description">Description*</label>
                            <Field
                              name="description"
                              placeholder="Enter Description"
                              component="textarea"
                              className="bg-gray-50 mt-1 w-full border rounded form-textarea px-4 py-2"
                              rows="9"
                              required
                            />
                          </div>

                          <FieldArray name="options">
                            {({ insert, remove, push }) => (
                              <div>
                                {values.options.length > 0 &&
                                  values.options.map((friend, index) => (
                                    <div className="row" key={index}>
                                      <div className="md:col-span-1">
                                        <label htmlFor={`options.${index}`}>
                                          Option {index + 1}*
                                        </label>
                                        <Field
                                          name={`options.${index}`}
                                          type="text"
                                          placeholder="Enter Option"
                                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                          required
                                        />
                                      </div>
                                      <div className="md:col-span-2 text-right md:row-start-5">
                                        <div className="flex inline-flex justify-between">
                                          <button
                                            type="button"
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold my-3 py-2 px-4 rounded"
                                            onClick={() =>
                                              values.options.length > 1 &&
                                              remove(index)
                                            }
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                <div className="md:col-span-2 text-right md:row-start-5">
                                  <div className="flex inline-flex items-end">
                                    <button
                                      type="button"
                                      className="bg-green-400 hover:bg-green-600 text-white font-bold my-3 py-2 px-4 rounded"
                                      onClick={() => push("")}
                                    >
                                      Add Option
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </FieldArray>
                          <div className="md:col-span-2 text-right md:row-start-5">
                            <div className="inline-flex items-end">
                              <button
                                type="submit"
                                className="bg-green-400 hover:bg-green-600 text-white font-bold my-3 py-2 px-4 rounded"
                              >
                                Create
                              </button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPoll;
