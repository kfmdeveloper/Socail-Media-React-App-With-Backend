import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../Redux/Slice/UserSlice";

const useGetOtherUsers = (id) => {
  const dispatch = useDispatch();
  const [otherUsers, setOtherUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/user/otherusers/${id}`,
          {
            withCredentials: true,
          }
        );
        dispatch(getOtherUsers(res?.data));
        setOtherUsers(res?.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, dispatch]);

  return { otherUsers, loading, error };
};

export default useGetOtherUsers;
