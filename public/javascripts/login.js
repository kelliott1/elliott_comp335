import React from "react";
import { createRoot } from "react-dom/client";

const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get("message");

if (message) {
  const LoginComponent = () => {
    return (
      <>
        <p>{message}</p>
      </>
    );
  };

  const login = createRoot(document.getElementById("message"));
  login.render(<LoginComponent />);
}
