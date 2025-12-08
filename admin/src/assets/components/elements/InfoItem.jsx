import { Link } from "react-router-dom";
import { formatTimestamp, singleFetcher } from "../../../utils/api.manager";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { PostForm } from "./PostForm";

export const InfoItem = ({ info }) => {
  return (
    <>
      <div className="bg-white p-3 border shadow-sm rounded my-2">
        <div className="fw-bold small text-dark">{info.title}</div>

        <PostForm
          action="/updateInfo"
          subBtn="UPDATE MESSAGE"
          subBtnClass="btn bg-gradient-primary mt-3 w-100 mb-2"
          loaderColor="white"
        >
          <input type="hidden" name="_id" value={info._id} />
          <input type="hidden" name="title" value={info.title} />
          <div className="small mt-2 d-flex gap-3">
            <div className="w-100">
              <div className="text-primary">In English Language</div>
              <textarea
                name="englishText"
                className="form-control"
                defaultValue={info.englishText}
              ></textarea>
            </div>
            <div className="w-100">
              <div className="text-danger">In Hindi Language</div>
              <textarea
                name="hindiText"
                className="form-control"
                defaultValue={info.hindiText}
              ></textarea>
            </div>
          </div>
        </PostForm>
      </div>
    </>
  );
};
