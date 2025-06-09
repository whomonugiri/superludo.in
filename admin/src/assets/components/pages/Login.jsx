import { useSelector } from "react-redux";
import { PostForm } from "../elements/PostForm";
import { useEffect } from "react";

export const Login = () => {
  return (
    <>
      <section className="min-vh-100 d-flex align-items-center justify-content-center bg-wave">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
              <div className="card z-index-0 shadow border">
                <div className="card-header py-1 pt-3 px-3 text-center">
                  <h5>Admin Panel</h5>
                </div>

                <div className="card-body py-1 pb-3 px-3">
                  <PostForm
                    action="/verifyLogin"
                    subBtn="Log In"
                    subBtnClass="btn bg-gradient-dark w-100 mb-2"
                    loaderColor="white"
                  >
                    <div className="mb-3">
                      <input
                        type="email"
                        name="emailId"
                        className="form-control"
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="email-addon"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="password-addon"
                        autoComplete=""
                      />
                    </div>
                  </PostForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
