import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../../Assets/imgs/writers-block-concept-illustration.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginValidationSchema, sendLoginData } from "../../Utilities/Forms";
import BtnLoader from "../BtnLoader/BtnLoader";
import ApiError from "./../ApiError/ApiError";

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { data } = await sendLoginData(values);
        if (data?.msg === "done") {
          setError(null);
          setLoading(false);
          navigate("/");
          localStorage.setItem("token", `3b8ny__${data?.token}`);
        }
      } catch (err) {
        setError(err.response.data.msg);
        setLoading(false);
      }
    },
  });
  return (
    <div className="row g-4 align-items-center login shadow py-3">
      <div className="col-lg-6">
        <div>
          <img src={img1} alt="someone who writes down creative ideas" />
          <p className="sm-text text-center">
            <a
              className="sm-text text-decoration-none text-center"
              href="https://www.freepik.com/free-vector/creative-thinking-concept-illustration_10118077.htm#page=2&query=write%20down%20ideas%20illustrations&position=44&from_view=search&track=ais"
            >
              Image by storyset
            </a>{" "}
            on Freepik
          </p>
        </div>
      </div>
      <div className="col-lg-6 ">
        <div>
          {error !== null ? <ApiError error={error}></ApiError> : ""}
          <h1 className="h3 text-center fw-bold main-text mb-4">
            Jot Down Your Quick Thoughts
          </h1>

          <form method="post" onSubmit={formik.handleSubmit}>
            <div className=" mb-3">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="form-control"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <ApiError error={formik.errors.email}></ApiError>
              ) : (
                ""
              )}
            </div>

            <div className=" mb-3">
              <input
                type="password"
                placeholder="Enter Your Password"
                className="form-control"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password ? (
                <ApiError error={formik.errors.password}></ApiError>
              ) : (
                ""
              )}
            </div>

            {isLoading ? (
              <BtnLoader />
            ) : (
              <button
                type="submit"
                className="btn d-block w-100 fw-bold fs-5 main-bg main-text my-4"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Log In
              </button>
            )}
          </form>
          <p className="text-center fs-5">
            <Link
              to="/register"
              className=" text-decoration-underline main-text fw-semibold"
            >
              Create a new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
