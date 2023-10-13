import React from "react";

export default function ApiError({ error }) {
  return (
    <p className="alert text-capitalize alert-danger m-0 py-1 px-2 mb-3 mt-2 text-center">
      {error}
    </p>
  );
}
