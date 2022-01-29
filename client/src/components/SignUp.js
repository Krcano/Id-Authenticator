import React, { useState } from "react";
import ParticlesBackground from "./Particles";
import { Link } from "react-router-dom";
// import Auth from '../utils/auth';
// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';
// download
// import {useMutation} from '@apollo/client'

const styles = {
  background: {
    background: "#222330",
    height: "100vh",
  },

  input: {
    display: "flex",
    padding: " 14px 32px 14px 16px",
    borderRadius: "4px",
    outline: "none",
    width: "400px",
    fontFamily: "serif",
    marginBottom: "20px",
    fontSize: "1.25em",
    color: "black",
  },
  form: {
    display: "flex",
    flexDirection: "column",

    color: "white",
    alignItems: "center",
    fontFamily: "Playfair Display serif",
  },
  button: {
    border: "none",
    padding: "5px 10px",
    // margin: "5px",
    borderRadius: "5px",
    cursor: "pointer",
    /* text-decoration: none; */
    fontSize: "1.5em",
    fontFamily: "inherit",
    width: "400px",
    background: "#ff6162",
    color: "white",
    position: "absolute",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  label: {
    fontWeight: "bold",
    fontFamily: "serif",
    fontSize: " 1.5em",
    paddingRight: "10px",
  },
  h1: {
    display: "flex",
    color: "white",
    justifyContent: "center",
  },
  link: {
    textDecorationColor: "white",
    color: "white",
  },
};
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
    <div id="signup" style={styles.background}>
      <h1 style={styles.h1}>Sign Up</h1>
      <ParticlesBackground />
      <Link style={styles.link} to="/login">
        {" "}
        <h2 style={styles.link}>← Go to Login</h2>
      </Link>

      {/* referenced redux store hw */}
      <form
        style={styles.form}
        //    onSubmit={handleFormSubmit}
      >
        <div>
          <label style={styles.label} htmlFor="firstName">
            First Name:
          </label>
          <input
            style={styles.input}
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label style={styles.label} htmlFor="lastName">
            Last Name:
          </label>
          <input
            style={styles.input}
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.emailContainer} className="">
          <label style={styles.label} htmlFor="email">
            Email address:
          </label>
          <input
            style={styles.input}
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleInputChange}
          />
        </div>
        <div className="">
          <label style={styles.label} htmlFor="pwd">
            Password:
          </label>
          <input
            style={styles.input}
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleInputChange}
          />
        </div>
        
        <div style={styles.buttonContainer} className="">
          <button style={styles.button} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
