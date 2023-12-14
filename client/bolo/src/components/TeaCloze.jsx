import { Input } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";

function TeaCloze({ data, index, Qs, setQs }) {
  const [blanked, setBlanked] = useState("");
  const optFrom = useRef(0);
  const optTo = useRef(0);

  function blankOpt(sen) {
    let ques = [...Qs];
    ques[index].question = sen;

    if (sen.match(/_\w+_/g)) {
      ques[index].option = sen
        .match(/_\w+_/g)
        .map((el) => el.replace(/_/g, ""));
    }

    setBlanked(sen.replace(/_\w+_/g, "_ _ _"));
    setQs(ques);
  }

  function optDrag() {
    let ques = [...Qs];
    [
      ques[index].option[optFrom.current],
      ques[index].option[optTo.current]
    ] = [
      ques[index].option[optTo.current],
      ques[index].option[optFrom.current],
    ];

    setQs([...ques]);
  }

  function addOptions(e) {
    if (e.target.value != "") {
      let ques = [...Qs];

      ques[index].option.push(e.target.value);
      setQs(ques);
      e.target.value = "";
    }
  }

  return (
    <div>
      <h5 htmlFor="question" className="my-3 font-semibold">
        Question {index + 1}
      </h5>

      <p className="font-semibold mb-2">Fill in the blanks</p>
      <div className="mb-[20px] min-h-[25px]">{blanked}</div>

      <label htmlFor="Sentence" className="font-semibold mt-[20px]">
        Sentence
      </label>
      <p className=" text-blue-500 text-[15px] ml-3">
        Write any word like _word_ for _ _ _
      </p>
      <Input
        type="text"
        id="Sentence"
        value={data.question}
        marginTop={"10px"}
        onChange={(e) => blankOpt(e.target.value)}
        placeholder="Enter Sentence"
      />

      <div className="mt-[20px]">
        {!data?.option.length
          ? ""
          : data.option.map((el, i) => (
              <div
                key={i}
                draggable
                onDragStart={() => (optFrom.current = i)}
                onDragEnter={() => (optTo.current = i)}
                onDragEnd={optDrag}
                className="flex gap-3 items-center my-3"
              >
                <RxDragHandleDots2 size={"20px"} />
                <Input type="text" width={"20vw"} value={el} />
              </div>
            ))}
        <Input
          type="text"
          width={"20vw"}
          className="ml-8"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              addOptions(e);
            }
          }}
          placeholder="Enter Option"
        />
      </div>
    </div>
  );
}

export default TeaCloze;
