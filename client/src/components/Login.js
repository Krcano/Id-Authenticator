import React, { useState } from "react";
import ParticlesBackground from "./Particles";
<<<<<<< HEAD
import auth from "../utils/auth";
=======
import Auth from "../utils/auth";
>>>>>>> 9f1af927364d53c2ebe89a036915aafe5367d88a
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../utils/mutations";
// download
import { useMutation } from "@apollo/client";

const Login = () => {
  const [FormData, setUserFormData] = useState({ email: "", password: "" });
  // will need to bring in login mutation and name it LOGIN_USER
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  //   Input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...FormData, [name]: value });
  };

  //   Form Submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await loginUser({
        variables: { email: FormData.email, password: FormData.password },
      });
      const token = mutationResponse.data.login.token;
      auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div id="login" className="background">
      <ParticlesBackground />
      <h1 className="h1">Login</h1>
      <Link className="link" to="/signUp">
        {" "}
        <h2 className="linkText">← Go to Signup</h2>
      </Link>

      {/* referenced redux store hw */}

      <form className="form" onSubmit={handleFormSubmit}>
        <div className="emailContainer">
          <label className="label" htmlFor="email">
            Email address:
          </label>
          <input
            className="input"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label" htmlFor="pwd">
            Password:
          </label>
          <input
            className="input"
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleInputChange}
          />
        </div>
        {error ? (
          <div>
            <p className="errorText">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="buttonContainer">
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
