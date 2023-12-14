import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className=" px-32">
      <h1
        className=" text-center mx-[100px] mt-[100px]"
        style={{ fontSize: "8vh", fontWeight: "bold" }}
      >
        Elevate Efficiency with{" "}
        <span className=" text-[#8C52FF]">BoloForms</span>
      </h1>
      <p
        className=" text-gray-600 text-center my-10"
        style={{ fontSize: "4vh" }}
      >
        Are you tired of the hassle of managing documents, approvals, and
        time-sensitive tasks? BoloForms has you covered with our innovative
        suite of products designed to streamline your processes.
      </p>
      <button
        className=" bg-[#8C52FF] text-white rounded-full px-10 py-2 flex m-auto"
        style={{ fontSize: "40px" }}
        onClick={()=>navigate('/create')}
      >
        Create <FaArrowRight className="m-auto mt-3 ml-3" />
      </button>
    </div>
  );
};
