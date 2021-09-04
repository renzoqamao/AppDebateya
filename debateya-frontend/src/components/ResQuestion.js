import React, { useState } from "react";
import { useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./Loader";
import { urls } from "../helpers/config";
const ResQuestion = () => {
  let question = JSON.parse(localStorage.getItem("question")) || {};
  let user = JSON.parse(localStorage.getItem("user")) || {};

  const [form, setForm] = useState({
    voter: user._id,
    nchanges: question.nchanges,
  });
  const [send, setSend] = useState(false);
  const [loading, setLoading] = useState(false);
  let api = helpHttp();
  /* Url to get the number of changes of voter  */
  let urlchanges = `${urls.url_get_number_changes_voter}/${question._id}/${user._id}`;

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(urlchanges, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user")).token,
        },
      })
      .then((res) => {
        if (!res.err) {
          setForm((form) => ({ ...form, nchanges: res.nchanges }));
          if (parseInt(res.nchanges) !== 0) {
            setSend(true);
          }
        }
      });
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  /*send a voter*/
  const updateData = (data) => {
    /* Url to update question (send a voter)*/
    let endpoint = `${urls.url_send_voter}/${question._id}`;
    let options = {
      body: data,
      headers: {
        "content-type": "application/json",
        "x-access-token": JSON.parse(localStorage.getItem("user")).token,
      },
    };
    api.put(endpoint, options).then((res) => {
      if (!res.err) {
        console.log(res);
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let completeform = { ...form, nchanges: parseInt(form.nchanges) - 1 };
    console.log(completeform);
    e.preventDefault();
    // actualizar la pregunta con una lista de diccionario de votantes
    updateData(completeform);
    setForm({
      ...form,
      option: "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2> {question.title} </h2>
      <p>{question.description}</p>
      <label id="options">
        {loading && <Loader />} Options, you only have {form.nchanges} left.
      </label>
      <select name="option" onChange={handleChange} defaultValue="">
        <option value="">- - -</option>
        {question.options ? (
          question.options.map((el, index) => <option key={index}>{el}</option>)
        ) : (
          <>
            <option value="yes">yes</option>
            <option value="no">no</option>
          </>
        )}
      </select>
      <input type="submit" value=" send your answer" disabled={!send}></input>
    </form>
  );
};

export default ResQuestion;
