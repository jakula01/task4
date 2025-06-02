import React from "react";

export default function ErrorAlert({ message }) {
  if (!message) return null;
  return (
    <div className="alert alert-danger text-center" role="alert">
      {message}
    </div>
  );
}
