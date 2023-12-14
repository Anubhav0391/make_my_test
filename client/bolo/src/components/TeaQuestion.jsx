import React from "react";
import TeaCategorize from "./TeaCategorize";
import TeaComprehension from "./TeaComprehension";
import TeaCloze from "./TeaCloze";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { MdDriveFolderUpload } from "react-icons/md";

function TeaQuestion({ data, index, Qs, setQs }) {
  const imgUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const form = new FormData();
        form.append("image", file);
        alert("Uploading...");
        const res = await axios.post("https://api.imgbb.com/1/upload", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            key: "0060171ac57a87f230a705c47877b971",
          },
        });

        let ques = [...Qs];
        ques[index].image = res.data.data.url;
        setQs(ques);
        alert("Upload successful");
      } catch (error) {
        console.error("Error uploading image to imgBB:", error.message);
      }
    }
  };

  function queRemove() {
    if (Qs.length > 1) {
      setQs((prev) => prev.filter((_, i) => i != index));
    }
  }

  function queTypeFunc(type) {
    let ques = [...Qs];
    if (type == "Categorize") {
      ques[index] = {
        type: "Categorize",
        question: "",
        image: "",
        categories: [""],
        items: [{ value: "", belong: "" }],
      };
    } else if (type == "Cloze") {
      ques[index] = { type: "Cloze", image: "", question: "", option: [] };
    } else {
      ques[index] = {
        type: "Comprehension",
        passage: "",
        questions: [{ question: "", image: "", option: ["", ""], answer: "" }],
      };
    }
    setQs(ques);
  }

  return (
    <div className=" bg-white questionCard relative  p-[20px] my-5 rounded-lg">
      <div className="flex mb-5 justify-between items-center ">
        <div
          onClick={() => document.getElementById(`${index}getFile`).click()}
          className=" rounded-xl cursor-pointer"
        >
          {data.image ? (
            <img
              src={data.image}
              width={"70px"}
              height={"70px"}
              alt=""
              className=" rounded-xl"
            />
          ) : (
            <h4 className="font-bold text-blue-500 text-[15px] flex justify-center items-center gap-3">
              <MdDriveFolderUpload size={"50px"} />
            </h4>
          )}
          <input
            type="file"
            onChange={imgUpload}
            id={`${index}getFile`}
            style={{ display: "none" }}
          />
        </div>
        <select
          className="rounded-md p-2 font-bold ring-1 ring-gray-300"
          onChange={(e) => queTypeFunc(e.target.value)}
        >
          <option
            className="bg-white"
            selected={data.type == "Categorize" ? true : false}
            value="Categorize"
          >
            Categorize
          </option>
          <option
            className="bg-white"
            selected={data.type == "Cloze" ? true : false}
            value="Cloze"
          >
            Cloze
          </option>
          <option
            className="bg-white"
            selected={data.type == "Comprehension" ? true : false}
            value="Comprehension"
          >
            Comprehension
          </option>
        </select>

        <Button fontSize={30} bg={"white"} onClick={queRemove}>
          ×
        </Button>
      </div>

      {data.type == "Categorize" ? (
        <TeaCategorize data={data} index={index} Qs={Qs} setQs={setQs} />
      ) : data.type == "Comprehension" ? (
        <TeaComprehension data={data} index={index} Qs={Qs} setQs={setQs} />
      ) : data.type == "Cloze" ? (
        <TeaCloze data={data} index={index} Qs={Qs} setQs={setQs} />
      ) : null}
    </div>
  );
}

export default TeaQuestion;
