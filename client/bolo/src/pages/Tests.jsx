import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Tests() {
  const url = "https://cloudy-jade-shift.cyclic.app";
  const [tests, setTests] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  function deleteTest(id) {
    setTests((tests) => tests.filter((test) => test._id != id));

    axios
      .delete(`${url}/tests/${id}`)
      .then(() => console.log("deleted"))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    setLoad(true)
    axios
      .get(`${url}/tests`)
      .then((res) => setTests(res.data))
      .catch((err) => console.log(err))
      .finally(()=>setLoad(false));
  }, []);

  return (
    <div className="w-[50vw] mx-auto mt-5 p-3 ">
      <div className="flex items-start flex-col  sm:flex-row sm:justify-center sm:items-center mb-[20px]">
        <h2 className="text-[#9A6AFD] text-[60px] font-bold">Tests</h2>
      </div>

      {load ? (
        <Spinner m={"auto"} display={"block"} size={"xl"} mt={20} />
      ):!tests.length?<h1 className=" text-[50px] font-bold text-center">No tests available.</h1> : (
        <div>
          {tests.map((data) => (
            <div
              key={data._id}
              className=" mb-3 ring-1 ring-gray-300 p-3 rounded-md bg-white flex justify-between items-center  hover:border-purple-100"
            >
              <h3 className="font-semibold text-[25px]">
                {data.title}
              </h3>
              <div className="flex gap-3">
                <button
                  className="py-1 px-3 text-white bg-[#9A6AFD] rounded-md"
                  onClick={() => navigate(`/open/${data._id}`)}
                >
                  <FaExternalLinkAlt fontSize={20} />
                </button>
                <button
                  className="py-1 px-3 text-white bg-[#9A6AFD] rounded-md"
                  onClick={() => navigate(`/edit/${data._id}`)}
                >
                  <FaRegEdit fontSize={22} />
                </button>
                <button
                  className="py-1 px-3 text-white bg-[#9A6AFD] rounded-md"
                  onClick={() => deleteTest(data._id)}
                >
                  <MdDeleteOutline fontSize={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tests;
