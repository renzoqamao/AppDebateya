import { useState } from "react";

import { helpHttp } from "../helpers/helpHttp";
export const useForm = (initialForm, validateForm, url, token) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    /* const value = name === "option" ? e.target.checked : e.target.value; */
    setForm(
      {
        ...form,
        [name]: value,
      },
      console.log(form)
    );
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };
  /* en pruebas */
  const handleTime = (e, init_time) => {
    const expires = new Date(
      init_time.getFullYear(),
      init_time.getMonth(),
      init_time.getDay(),
      e.target.value,
      init_time.getMinutes()
    );
    console.log(e.target.value);
    setForm({ ...form, [e.target.name]: expires });
    console.log(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      helpHttp()
        .post(url, {
          body: form,
          headers: {
            "Content-Type": "Application/json",
            Accept: "application/json",
            "x-access-token": token,
          },
        })
        .then((res) => {
          setLoading(false);
          setResponse(res);
          setForm(initialForm);
          setTimeout(() => setResponse(false), 10000);
        });
    } else {
      return;
    }
  };

  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
    handleTime,
  };
};
