import { useRef, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";

import { FaImage } from "react-icons/fa6";
import { MdEmojiEmotions, MdSend } from "react-icons/md";
import toastr from "toastr";
import axios from "axios";
import { base } from "../../../utils/api.manager";
import ReactAudioPlayer from "react-audio-player";
import { ImCross } from "react-icons/im";
import AudioRecorder from "./AudioRecorder";

export const ChatInput = ({ user }) => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const clearAudio = () => {
    setAudioPreview(null);
    setAudioBlob(null);
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview && !audioPreview) return;

    try {
      const data = {};
      data._token = localStorage.getItem("_token");
      data._deviceId = localStorage.getItem("_deviceId");
      data.userId = user._id;
      data.mobileNumber = user.mobileNumber;

      (data.text = text.trim()), (data.image = imagePreview), setText("");

      const formData = new FormData();

      formData.append("mobileNumber", user.mobileNumber);

      formData.append("_token", data._token);
      formData.append("_deviceId", data._deviceId);
      formData.append("text", data.text);
      formData.append("image", data.image);
      formData.append("userId", user._id);
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

      const res = await axios.post(base("/sendMsg"), formData);

      if (res.data.success) {
      } else {
        toastr.error(res.data.message);
      }
    } catch (error) {
      toastr.error(error.response ? error.response.data : error.message);
    }
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toastr.error(invalid_image);
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
      <nav className="p-0 position-relative">
        {imagePreview && (
          <div className="position-absolute" style={{ top: "-160px" }}>
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
                    console.log(audio);
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
