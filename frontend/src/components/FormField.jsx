import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { expenseSchema } from "./Schema";
import { useApp } from "../context/Context";
const FormField = () => {
  const { sendExpense } = useApp();
  return (
    <div className="py-4">
      <h2 className="text-center text-2xl text-violet-700 font-semibold mb-2">
        Add New Expenses
      </h2>
      <Formik
        initialValues={{
          title: "",
          price: 0,
          date: new Date().toISOString().split("T")[0],
          category: "",
        }}
        validationSchema={expenseSchema}
        onSubmit={(values, actions) => {
          sendExpense(values, actions);
        }}
      >
        {(props) => (
          <Form className="flex flex-col gap-2">
            <label htmlFor="title">Title</label>
            <Field
              className="border border-gray-400 p-2 rounded-lg"
              type="text"
              id="title"
              name="title"
              placeholder="What did you spend on?"
            />
            <ErrorMessage
              component="p"
              className="text-sm text-red-800"
              name="title"
            />
            <label htmlFor="price">Amount (₹)</label>
            <Field
              className="border border-gray-400 p-2 rounded-lg"
              type="number"
              id="price"
              name="price"
              placeholder="price"
            />
            <ErrorMessage
              component="p"
              className="text-sm text-red-800"
              name="price"
            />
            <label htmlFor="category">Category</label>
            <Field
              id="category"
              name="category"
              as="select"
              className="border border-gray-400 p-2 rounded-lg"
            >
              <option hidden disabled value="">
                Select Any
              </option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Rent">Rent</option>
              <option value="Utilities">Utilities</option>
              <option value="Insurance">Insurance</option>
              <option value="Miscellaneous">Miscellaneous</option>
              <option value="Travel">Travel</option>
              <option value="Others">Others</option>
            </Field>
            <ErrorMessage
              component="p"
              className="text-sm text-red-800"
              name="category"
            />
            <label htmlFor="date">Date</label>

            <Field
              className="border border-gray-400 p-2 rounded-lg"
              type="date"
              id="date"
              name="date"
              placeholder="date"
            />
            <ErrorMessage
              component="p"
              className="text-sm text-red-800"
              name="date"
            />
            <button
              disabled={props.isSubmitting}
              className="w-full disabled:cursor-no-drop mt-2 hover:brightness-170 cursor-pointer transition duration-200 bg-violet-900 text-white p-2 rounded-lg "
              type="submit"
            >
              Add Expense
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormField;
