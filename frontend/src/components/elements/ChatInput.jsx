import { useRef, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { API_HOST, API_SEND_MESSAGE, HOST } from "../../utils/constants";
import { FaImage } from "react-icons/fa6";
import { MdEmojiEmotions, MdSend } from "react-icons/md";
import { HiFaceSmile } from "react-icons/hi2";
import { BsEmojiGrin } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import toastr from "toastr";
import axios from "axios";
import AudioRecorder from "./AudioRecorder";
import { ImCross } from "react-icons/im";
import ReactAudioPlayer from "react-audio-player";
import { useSelector } from "react-redux";

export const ChatInput = () => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const { mobileNumber } = useSelector((store) => store.auth);
  const clearAudio = () => {
    setAudioPreview(null);
    setAudioBlob(null);
  };

  const fileInputRef = useRef(null);
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview && !audioPreview) return;

    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const data = {
        text: text.trim(),
        image: imagePreview,

        ...headers,
      };

      const formData = new FormData();

      formData.append("mobileNumber", mobileNumber);

      formData.append("_t", headers._t);
      formData.append("_di", headers._di);
      formData.append("text", data.text);
      formData.append("image", data.image);
      if (audioBlob) {
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes

        if (audioBlob.size > maxSize) {
          toastr.error(
            t("Audio file is too large! Please record a shorter message.")
          );
          return;
        }
        formData.append("audio", audioBlob, "audio.wav");
      }

      setText("");
      removeImage();
      clearAudio();
      const res = await axios.post(API_HOST + API_SEND_MESSAGE, formData, {
        headers,
      });

      //   //console.log(res.data);
      if (res.data.success) {
      } else {
        toastr.error(t(res.data.message));
      }
    } catch (error) {
      console.log(error);
      toastr.error(error.response ? error.response.data.message : error.message);
    }
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toastr.error(t("invalid_image"));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      {" "}
      <nav className="navbar fixed-bottom p-0">
        {imagePreview && (
          <div className="position-relative mb-2">
            <img
              src={imagePreview}
              height="150px"
              className=" mx-2 border rounded-3"
            />
            <button
              onClick={removeImage}
              style={{ position: "absolute", right: "-5px", top: "-20px" }}
              className="border-0 bg-transparent text-danger fs-1"
            >
              <IoCloseCircleSharp className="bg-white rounded-circle" />
            </button>
          </div>
        )}

        {audioPreview && (
          <div className="position-relative mb-2 d-flex align-items-center gap-2">
            {/* <audio  className=""></audio> */}
            <ReactAudioPlayer controls src={audioPreview} />
            <div onClick={clearAudio}>
              <ImCross />
            </div>
          </div>
        )}

        <form
          onSubmit={handleSendMessage}
          className="d-flex justify-content-center w-100 "
        >
          <div className="p-2  w-100 d-flex gap-2 bg-white border-top shadow">
            <div className="input-group shadow w-100 border rounded rounded-4 overflow-hidden">
              <span
                className={`input-group-text bg-white border-0 fs-5 px-2 ${
                  audioPreview ? "text-primary" : "text-secondary"
                }`}
              >
                <AudioRecorder
                  onSend={(audio) => {
                    setAudioPreview(audio.url);
                    setAudioBlob(audio.blob);
                    //console.log(audio);
                  }}
                  audioPreview={audioPreview}
                  clear={clearAudio}
                />
              </span>
              <input
                type="text"
                className="form-control bg-white border-0 chati text-wrap py-2"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                className="d-none"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <span
                className={`input-group-text bg-white border-0 fs-5 px-2 ${
                  imagePreview ? "text-primary" : "text-secondary"
                }`}
                id="basic-addon1"
                onClick={() => fileInputRef.current?.click()}
              >
                <FaImage />
              </span>
            </div>
            <button
              style={{ backgroundColor: "#1dab61" }}
              className={`input-group-text border-0 rounded-circle fs-5 ${
                text || imagePreview || audioPreview ? "text-white" : "d-none"
              }`}
              id="basic-addon1"
            >
              <MdSend />
            </button>
          </div>
        </form>
      </nav>
    </>
  );
};
