import React, { useRef } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { Button, Input } from "@chakra-ui/react";

function TeaCategorize({ data, index, Qs, setQs }) {
  const categFrom = useRef(0);
  const categTo = useRef(0);
  const itemFrom = useRef(0);
  const itemTo = useRef(0);
  
  function categDrag() {
    let ques = [...Qs];
    [
      ques[index].categories[categFrom.current],
      ques[index].categories[categTo.current],
    ] = [
      ques[index].categories[categTo.current],
      ques[index].categories[categFrom.current],
    ];

    setQs([...ques]);
  }

  function itemDrag() {
    let ques = [...Qs];
    [
      ques[index].items[itemFrom.current],
      ques[index].items[itemTo.current],
    ] = [
      ques[index].items[itemTo.current],
      ques[index].items[itemFrom.current],
    ];

    setQs([...ques]);
  }

  function titleFunc(e) {
    let ques = [...Qs];
    ques[index].question = e.target.value;
    setQs(ques);
  }

  function categAdd(e) {
    if (e.target.value != "") {
      let ques = [...Qs];
      if (!ques[index].categories.includes(e.target.value)) {
        ques[index].categories.push(e.target.value);
        setQs(ques);
        e.target.value = "";
      }
    }
  }
  function catgEdit(i, value) {
    let ques = [...Qs];
    ques[index].categories[i] = value;
    setQs(ques);
  }

  function categRemove(i) {
    let ques = [...Qs];
    if (ques[index].categories.length == 1) {
      return;
    }
    ques[index].categories = ques[index].categories.filter((el, I) => I != i);
    setQs(ques);
  }

  function itemAdd(e) {
    if (e.target.value != "") {
      let ques = [...Qs];

      for (let i = 0; i < ques[index].items.length; i++) {
        if (ques[index].items[i].value == e.target.value) {
          return;
        }
      }

      ques[index].items.push({
        value: e.target.value,
        belong: ques[index].categories[0],
      });
      setQs(ques);
      e.target.value = "";
    }
  }

  function itemEdit(i, value) {
    let ques = [...Qs];
    ques[index].items[i].value = value;
    setQs(ques);
  }
  function itemCategEdit(i, value) {
    let ques = [...Qs];
    ques[index].items[i].belong = value;
    setQs(ques);
  }

  function itemRemove(i) {
    let ques = [...Qs];
    if (ques[index].items.length == 1) {
      return;
    }
    ques[index].items = ques[index].items.filter((el, I) => I != i);
    setQs(ques);
  }

  return (
    <div>
      <h5 htmlFor="question" className="font-semibold">
        Question {index + 1}
      </h5>
      <Input
        type="text"
        marginTop={"10px"}
        defaultValue={data.question}
        onChange={titleFunc}
        placeholder="Enter description for the question"
      />

      <p className="my-3 font-bold">Categories</p>
      <div>
        {data?.categories.map((el, i) => (
          <div
            draggable
            key={i}
            className="flex gap-3 my-3 items-center"
            onDragStart={() => (categFrom.current = i)}
            onDragEnter={() => (categTo.current = i)}
            onDragEnd={categDrag}
          >
            <RxDragHandleDots2 size={"20px"} />
            <Input
              type="text"
              placeholder={"Enter Category"}
              width={"20vw"}
              value={el}
              onChange={(e) => catgEdit(i, e.target.value)}
            />
            <Button bg={"white"} fontSize={20} onClick={() => categRemove(i)}>
              ×
            </Button>
          </div>
        ))}
        <Input
          type="text"
          width={"20vw"}
          className="ml-8"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              categAdd(e);
            }
          }}
          placeholder="Enter Category"
        />
      </div>

      <div>
        <h5 className="font-bold my-3">Items</h5>
        {data?.items.map((el, i) => (
          <div
            draggable
            key={i}
            className="flex justify-between my-3"
            onDragStart={() => (itemFrom.current = i)}
            onDragEnter={() => (itemTo.current = i)}
            onDragEnd={itemDrag}
          >
            <div className="flex items-center gap-3">
              <RxDragHandleDots2 size={"20px"} />
              <Input
                type="text"
                placeholder={"Enter Item"}
                width={"20vw"}
                value={el.value}
                onChange={(e) => itemEdit(i, e.target.value)}
              />
              <Button bg={"white"} fontSize={20} onClick={() => itemRemove(i)}>
                ×
              </Button>
            </div>
            <select
              className=" w-[20vw] ring-1 ring-gray-200 rounded-md"
              value={el.belong}
              placeholder="Belongs to"
              onChange={(e) => itemCategEdit(i, e.target.value)}
            >
              {data?.categories.map((e) => (
                <option key={e} value={e} selected={e == el.belong}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        ))}
        <Input
          type="text"
          width={"20vw"}
          className="ml-8"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              itemAdd(e);
            }
          }}
          placeholder="Enter Item"
        />
      </div>
    </div>
  );
}

export default TeaCategorize;
