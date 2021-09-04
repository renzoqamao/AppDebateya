import { useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import { urls } from "../helpers/config";
const Profile = () => {
  let api = helpHttp();
  let userstorage = JSON.parse(localStorage.getItem("user")) || {};

  const [user, setUser] = useState(userstorage);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const updateData = (data) => {
    let endpoint = `${urls.url_profile_update}/${data._id}`;
    let options = {
      body: data,
      headers: {
        "content-type": "application/json",
        "x-access-token": JSON.parse(localStorage.getItem("user")).token,
      },
    };
    api.put(endpoint, options).then((res) => {
      console.log("res:", res);
      if (!res.err) {
        let newData = data;
        setUser(newData);
        localStorage.setItem("user", JSON.stringify(newData));
      } else {
        setError(res);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.name || !user.email) {
      alert("Datos incompletos");
      return;
    }
    updateData(user);
  };

  return (
    <div className="card col-md-8">
      <div className="card-body">
        <div className="row">
          <div className="col-md-12">
            <h4>Your Profile</h4>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <label htmlFor="name" className="col-4 col-form-label">
                  First Name
                </label>
                <div className="col-8">
                  <input
                    id="name"
                    name="name"
                    placeholder="First Name"
                    className="form-control here"
                    type="text"
                    value={user.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="lastname" className="col-4 col-form-label">
                  Last Name
                </label>
                <div className="col-8">
                  <input
                    id="lastname"
                    name="lastname"
                    placeholder="Last Name"
                    className="form-control here"
                    type="text"
                    value={user.lastname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="email" className="col-4 col-form-label">
                  Email*
                </label>
                <div className="col-8">
                  <input
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="form-control here"
                    required="required"
                    type="text"
                    value={user.email}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="dni" className="col-4 col-form-label">
                  DNI
                </label>
                <div className="col-8">
                  <input
                    id="dni"
                    name="dni"
                    placeholder="dni"
                    className="form-control here"
                    type="text"
                    maxLength={8}
                    pattern={`[0-9]{8}`}
                    value={user.dni}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="age" className="col-4 col-form-label">
                  Age
                </label>
                <div className="col-8">
                  <input
                    id="age"
                    name="age"
                    placeholder="age"
                    className="form-control here"
                    type="text"
                    maxLength={2}
                    pattern={`[0-9]{2}`}
                    value={user.age}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="gender" className="col-4 col-form-label">
                  gender
                </label>
                <div className="col-8">
                  <select
                    id="gender"
                    name="gender"
                    defaultValue={user.gender}
                    disabled
                  >
                    <option value={user.gender}>{user.gender}</option>
                  </select>
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="password" className="col-4 col-form-label">
                  Password
                </label>
                <div className="col-8">
                  <input
                    id="password"
                    name="password"
                    placeholder=" Password to confirm your changes."
                    className="form-control here"
                    type="password"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="offset-4 col-8">
                  <button
                    name="submit"
                    type="submit"
                    className="btn btn-primary"
                  >
                    Update My Profile
                  </button>
                  {error !== null ? <p>{error.message}</p> : <p></p>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
