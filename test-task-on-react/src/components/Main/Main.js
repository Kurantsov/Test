import React, { useState } from "react";
import { responseToServer } from "./LogicMainService";

function Main() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("OutputText");
  const [checkbox, setCheckbox] = useState(false);

  function inputHandler(event) {
    setInputText(event.target.value);
  }
  async function lengthFilter() {
    const inputValue = Number(inputText);
    let result = [];
    if (isNaN(inputValue)) {
      setOutputText(
        "Введите число, если хотите восользоваться сортировкой по колличеству символов."
      );
    } else {
      const responseData = await responseToServer();
      for (let i = 0; i < responseData.length; i++) {
        if (responseData[i].length > inputValue) {
          result.push(responseData[i], " ");
        }
      }
      setOutputText(result);
    }
  }

  function checkboxHandler() {
    setCheckbox(!checkbox);
  }

  async function substringFilter() {
    const responseData = await responseToServer();
    let result = [];
    if (checkbox) {
      for (let i = 0; i < responseData.length; i++) {
        if (responseData[i].includes(inputText) === true) {
          result.push(responseData[i], " ");
        }
      }
      setOutputText(result);
    } else {
      for (let i = 0; i < responseData.length; i++) {
        if (
          responseData[i].toUpperCase().includes(inputText.toUpperCase()) ===
          true
        ) {
          result.push(responseData[i], " ");
        }
      }
      setOutputText(result);
    }
  }
  return (
    <div>
      <input type="text" onChange={inputHandler} />
      <input type="checkbox" onChange={checkboxHandler} />
      <input type="button" value="length" onClick={lengthFilter} />
      <input type="button" value="substring" onClick={substringFilter} />
      <div>{outputText}</div>
    </div>
  );
}

export default Main;
