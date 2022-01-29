import React, { useState } from "react";
import ParticlesBackground from "./Particles";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
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
    fontFamily: 'Share Tech Mono, monospace',
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
    fontFamily: 'Share Tech Mono, monospace'
  },
  label: {
    fontWeight: "bold",
    fontSize: " 1.5em",
    paddingRight: "10px",
    fontFamily: 'Share Tech Mono, monospace'
    
  },
  h1: {
    display: "flex",
    color: "white",
    justifyContent: "center",
    fontFamily: 'Share Tech Mono, monospace'
  },
  link: {
    textDecorationColor: "white",
    color: "white",
    fontFamily: 'Share Tech Mono, monospace'
  },
  errorText:{
    color: 'rgb(228, 46, 1)',
    fontFamily: 'Share Tech Mono, monospace'
  }
};
const Login = () => {
  const [FormData, setUserFormData] = useState({ email: "", password: "" });
  // will need to bring in login mutation and name it LOGIN_USER
  // const [loginUser, {error}] = useMutation(LOGIN_USER);

  //   Input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...FormData, [name]: value });
  };

  //   Form Submission
  //   const handleFormSubmit = async (event) => {
  //     event.preventDefault();
  //     try {
  //       const mutationResponse = await loginUser({
  //         variables: { email: FormData.email, password: FormData.password },
  //       });
  //       const token = mutationResponse.data.login.token;
  //       Auth.login(token);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  return (
    <div id="login" style={styles.background}>
      <h1 style={styles.h1}>Login</h1>
      <ParticlesBackground />
      <Link style={styles.link} to="/signUp">
        {" "}
        <h2 style={styles.link}>← Go to Signup</h2>
      </Link>

      {/* referenced redux store hw */}
      <form
        style={styles.form}
        //    onSubmit={handleFormSubmit}
      >
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
        {/* {error ? (
          <div>
            <p style={styles.errorText}>The provided credentials are incorrect</p>
          </div>
        ) : null} */}
        <div style={styles.buttonContainer} className="">
          <button style={styles.button} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
