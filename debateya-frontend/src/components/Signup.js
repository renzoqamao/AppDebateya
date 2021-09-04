import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";
import { useEffect } from "react";
import { urls } from "../helpers/config";
let initialForm = {
  email: "",
  password: "",
  name: "",
  lastname: "",
  dni: "",
  age: "",
  gender: "",
  auth: false,
};

const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  if (!form.name.trim()) {
    errors.name = "El campo 'Nombre' es requerido";
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "El campo 'Nombre' sólo acepta letras y espacios en blanco.";
  }
  if (!form.lastname.trim()) {
    errors.lastname = "El campo 'Last name' es requerido";
  } else if (!regexName.test(form.lastname.trim())) {
    errors.lastname =
      "El campo 'Last name' sólo acepta letras y espacios en blanco.";
  }
  if (!form.email.trim()) {
    errors.name = "El campo 'Email' es requerido";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El campo 'Email' es incorrecto.";
  }
  return errors;
};
let styles = {
  fontWeight: "bold",
  color: "#dc3545",
};

const Signup = () => {
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationsForm, urls.url_signup);
  const [send, setSend] = useState(false);
  let history = useHistory();
  const handleChecked = (e) => {
    if (e.target.checked) {
      setSend(true);
    } else {
      setSend(false);
    }
  };
  useEffect(() => {
    if (response) {
      console.log(response);
      const ret = () => {
        history.push("/signin");
      };
      ret();
    }
  }, [response, history]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Email : </label>
        <input
          type="text"
          name="email"
          placeholder="input your email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="username"
          required
        ></input>
        {errors.email && <p style={styles}>{errors.email}</p>}
        <label>Password : </label>
        <input
          type="password"
          name="password"
          placeholder="input your password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
        ></input>
        <label> Name: </label>
        <input
          type="text"
          name="name"
          placeholder="input your name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        ></input>
        {errors.name && <p style={styles}>{errors.name}</p>}
        <label>Lastname:</label>
        <input
          type="text"
          name="lastname"
          placeholder="input your lastname"
          value={form.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        ></input>
        <label>DNI :</label>
        <input
          type="text"
          name="dni"
          placeholder="input your dni"
          numeric="true"
          maxLength={8}
          value={form.dni}
          onChange={handleChange}
        ></input>
        <label id="age"> Age : </label>
        <input
          type="text"
          name="age"
          numeric="true"
          maxLength={2}
          value={form.age}
          onChange={handleChange}
        ></input>
        <label id="gender">Gender</label>
        <select name="gender" onChange={handleChange} defaultValue="">
          <option value="">- - -</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <br />
        <label htmlFor="terminos">Acepto términos y condiciones</label>
        <input
          type="checkbox"
          id="terminos"
          name="terminos"
          onChange={handleChecked}
        />
        <br />
        <input type="submit" value="sign in" disabled={!send}></input>
      </form>
      {loading && <Loader />}
    </div>
  );
};

export default Signup;
