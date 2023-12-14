import { Input, Textarea } from "@chakra-ui/react";
import React, { useRef } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { RxDragHandleDots2 } from "react-icons/rx";

function TeaComprehension({ data, index, Qs, setQs }) {
  const queFrom = useRef(0);
  const queTo = useRef(0);
  const optFrom = useRef(0);
  const optTo = useRef(0);

  function queDrag() {
    let ques = [...Qs];
    [ques[index].questions[queFrom.current],
    ques[index].questions[queTo.current]] =
      [ques[index].questions[queTo.current],
    ques[index].questions[queFrom.current]]

    setQs([...ques]);
  }
  function optDrag(i) {
    let ques = [...Qs];
    [ques[index].questions[i].option[optFrom.current],
    ques[index].questions[i].option[optTo.current]] =
      [ques[index].questions[i].option[optTo.current],
    ques[index].questions[i].option[optFrom.current]] 

    setQs([...ques]);
  }

  function paraFunc(e) {
    let ques = [...Qs];
    ques[index].passage = e.target.value;
    setQs(ques);
  }

  function queAdd() {
    let ques = [...Qs];
    ques[index].questions.push({
      question: "",
      option: ["", ""],
      answer: "",
    });
    setQs(ques);
  }

  function queRemove(i) {
    let ques = [...Qs];
    if (ques[index].questions.length == 1) {
      return;
    }
    ques[index].questions.splice(i, 1);
    setQs(ques);
  }

  function queEdit(i, value) {
    let ques = [...Qs];
    ques[index].questions[i].question = value;
    setQs(ques);
  }

  function optRemove(i, j) {
    let ques = [...Qs];
    if (ques[index].questions[i].option.length == 1) {
      return;
    }
    ques[index].questions[i].option.splice(j, 1);
    setQs(ques);
  }

  function optAdd(i, e) {
    if (e.target.value != "") {
      let ques = [...Qs];
      if (!ques[index].questions[i].option.includes(e.target.value)) {
        ques[index].questions[i].option.push(e.target.value);
        setQs(ques);
        e.target.value = "";
      }
    }
  }
  function optEdit(i, x, value) {
    let ques = [...Qs];
    ques[index].questions[i].option[x] = value;
    ques[index].questions[i].answer = value;
    setQs(ques);
  }
  
  function mcq(i, ans) {
    let ques = [...Qs];
    ques[index].questions[i].answer = ans;
    setQs([...ques]);
  }

  return (
    <div>
      <h5 className="my-3 mt-0 font-semibold"> Question {index + 1}</h5>
      <p>Read the text below and answer based upon it.</p>
      <Textarea
        id="question"
        rows={4}
        marginTop={"5px"}
        defaultValue={data.passage}
        onChange={paraFunc}
        placeholder="Add passage here..."
      />
      <div>
        {data?.questions.map((el, i) => (
          <div
            key={i}
            draggable
            onDragStart={() => (queFrom.current = i)}
            onDragEnter={() => (queTo.current = i)}
            onDragEnd={queDrag}
            className="my-5  m-auto rounded-lg p-5 ring-1 ring-gray-300"
          >
            <div className=" flex items-center justify-between">
            <h4 className="flex gap-1 items-center font-semibold mb-3">
              <RxDragHandleDots2 size={"25px"} /> Question {index + 1}.{i + 1}
            </h4>
            <button
              onClick={()=>queRemove(i)}
              className=" text-[24px] mb-4"
            >
              ×
            </button></div>
            <Input
              type="text"
              placeholder="Add Question"
              value={el.question}
              onChange={(e) => queEdit(i, e.target.value)}
            />
            <div>
              {el.option.map((ele, j) => (
                <div
                  key={j}
                  draggable
                  onDragStart={() => (optFrom.current = j)}
                  onDragEnter={() => (optTo.current = j)}
                  onDragEnd={() => optDrag(i)}
                  className="flex items-center gap-3 my-3 ml-5"
                >
                  <RxDragHandleDots2 size={"25px"} />
                  <input
                    value={el.answer == ele && ele != ""}
                    onChange={() => mcq(i, ele)}
                    name="question"
                    type="radio"
                  />
                  <Input
                    type="text"
                    width={"20vw"}
                    placeholder={'Enter Option'}
                    value={ele}
                    onChange={(e) => optEdit(i, j, e.target.value)}
                  />
                  <button
                    onClick={() => optRemove(i, j)}
                    style={{ fontSize: "20px" }}
                  >
                    ×
                  </button>
                </div>
              ))}
              {el.option.length < 4 ? (
                <Input
                  type="text"
                  className="ml-[82px]"
                  width={"20vw"}
                  placeholder="Enter Option"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      optAdd(i, e);
                    }
                  }}
                />
              ) : ''}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={queAdd}
        className="w-[100%] flex justify-end text-[24px] "
      >
        <IoIosAddCircle />
      </button>
    </div>
  );
}

export default TeaComprehension;
