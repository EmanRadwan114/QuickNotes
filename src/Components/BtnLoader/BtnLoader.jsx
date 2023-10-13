import React from "react";

export default function BtnLoader() {
  return (
    <button
      type="button"
      className="btn d-block w-100 fw-bold fs-5 main-bg main-text my-3"
      disabled
    >
      <i className="fa-solid fa-spin fa-spinner"></i>
    </button>
  );
}
