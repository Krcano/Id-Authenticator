import React, { useState } from "react";
import ParticlesBackground from "./Particles";
import { Link } from "react-router-dom";
// import Auth from '../utils/auth';
// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';
// download
// import {useMutation} from '@apollo/client'

const SignUp = () => {
  const [FormData, setUserFormData] = useState({ email: "", password: "" });
  // will need to bring in login mutation and name it ADD_USER
  //   const [addUser] = useMutation(ADD_USER);

  //   Input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...FormData, [name]: value });
  };

  //   Form Submission
  //   const handleFormSubmit = async (event) => {
  //     event.preventDefault();
  //     const mutationResponse = await addUser({
  //       variables: {
  //         email: FormData.email,
  //         password: FormData.password,
  //         firstName: FormData.firstName,
  //         lastName: FormData.lastName,
  //       },
  //     });
  //     const token = mutationResponse.data.addUser.token;
  //     Auth.login(token);
  //   };

  return (
    <div id="signup" className="background">
      <h1 className="h1">Sign Up</h1>
      <ParticlesBackground />
      <Link className="link" to="/login">
        {" "}
        <h2 className="link">← Go to Login</h2>
      </Link>

      {/* referenced redux store hw */}
      <form
        className="form"
        //    onSubmit={handleFormSubmit}
      >
        <div>
          <label className="label" htmlFor="firstName">
            First Name:
          </label>
          <input
            className="input"
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label" htmlFor="lastName">
            Last Name:
          </label>
          <input
            className="input"
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleInputChange}
          />
        </div>
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
        <div className="">
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

        <div className="buttonContainer">
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
