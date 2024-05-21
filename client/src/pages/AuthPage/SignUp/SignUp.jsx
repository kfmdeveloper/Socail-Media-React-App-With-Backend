import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidError } from "react-icons/bi";
import { CgCircleci } from "react-icons/cg";
import { RiShieldUserFill } from "react-icons/ri";
import { RiLock2Line } from "react-icons/ri";
import { FaCircleCheck } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUp.css";
import { useDispatch } from "react-redux";
import { getUser } from "../../../Redux/Slice/UserSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nameERR, setnameERR] = useState(false);
  const [namegood, setnamegood] = useState(false);
  const [nameHandle, setnameHandle] = useState("d-none");
  const [nameicon, setnameicon] = useState("d-none");
  const [goodIcon, setgoodIcon] = useState("BiSolidError");
  const [usernameText, setusernameText] = useState("d-none");
  const [usernameicondisplay, setusernameicondisplay] = useState("d-none");
  const [usernamegoodIcon, setusernamegoodIcon] = useState("BiSolidError");
  const [passwordText, setpasswordText] = useState("d-none");
  const [passwordicondisplay, setpasswordicondisplay] = useState("d-none");
  const [passwordgoodIcon, setpasswordgoodIcon] = useState("BiSolidError");
  const [newTextHandle, setnewTextHandle] = useState("d-none");
  const [Newicon, setNewicon] = useState("d-none");
  const [newgoodIcon, setnewgoodIcon] = useState("BiSolidError");

  const FormSubmitHandler = async (e) => {
    e.preventDefault();

    const name = e.target.querySelector("#name").value;
    const username = e.target.querySelector("#username").value;
    const email = e.target.querySelector("#email").value;
    const password = e.target.querySelector("#password").value;

    const errorr = {
      position: "top-center",
      style: {
        background: "bluevioult",
        color: "black",
      },
    };

    if (!name || (!username && !email && !password)) {
      toast.error(" Please provide all details   ", errorr);
    } else if (!username || !email || !password) {
      if (!username) {
        toast.error(" Please enter Username ", errorr);
      } else if (!email) {
        toast.error(" Please enter email ", errorr);
      } else if (!name) {
        toast.error(" Please enter Name ", errorr);
      } else if (!password) {
        toast.error(" Please enter Password ", errorr);
      } else {
        toast.error(" Please provide all details   ", errorr);
      }
    } else if (
      name.length < 3 ||
      username.length < 5 ||
      email.length < 13 ||
      password.length < 8
    ) {
      if (username.length < 5) {
        toast.error(" Username must be valid ", errorr);
      } else if (email.length < 13) {
        toast.error("invalid email ");
      } else if (name.length < 3) {
        toast.error(" Name is too short!   ", errorr);
      } else if (password.length < 8) {
        toast.error(" Password must be at least 8 characters   ", errorr);
      } else {
        toast.error(" Please reload the page   ", errorr);
      }
    } else {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/auth/signup",
          {
            name,
            email,
            username,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(res);
        if (res.data.success) {
          dispatch(getUser(res?.data?.user));
          toast.success(res.data.message);
          setTimeout(() => {
            // After successful signup, navigate to Home
            navigate("/login");
          }, 2000);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "An error occurred while signing up"
        );
      }
    }
  };

  const NewChangehandler = (e) => {
    let name = e.target.value;
    if (!name) {
      setnameERR(true);
      setnewTextHandle("");
      setnewgoodIcon("BiSolidError");
      setNewicon("");
    } else if (name.length < 3) {
      setnameERR(true);
      setnewTextHandle("");
      setnamegood(false);
      setnewgoodIcon("BiSolidError");
      setNewicon("");
    } else if (name.length >= 3) {
      setnamegood(true);
      setnewTextHandle("d-none");
      setNewicon("");
      setnewgoodIcon("FaCircleCheck");
      setInterval(() => {
        setnamegood(false);
      }, 3000);
    } else {
      setgoodIcon(FaCircleCheck);
      setnameERR(false);
      setnewTextHandle("d-none");
      setNewicon("d-none");
    }
  };

  const nameChangehandler = (e) => {
    let username = e.target.value;
    if (!username) {
      setnameERR(true);
      setnameHandle("");
      setgoodIcon("BiSolidError");
      setnameicon("");
    } else if (username.length < 5) {
      setnameERR(true);
      setnameHandle("");
      setnamegood(false);
      setgoodIcon("BiSolidError");
      setnameicon("");
    } else if (username.length >= 5) {
      setnamegood(true);
      setnameHandle("d-none");
      setnameicon("");
      setgoodIcon("FaCircleCheck");
    } else {
      setgoodIcon(FaCircleCheck);
      setnameERR(false);
      setnameHandle("d-none");
      setnameicon("d-none");
    }
  };

  const usernameChangeHandler = (e) => {
    let email = e.target.value;
    if (!email) {
      setnameERR(true);
      setusernameText("");
      setusernamegoodIcon("BiSolidError");
      setusernameicondisplay("");
    } else if (email.length < 13) {
      setnameERR(true);
      setusernameText("");
      setusernamegoodIcon("BiSolidError");
      setusernameicondisplay("");
    } else if (email.length > 12) {
      setusernameText("d-none");
      setnameERR(true);
      setusernameicondisplay("");
      setusernamegoodIcon("FaCircleCheck");
    } else {
      setusernamegoodIcon("FaCircleCheck");
      setnameERR(false);
      setusernameText("d-none");
      setusernameicondisplay("d-none");
    }
  };

  const passwordChangeHandler = (e) => {
    let password = e.target.value;
    if (!password) {
      setnameERR(true);
      setpasswordText("");
      setpasswordgoodIcon("BiSolidError");
      setpasswordicondisplay("");
    } else if (password.length < 8) {
      setnameERR(true);
      setpasswordText("");
      setpasswordgoodIcon("BiSolidError");
      setpasswordicondisplay("");
    } else if (password.length >= 8) {
      setnamegood(true);
      setpasswordText("d-none");
      setpasswordicondisplay("");
      setpasswordgoodIcon("FaCircleCheck");
    } else {
      setpasswordgoodIcon("FaCircleCheck");
      setnameERR(false);
      setpasswordText("d-none");
      setpasswordicondisplay("d-none");
    }
  };

  return (
    <div className="SignUp ">
      <div className="container  pt-3   ">
        <form
          onSubmit={FormSubmitHandler}
          className="h-100 d-flex SingTop bg-info-subtle "
        >
          <div className="SingTop p-4 w-50">
            <div
              className={`SiggnUp  w-75 p-3 d-flex flex-column align-items-center align-items-center `}
            >
              <div className="">
                <h2>
                  <strong>Sign Up</strong>
                </h2>
              </div>
              <div className="  mt-3 fields">
                <div className=" ">
                  <label htmlFor="name">Name</label>
                  <br />
                  <div className="d-flex ">
                    <div className="d-flex fields2">
                      <CgCircleci className="text-danger me-1 " size={"25"} />
                      <input
                        className="me-2"
                        id="name"
                        type="text"
                        placeholder="Enter name "
                        onChange={NewChangehandler}
                      />
                    </div>
                    {newgoodIcon === "BiSolidError" ? (
                      <BiSolidError
                        className={`ErrorIcon mt-2 position-absolute  ${Newicon}`}
                        size={"25"}
                        color="red"
                      />
                    ) : newgoodIcon === "FaCircleCheck" ? (
                      <FaCircleCheck
                        className={`ErrorIcon mt-2 position-absolute   ${Newicon}`}
                        size={"20"}
                        color="blue"
                      />
                    ) : null}
                  </div>
                  <span className={`${newTextHandle} text-danger`}>
                    {nameERR
                      ? "Enter valid name!"
                      : namegood
                      ? "Looks Good!"
                      : ""}
                  </span>
                </div>
                <div className=" ">
                  <label htmlFor="name">Username</label>
                  <br />
                  <div
                    style={{ textTransform: "lowercase" }}
                    className="d-flex "
                  >
                    <div className="d-flex fields2">
                      <CgCircleci className="text-danger me-1 " size={"25"} />
                      <input
                        className="me-2"
                        id="username"
                        type="text"
                        placeholder="Enter Username "
                        onChange={nameChangehandler}
                      />
                    </div>
                    {goodIcon === "BiSolidError" ? (
                      <BiSolidError
                        className={`ErrorIcon mt-2 position-absolute  ${nameicon}`}
                        size={"25"}
                        color="red"
                      />
                    ) : goodIcon === "FaCircleCheck" ? (
                      <FaCircleCheck
                        className={`ErrorIcon mt-2 position-absolute   ${nameicon}`}
                        size={"20"}
                        color="blue"
                      />
                    ) : null}
                  </div>
                  <span className={`${nameHandle} text-danger`}>
                    {nameERR
                      ? "Enter valid username!"
                      : namegood
                      ? "Looks Good!"
                      : ""}
                  </span>
                </div>
                <div className="">
                  <label htmlFor="username">Email</label>
                  <br />
                  <div className="d-flex ">
                    <div className="d-flex fields2">
                      <RiShieldUserFill
                        className="text-danger me-1 "
                        size={"30"}
                      />
                      <input
                        className="me-2"
                        id="email"
                        type="email"
                        placeholder="Enter email "
                        onChange={usernameChangeHandler}
                      />
                    </div>
                    {usernamegoodIcon === "BiSolidError" ? (
                      <BiSolidError
                        className={`ErrorIcon mt-2 position-absolute  ${usernameicondisplay}`}
                        size={"25"}
                        color="red"
                      />
                    ) : usernamegoodIcon === "FaCircleCheck" ? (
                      <FaCircleCheck
                        className={`ErrorIcon mt-2 position-absolute   ${usernameicondisplay}`}
                        size={"20"}
                        color="blue"
                      />
                    ) : null}
                  </div>
                  <span className={`${usernameText} text-danger`}>
                    {nameERR
                      ? "Email must be valid!"
                      : namegood
                      ? "Looks Good!"
                      : ""}
                  </span>
                </div>
                <div className="my-1">
                  <label htmlFor="name">Password</label>
                  <br />
                  <div className="d-flex ">
                    <div className="d-flex fields2">
                      <RiLock2Line className="text-danger me-1  " size={"25"} />
                      <input
                        className="me-2"
                        id="password"
                        type="password"
                        placeholder="Enter password "
                        onChange={passwordChangeHandler}
                      />
                    </div>
                    {passwordgoodIcon === "BiSolidError" ? (
                      <BiSolidError
                        className={`ErrorIcon mt-2 position-absolute  ${passwordicondisplay}`}
                        size={"25"}
                        color="red"
                      />
                    ) : passwordgoodIcon === "FaCircleCheck" ? (
                      <FaCircleCheck
                        className={`ErrorIcon mt-2 position-absolute   ${passwordicondisplay}`}
                        size={"20"}
                        color="blue"
                      />
                    ) : null}
                  </div>
                  <span className={`${passwordText} text-danger`}>
                    {nameERR
                      ? "At lease 8 characters!"
                      : namegood
                      ? "Looks Good!"
                      : ""}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <button type="submit" className="btnSign2 text-white ">
                  {isLoading ? "Signing Up..." : "Sign Up"}
                </button>
                <ToastContainer />
              </div>
            </div>
          </div>
          <div className="loggin text-white p-3 w-50 text-center align-items-center align-content-center h-100 ">
            <div className="">
              <h1
                style={{ fontFamily: "JetBrains Mono", fontWeight: "700" }}
                className="mb-4"
              >
                Welcome Back!
              </h1>
              <p className="my-2">
                Keep connected with us please login with your personal info.{" "}
                <br />
                <strong>have an Account?</strong>
              </p>
              <Link
                to={"/login"}
                onClick={() => toast.dark(" Please Login !")}
                className="mt-5"
              >
                <button className="btnSign mt-3 ">Sign In</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
