import React, { useEffect, useRef, useState } from "react";

function StuCloze({ element }) {
  const itemFrom = useRef();
  const itemTo = useRef();
  const [options, setOptions] = useState([]);
  const sentence = element.question.replace(/_\w+_/g, "~").split(" ");

  function dragFunc() {
    let opts = [...options];
    opts[itemFrom.current].put = itemTo.current;
    setOptions(opts);
  }

  useEffect(() => {
    setOptions(element.option.map((el) => ({ value: el, put: null })));
  }, []);

  return (
    <div>
      <h3 className="ml-3 font-semibold ">
        Read the text below and answer the question based on it.
      </h3>
      <div className="my-3">
        {options.map((el, i) =>
          el.put != null ? null : (
            <span
              key={i}
              onDragStart={() => (itemFrom.current = i)}
              onDragEnd={dragFunc}
              draggable
              className="mx-3 text-white font-semibold rounded-md bg-blue-500 py-1 px-3"
            >
              {el.value}
            </span>
          )
        )}
      </div>
      <div className="flex gap-2 items-center ml-3">
        {sentence.map((el, j) =>
          el === "~" ? (
            <p
              key={j}
              onDragEnter={() => (itemTo.current = j)}
              className="bg-[#cddfed] p-1 min-w-[50px] h-8 rounded-sm"
            >
              {options.map((el, i) =>
                el.put == j ? (
                  <span
                    key={i}
                    draggable
                    onDragEnd={dragFunc}
                    onDragStart={() => (itemFrom.current = i)}
                    className=" text-white font-semibold rounded-md bg-blue-500 py-1 px-3 mx-0.5"
                  >
                    {el.value}
                  </span>
                ) : ''
              )}
            </p>
          ) : (
            <span key={j}>{el}</span>
          )
        )}
      </div>
    </div>
  );
}

export default StuCloze;
