import React, { useState } from "react";
import "./form.css";
export default function Alert({ show, msg }) {
  return <>{show && <div className="alert">{msg}</div>}</>;
}
