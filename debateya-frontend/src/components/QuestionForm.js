import React from "react";
import { useForm } from "../hooks/useForm";
import Loader from "./Loader";
import { urls } from "../helpers/config";
let styles = {
  fontWeight: "bold",
  color: "#dc3545",
};
let initialForm = {
  user: JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))._id
    : "",
  title: "",
  description: "",
  nchange: "",
  listvoters: [],
  options: ["yes", "no"],
  creation: new Date(),
  expires: new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDay(),
    new Date().getHours() + 4,
    new Date().getMinutes()
  ),
};
const validationsForm = (form) => {
  let errors = {};
  let regexdescription = /^.{1,1000}$/;

  if (!form.description.trim()) {
    errors.description = "El campo 'descripción' es requerido";
  } else if (!regexdescription.test(form.description.trim())) {
    errors.title =
      "El campo 'descripción' no debe exceder los 1000 caracteres.";
  }

  return errors;
};

const QuestionForm = () => {
  const { form, loading, handleChange, handleBlur, handleSubmit, errors } =
    useForm(
      initialForm,
      validationsForm,
      urls.url_create_question,
      JSON.parse(localStorage.getItem("user")).token
    );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title </label>
        <input
          type="text"
          name="title"
          placeholder="input tittle's question"
          value={form.title}
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
        <label> Description </label>
        <textarea
          name="description"
          cols="50"
          rows="5"
          placeholder="Description your question"
          onChange={handleChange}
          value={form.description}
          onBlur={handleBlur}
          required
        ></textarea>
        {errors.description && <p style={styles}>{errors.description}</p>}

        <h5>number of changes</h5>
        <input
          type="text"
          name="nchange"
          placeholder="number of changes"
          value={form.nchange}
          onChange={handleChange}
          numeric="true"
          maxLength={2}
        ></input>
        <hr />

        <input type="submit" value=" make a question"></input>
      </form>
      {loading && <Loader />}
    </div>
  );
};

export default QuestionForm;
