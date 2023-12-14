import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StuCategorize from "../components/StuCategorize";
import StuCloze from "../components/StuCloze";
import StuComprehension from "../components/StuComprehension";
import { Spinner, Text } from "@chakra-ui/react";

function StudentTest() {
  const url = "https://cloudy-jade-shift.cyclic.app";
  const [data, setData] = useState({ questions: [] });
  const navigate = useNavigate();
  const params = useParams();

  async function submitTest() {
    alert("Test submitted successfully");
    navigate("/");
  }

  useEffect(() => {
    axios.get(`${url}/tests/${params.id}`).then((res) => setData(res.data[0]));
  }, []);

  return !data.title ? (
    <Spinner m={"auto"} display={"block"} size={"xl"} mt={20} />
  ) : (
    <div className="w-[50%] m-auto mt-10">
      <div className=" bg-white w-[100%] p-6 rounded-md mb-6 flex align-items-center justify-between border-t-8 border-l-8 border-l-[#3B82F6] border-t-[#673AB7]">
        <Text fontSize={"40px"}>{data.title}</Text>
        <img
          src={data.image}
          width={"70px"}
          height={"70px"}
          alt=""
          className=" rounded-xl"
        />
      </div>

      {data?.questions.map((el, index) => (
        <div key={index} className=" bg-white p-3 my-3 rounded-lg">
          <div className=" flex justify-between items-center my-2">
            <div>
              <h3 className="flex gap-5 font-semibold text-[20px] items-center">
                <span>Question {index + 1}</span>
              </h3>
            </div>
            <img
              src={el.image}
              width={"70px"}
              height={"70px"}
              alt=""
              className=" rounded-xl"
            />
          </div>
          {el.type == "Categorize" ? (
            <StuCategorize index={index} element={el} data={data} setData={setData}/>
          ) : el.type == "Cloze" ? (
            <StuCloze index={index} element={el} data={data} setData={setData}/>
          ) : el.type == "Comprehension" ? (
            <StuComprehension index={index} element={el} data={data} setData={setData}/>
          ) : (
            ""
          )}
        </div>
      ))}
      <button
        onClick={submitTest}
        className=" bg-[#673AB7] py-2 px-4 text-white font-[500] rounded-[4px]"
      >
        Submit
      </button>
    </div>
  );
}

export default StudentTest;
