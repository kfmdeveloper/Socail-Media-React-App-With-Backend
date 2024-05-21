import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTimeLinePosts } from "../Redux/Slice/UserSlice";

const useGetPOSTS = (id) => {
  const dispatch = useDispatch();
  const [posts, setposts] = useState(null);
  useEffect(() => {
    const gettingPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/post/timeline/${id}`
        );
        if (!res) {
          console.log("response is not comming!");
        }

        dispatch(setTimeLinePosts(res?.data));
        setposts(res?.data);
        dispatch(res);
      } catch (error) {
        console.log(error);
      }
    };
    gettingPosts();
  }, [id, dispatch]);
  return { posts };
};

export default useGetPOSTS;
