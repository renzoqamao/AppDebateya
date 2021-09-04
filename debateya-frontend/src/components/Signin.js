import { useForm } from "../hooks/useForm";
import Loader from "./Loader";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { urls } from "../helpers/config";
let initialform = {
  email: "",
  password: "",
};
let styles = {
  fontWeight: "bold",
  color: "#dc3545",
};
const validationsForm = (form) => {
  let errors = {};
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

  if (!form.email.trim()) {
    errors.name = "El campo 'Email' es requerido";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El campo 'Email' es incorrecto.";
  }
  return errors;
};

const Signin = ({ authentication, ...props }) => {
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialform, validationsForm, urls.url_signin);
  let history = useHistory();

  useEffect(() => {
    if (response) {
      console.log(response);
      if (!response.message) {
        localStorage.setItem("user", JSON.stringify(response));
        authentication(true);
        const ret = () => {
          history.push("/mainpage");
        };
        ret();
      }
    }
  }, [response, history, authentication]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Email </label>
        <input
          type="text"
          name="email"
          placeholder="input your email"
          value={form.email}
          onBlur={handleBlur}
          onChange={handleChange}
          autoComplete="username"
        ></input>
        {errors.email && <p style={styles}>{errors.email}</p>}
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="input your password"
          value={form.password}
          onBlur={handleBlur}
          onChange={handleChange}
          autoComplete="current-password"
        ></input>

        <input type="submit" value="sign in"></input>
      </form>
      {loading && <Loader />}
    </div>
  );
};

export default Signin;
