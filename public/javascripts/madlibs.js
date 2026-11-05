import React from "react";
import { createRoot } from "react-dom/client";

const FormComponent = () => {
  //const [formData, setFormData] = React.useState({ first: 'Tim', last: 'Berners-Lee' });
  const [formData, setFormData] = React.useState({
    clothes: "",
    fPerson1: "",
    fPerson2: "",
    mPerson1: "",
    mPerson2: "",
    plural: "",
  });
  const [message, setMessage] = React.useState(null); // initialize it as an empty object

  // When you click submit button, sendStuff runs
  // Send formData to the server using fetch('/form').
  const sendStuff = async (event) => {
    event.preventDefault(); // prevent form default event which refreshes the page
    try {
      const response = await fetch("/madlibs", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setMessage(await response.json()); // assuming response is JSON
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  /* As you type handleChange runs immediately
    React grabs your keystroke, updates the formData state object, and 
    re-renders the component so the letters show up in the box.
    value is tied to formData.first and formData.last
  */
  // de-structure the event object directly in the function parameters
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Alternative way (longer version)
  /*
  const handleChange = (event) => {
    const name = event.target.name; // "name" is from HTML input tag attribute to identify first or last
    const value = event.target.value;
    setFormData((prev) => {
      const updatedFormData = { ...prev };  // Spread the previous state
      updatedFormData[name] = value;   // Update the property corresponding to the provided name with the new value
      return updatedFormData; // Return the updated state
    });
  };*/

  /* Note that.....
  In React, state objects should be treated as immutable (you shouldn't modify the existing state directly). 
  Also, when you call setFormData, React does not merge your new changes with the old state automatically
  it completely replaces the old state object with whatever new object you provide.

  Spreading previous state means taking all the existing key-value pairs inside an object and 
  copying them over into a brand-new object using JavaScript's Spread Operator (...)
  This is same as python's spread operator 
  Python uses an asterisk (*) for lists and tuples, and a double asterisk (**) for dictionaries
  Kotlin has a spread operator same as python (*), more restritive though
  */

  return (
    <div>
      <form method="post" onSubmit={sendStuff}>
        <label> Uniform of the day: </label>{" "}
        <input
          type="text"
          name="clothes"
          placeholder="e.g. red shirt"
          value={formData.clothes}
          onChange={handleChange}
        />
        <br />
        <br />
        <label> Woman of Trek 1: </label>{" "}
        <input
          type="text"
          name="fPerson1"
          placeholder="Janeway"
          value={formData.fPerson1}
          onChange={handleChange}
        />
        <br />
        <br />
        <label> Woman of Trek 2: </label>{" "}
        <input
          type="text"
          name="fPerson2"
          placeholder="Uhura"
          value={formData.fPerson2}
          onChange={handleChange}
        />
        <br />
        <br />
        <label> Man of Trek 1: </label>{" "}
        <input
          type="text"
          name="mPerson1"
          placeholder="Harry Kim"
          value={formData.mPerson1}
          onChange={handleChange}
        />
        <br />
        <br />
        <label> Man of Trek 2: </label>{" "}
        <input
          type="text"
          name="mPerson2"
          placeholder="James T. Kirk"
          value={formData.mPerson2}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Plural noun: </label>{" "}
        <input
          type="text"
          name="plural"
          placeholder="planets"
          value={formData.plural}
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="submit" value="See the Results!!"></input>
      </form>

      {message && (
        <>
          <img src="/images/trek.jpg" alt="LLAP" style={{ width: "75px" }} />
          <p>
            One day, <strong>{message.fPerson1}</strong> put on some{" "}
            <strong>{message.clothes}</strong> and went to visit{" "}
            <strong>{message.mPerson1}</strong>. When they arrived,{" "}
            <strong>{message.fPerson2}</strong> and{" "}
            <strong>{message.mPerson2}</strong> were already there, surrounded
            by hundreds of <strong>{message.plural}</strong>!
          </p>
        </>
      )}
    </div>
  );
};

const form = createRoot(document.getElementById("form"));
form.render(<FormComponent />);
