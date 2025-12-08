import { useState, useRef } from "react";
import { FaMicrophone } from "react-icons/fa6";
import { FaRegStopCircle } from "react-icons/fa";

const AudioRecorder = ({ onSend, audioPreview, clear }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    clear();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        console.log("audio stopped");
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        console.log("just created blob", audioBlob);
        const audioURL = URL.createObjectURL(audioBlob);
        console.log("just created audio url", audioURL);
        onSend({ blob: audioBlob, url: audioURL });
        setAudioBlob(audioBlob);
        setAudioURL(audioURL);
        audioChunksRef.current = [];
        // sendAudio();
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudio = () => {
    console.log("sendAudio triggered", audioBlob, onSend);
    if (audioBlob && onSend) {
      console.log("sending the on send from recorder");

      onSend({ blob: audioBlob, url: audioURL }); // You can extend this to upload the file
      setAudioBlob(null);
      setAudioURL(null);
    }
  };

  return (
    <div className="">
      <button
        type="button"
        onClick={isRecording ? stopRecording : startRecording}
        className={`border-0 p-0 bg-transparent ${
          audioPreview ? "text-primary" : "text-secondary"
        }`}
      >
        {isRecording ? (
          <span className="text-danger">
            <FaRegStopCircle />{" "}
            <span
              className="xs-small animate__flash animate__slow animate__infinite animate__animated"
              style={{ fontSize: "12px" }}
            >
              listening...
            </span>
          </span>
        ) : (
          <FaMicrophone />
        )}
      </button>

      {/* {audioURL && (
        <div className="mt-4">
          <audio controls src={audioURL}></audio>
          <button
            onClick={sendAudio}
            className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            Send Audio
          </button>
        </div>
      )} */}
    </div>
  );
};

export default AudioRecorder;
