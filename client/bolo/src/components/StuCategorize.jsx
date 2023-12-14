import React, { useRef } from "react";

function StuCategorize({ index, element, data, setData }) {
  const itemFrom = useRef();
  const itemTo = useRef("");

  function dragFunc() {
    let ques = { ...data };
    ques.questions[index].items[itemFrom.current].put=
      itemTo.current;
    setData(ques);
  }

  return (
    <div>
      
      <h3 className='ml-3 font-semibold '>{element.question}</h3>
      <div className=" mt-3 flex justify-center gap-5">
        {element.items.map((el, i) =>
          el.put ? '' : (
            <span
              key={i}
              draggable
              onDragEnd={dragFunc}
              onDragStart={() => (itemFrom.current = i)}
              className="py-1 px-3 rounded-md font-semibold text-[20px]"
              style={{ border: "1px solid gray" }}
            >
              {el.value}
            </span>
          )
        )}
      </div>
      <div className=" flex justify-center gap-3 mt-5">
        {element.categories.map((el, j) => (
          <div
            key={j}
            className="text-center"
            onDragEnter={() => (itemTo.current = el)}
          >
            <div className="bg-blue-200 rounded-md mb-3 py-2 px-5 font-semibold text-[20px]">
              {el}
            </div>
            <div className='bg-blue-200 flex flex-col gap-2 min-h-[110px] p-3 rounded-md'>
              {element.items.map((item, i) =>
                item.put == el ? (
                  <span
                    key={i}
                    draggable
                    onDragEnd={dragFunc}
                    onDragStart={() => (itemFrom.current = i)}
                    className="py-1 px-3 rounded-md text-[20px]"
                    style={{ border: "1px solid gray" }}
                  >
                    {item.value}
                  </span>
                ) : null
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StuCategorize;
