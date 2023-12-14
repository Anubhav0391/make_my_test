import React, { useEffect, useState } from "react";
import { Input, Spinner, Text } from "@chakra-ui/react";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import { CiSaveUp1 } from "react-icons/ci";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TeaQuestion from "../components/TeaQuestion";
import { MdDriveFolderUpload } from "react-icons/md";

function TeacherTest() {
  const url = "https://cloudy-jade-shift.cyclic.app";
  const [title, setTitle] = useState("");
  const params = useParams();
  const [img, setImg] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [Qs, setQs] = useState([
    {
      type: "Categorize",
      question: "",
      image: "",
      categories: [""],
      items: [{ value: "", belong: "" }],
    },
  ]);

  const handleFileChange = async (event) => {
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

        setImg(res.data.data.url);
        alert("Upload successful");
      } catch (error) {
        console.error("Error uploading image to imgBB:", error.message);
      }
    }
  };

  function submitFunc() {
    if (!title) {
      alert("Please provide the title.");
    } else {
      let obj = {
        title: title,
        image: img,
        questions: Qs,
      };

      alert('Saving the changes ...')
      if (!params.id) {
        axios.post(`${url}/tests`, obj).then((res) => {
          setId(res.data.test._id);
          alert("All changes saved successfully");
          navigate("/");
        });
      } else {
        axios.patch(`${url}/tests/${id}`, obj).then((res) => {
          console.log(res);
          alert("All changes saved successfully");
          navigate("/");
        });
      }
    }
  }

  useEffect(() => {
    if (params.id) {
      axios.get(`${url}/tests/${params.id}`).then((res) => {
        setId(res.data[0]._id);
        setTitle(res.data[0].title);
        setImg(res.data[0].image);
        setQs(res.data[0].questions);
      });
    }
  }, []);

  return params.id && !id ? (
    <Spinner m={"auto"} display={"block"} size={"xl"} mt={20} />
  ) : (
    <div className=" mt-10">
      <div className="w-[50%] m-auto">
        <div className=" bg-white w-[100%] p-6 rounded-md mb-6 flex align-items-center justify-between border-t-8 border-l-8 border-l-[#3B82F6] border-t-[#673AB7]">
          <Text fontSize={"40px"}>{title ? title : "New Test"}</Text>
          <div
            onClick={() => document.getElementById('topImg').click()}
            className=" rounded-xl cursor-pointer"
          >
            {img ? (
              <img
                src={img}
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
              onChange={handleFileChange}
              id={'topImg'}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div>
          <div className=" mb-6">
            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter Title"
              bg={"white"}
            />
          </div>
          {Qs.map((el, index) => (
            <TeaQuestion key={index} data={el} index={index} Qs={Qs} setQs={setQs} />
          ))}

          <div
            className=" bg-white flex flex-col gap-3 w-14 rounded-md h-[200px]"
            style={{ position: "fixed", top: "50vh", right: "20vw" }}
          >
            <button
              className=" m-auto p-2"
              onClick={() =>
                setQs((prev) => [
                  ...prev,
                  {
                    type: "Categorize",
                    question: "",
                    img: "",
                    categories: [""],
                    items: [{ value: "", belong: "" }],
                  },
                ])
              }
            >
              <IoIosAddCircleOutline fontSize={30} />
            </button>
            <button className=" m-auto p-2" onClick={submitFunc}>
              <CiSaveUp1 fontSize={30} />
            </button>
            <button className="m-auto p-2" onClick={() => navigate("/")}>
              <IoIosCloseCircleOutline fontSize={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherTest;
