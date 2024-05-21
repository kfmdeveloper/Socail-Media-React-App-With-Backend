import React, { useRef, useState } from "react";
import ProfileImage from "../../../img/profileImg.jpg";
import { CiImageOn } from "react-icons/ci";
import { PiVideoFill } from "react-icons/pi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdDateRange } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./SharePost.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTimeLinePosts } from "../../../Redux/Slice/UserSlice";
const SharePost = () => {
  const dispath = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [image, setimage] = useState(null);
  const [Desc, setDesc] = useState("");
  const imageRef = useRef();
  const SubmitPosthandler = async (e) => {
    e.preventDefault();
    if (!Desc) {
      toast.error("Please enter something to post!");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/post",
        {
          desc: Desc,
          userId: user._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(res.data.message, {
        position: "top-center",
      });
      dispath(setTimeLinePosts(res?.data));
    } catch (error) {
      console.log(error);
      toast.error("Failed to post", {
        position: "top-center",
      });
    }
  };

  const imageChangeHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setimage({
        Image: URL.createObjectURL(img),
      });
    }
  };
  return (
    <div className="SharePost">
      <img src={ProfileImage} alt="" />
      <form onSubmit={SubmitPosthandler} className="post">
        <input
          type="text"
          id="postdesc"
          value={Desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="What's happening?"
        />
        {image && (
          <div>
            <MdCancel
              onClick={() => {
                setimage(null);
              }}
              color="orange"
              size={35}
              className="ImageCross"
            />
            <div className="imagepreview">
              <img className="" src={image.Image} alt="" />
            </div>
          </div>
        )}
        <div className="resources">
          <div className="">
            <input
              type="file"
              name="myImg"
              ref={imageRef}
              onChange={imageChangeHandler}
              style={{ display: "none" }}
            />

            <div onClick={() => imageRef.current.click()} className=" option">
              <CiImageOn color="red" size={24} />
              <span style={{ color: "red" }}>Photo</span>
            </div>
          </div>

          <div className="option">
            <PiVideoFill size={24} />
            <span>Video</span>
          </div>
          <div className="option">
            <HiOutlineLocationMarker color="blue" size={24} />
            <span style={{ color: "blue" }}>Location</span>
          </div>
          <div className="option">
            <MdDateRange color="red" size={24} />
            <span style={{ color: "red" }}>Schedule</span>
          </div>
          <button
            type="submit"
            style={{ marginRight: "-1rem" }}
            className="Postbutton"
          >
            Post
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SharePost;
