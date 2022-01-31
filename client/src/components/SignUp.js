import React, { useState } from "react";
import ParticlesBackground from "./Particles";
import { Link } from "react-router-dom";
import Auth from "../utils/Auth";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';


const SignUp = () => {
  const [FormData, setUserFormData] = useState({ username:"",email: "", password: "" });
    const [addUser, {error}] = useMutation(ADD_USER);

  //   Input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...FormData, [name]: value });
  };

  //   Form Submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try{
      const mutationResponse = await addUser({
        variables: {
         username: FormData.username,
         email: FormData.email,
         password: FormData.password
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    }catch(err){
      console.error(err);
    }
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
      
  };

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
           onSubmit={handleFormSubmit}
      >
        <div>
          <label className="label" htmlFor="username">
            Username:
          </label>
          <input
            className="input"
            placeholder="Username"
            name="username"
            type="text"
            id="username"
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
        {error && (
              <div className="">
                {error.message}
              </div>
            )}
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
