import React from "react";
import { createRoot } from "react-dom/client";

const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get("error");

if (message) {
  const SignupComponent = () => {
    return (
      <>
        <p>{message}. Use different user name!</p>
      </>
    );
  };

  const signup = createRoot(document.getElementById("message"));
  signup.render(<SignupComponent />);
}
