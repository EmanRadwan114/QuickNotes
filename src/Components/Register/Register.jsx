import React, { useState } from "react";
import img1 from "../../Assets/imgs/creative-thinking-concept-illustration.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { sendRegisterData, validationSchema } from "../../Utilities/Forms";
import ApiError from "../ApiError/ApiError";
import BtnLoader from "../BtnLoader/BtnLoader";

export default function Register() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { data } = await sendRegisterData(values);
        if (data?.msg === "done") {
          setError(null);
          setLoading(false);
          navigate("/");
        }
      } catch (err) {
        setError(err.response.data.msg);
        setLoading(false);
      }
    },
  });

  return (
    <div className="row g-4 align-items-center shadow">
      <div className="col-lg-6">
        <div>
          <img
            src={img1}
            alt="someone who writes down creative ideas"
            className="w-100"
          />
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
      <div className="col-lg-6">
        <div>
          {error !== null ? <ApiError error={error}></ApiError> : ""}
          <h1 className="h3 text-center fw-bold main-text mb-4">
            Create an Account
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <div className=" mb-3">
              <input
                type="text"
                placeholder="Enter Your Name"
                className="form-control"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name ? (
                <ApiError error={formik.errors.name}></ApiError>
              ) : (
                ""
              )}
            </div>

            <div className=" mb-3">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="form-control"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="email"
                id="email"
                value={formik.values.email}
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
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="password"
                id="password"
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? (
                <ApiError error={formik.errors.password}></ApiError>
              ) : (
                ""
              )}
            </div>

            <div className=" mb-3">
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter Your Age"
                className="form-control"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="age"
                id="age"
                value={formik.values.age}
              />
              {formik.errors.age && formik.touched.age ? (
                <ApiError error={formik.errors.age}></ApiError>
              ) : (
                ""
              )}
            </div>

            <div className=" mb-3">
              <input
                type="tel"
                placeholder="Enter Your Phone Number"
                className="form-control"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="phone"
                id="phone"
                value={formik.values.phone}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <ApiError error={formik.errors.phone}></ApiError>
              ) : (
                ""
              )}
            </div>
            {isLoading ? (
              <BtnLoader />
            ) : (
              <button
                type="submit"
                className="btn d-block w-100 fw-bold fs-5 main-bg main-text my-3"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Register
              </button>
            )}
          </form>
          <p className="text-center fs-5">
            <Link
              to="/login"
              className=" text-decoration-underline main-text fw-semibold"
            >
              Already have an Account?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
