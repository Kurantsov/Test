async function responseToServer() {
  const request = await fetch("https://www.mrsoft.by/data.json");
  const data = (await request.json()).data;
  return data;
}

function lengthFilter(input, output, data) {
  let result = [];
  const inputValue = parseInt(input.value);
  if (isNaN(inputValue)) {
    output.innerHTML =
      "Введите число, если хотите восользоваться сортировкой по колличеству символов.";
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].length > inputValue) {
        result.push(data[i]);
      }
    }
    output.innerHTML = result;
  }
}

function substringFilter(input, output, checkbox, data) {
  let result = [];
  const inputValue = input.value;
  if (checkbox.checked) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].includes(inputValue) === true) {
        result.push(data[i]);
      }
    }
    output.innerHTML = result;
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].toUpperCase().includes(inputValue.toUpperCase()) === true) {
        result.push(data[i]);
      }
    }
    output.innerHTML = result;
  }
}

async function addWordsToOutput(data) {
  const information = await data;
  const output = document.querySelector(".output");
  const checkbox = document.querySelector(".checkbox");
  const input = document.querySelector(".input");
  const length_filter = document.querySelector(".length_filter");
  const substring_filter = document.querySelector(".substring_filter");
  length_filter.onclick = () => {
    lengthFilter(input, output, information);
  };
  substring_filter.onclick = () => {
    substringFilter(input, output, checkbox, information);
  };
}

addWordsToOutput(responseToServer());
