import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiSolidError } from "react-icons/bi";
import { RiShieldUserFill } from "react-icons/ri";
import { RiLock2Line } from "react-icons/ri";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "../../../Redux/Slice/UserSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nameERR, setnameERR] = useState(false);
  const [namegood, setnamegood] = useState(false);
  const [usernameText, setusernameText] = useState("d-none");
  const [usernameicondisplay, setusernameicondisplay] = useState("d-none");
  const [usernamegoodIcon, setusernamegoodIcon] = useState("BiSolidError");
  const [passwordText, setpasswordText] = useState("d-none");
  const [passwordicondisplay, setpasswordicondisplay] = useState("d-none");
  const [passwordgoodIcon, setpasswordgoodIcon] = useState("BiSolidError");
  const [hideP, sethideP] = useState("password");
  const [hideicon, sethideicon] = useState("d-none");
  const [unhideicon, setunhideicon] = useState("d-none");

  const FormSubmitHandler = async (e) => {
    e.preventDefault();
    const email = e.target.querySelector("#username").value;
    const password = e.target.querySelector("#password").value;
    const errorr = {
      position: "top-center",

      style: {
        background: "bluevioult",
        color: "black",
      },
    };
    if (!email && !password) {
      toast.error(" Please provide all details ", errorr);
    } else if (!email || !password) {
      if (!email) {
        toast.error(" Please enter email  ", errorr);
      } else if (!password) {
        toast.error(" Please enter password  ", errorr);
      } else {
        toast.error(" Please fill all fields  ", errorr);
      }
    } else if (email.length < 13 || password.length < 8) {
      if (email.length < 13) {
        toast.error(" Email must be valid! ", errorr);
      } else if (password.length < 8) {
        toast.error("Password must be 8 characters  ", errorr);
        sethideicon("d-none");
      } else {
        toast.error("Please reload the page  ", errorr);
      }
    } else {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/auth/login",
          {
            email,
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
            navigate("/home");
          }, 2000);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error While logging");
      }
    }
  };
  const P = document.getElementById("password");
  const unhidepassword = () => {
    sethideP("text");
    sethideicon("d-none");
    setunhideicon("");
  };
  const hidepassword = () => {
    sethideP("password");
    sethideicon("");
    setunhideicon("d-none");
  };
  const usernameChangeHandler = (e) => {
    let email = e.target.value;
    if (!email) {
      setnameERR(true);
      setusernameText("");
      setusernamegoodIcon("BiSolidError");
      setusernameicondisplay("");
    } else if (email.length < 5) {
      setnameERR(true);
      setusernameText("");
      setusernamegoodIcon("BiSolidError");
      setusernameicondisplay("");
    } else if (email.length >= 5) {
      setusernameText("d-none");
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
      sethideicon("d-none");
      setunhideicon("d-none");
    } else if (password.length < 8) {
      setnameERR(true);
      setpasswordText("");
      setpasswordgoodIcon("BiSolidError");
      setpasswordicondisplay("");
      sethideicon("d-none");
      setunhideicon("d-none");
    } else if (password.length >= 8) {
      setnamegood(true);
      setpasswordText("d-none");
      setpasswordicondisplay("");
      setpasswordgoodIcon("FaCircleCheck");
      sethideicon("");
      setunhideicon("d-none");
    } else {
      setpasswordgoodIcon("FaCircleCheck");
      setnameERR(false);
      setpasswordText("d-none");
      setpasswordicondisplay("d-none");
      sethideicon("d-none");
      setunhideicon("d-none");
    }
  };
  return (
    <div className="SignUp ">
      <div className="container  pt-4   ">
        <form
          onSubmit={FormSubmitHandler}
          className="h-100 d-flex SingTop bg-info-subtle "
        >
          <div className="loggin2 text-white p-3 w-50 text-center align-items-center align-content-center h-100 ">
            <div className="">
              <h1 className="mb-4">Hello,Friends!</h1>
              <p className="my-2">
                Enter your personal details and start journey with us.
              </p>
              <Link
                to={"/signup"}
                onClick={() =>
                  toast.success(" Please create Account !", {
                    position: "top-center",
                  })
                }
                className="mt-5"
              >
                <button className="btnSign mt-4">Create Account</button>
              </Link>
            </div>
          </div>
          <div className="SingTop p-4 w-50">
            <div className="SiggnUp mt-2 p-4 d-flex flex-column align-items-center align-items-center ">
              <div className="">
                <h1>Sign In</h1>
              </div>
              <div className="  mt-3 fields">
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
                        id="username"
                        type="email"
                        placeholder="Enter your email"
                        onChange={usernameChangeHandler}
                      />
                    </div>
                    {usernamegoodIcon === "BiSolidError" ? (
                      <BiSolidError
                        className={`ErrorIcon CheckIcon mt-2  position-absolute  ${usernameicondisplay}`}
                        size={"25"}
                        color="red"
                      />
                    ) : usernamegoodIcon === "FaCircleCheck" ? (
                      <FaCircleCheck
                        className={`ErrorIcon CheckIcon position-absolute mt-2  ${usernameicondisplay}`}
                        size={"20"}
                        color="blue"
                      />
                    ) : null}
                  </div>
                  <span className={`${usernameText} text-danger`}>
                    {nameERR
                      ? "Must valid email Address!"
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
                        type={hideP}
                        placeholder="Enter password "
                        onChange={passwordChangeHandler}
                      />
                      <MdVisibilityOff
                        onClick={unhidepassword}
                        className={`${hideicon} me-2 picon`}
                        size={"32"}
                      />
                      <MdVisibility
                        onClick={hidepassword}
                        className={`${unhideicon} me-2 picon`}
                        size={"32"}
                        color="blue"
                      />
                    </div>
                    {passwordgoodIcon === "BiSolidError" ? (
                      <BiSolidError
                        className={`ErrorIcon mt-2  position-absolute  ${passwordicondisplay}`}
                        size={"25"}
                        color="red"
                      />
                    ) : null}
                  </div>
                  <span className={`${passwordText} text-danger`}>
                    {nameERR
                      ? "must be 8 characters!"
                      : namegood
                      ? "Looks Good!"
                      : ""}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <button type="submit" className="btnSign2 text-white ">
                  Log In
                </button>
                <ToastContainer />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
