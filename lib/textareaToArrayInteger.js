function toArrayInteger(textAreaValue) {
  const array = [];
  const string = "";
  for (const item of textAreaValue) {
    if (!isNaN(parseInt(item))) {
      string = string + item;
    } else {
      if (!string == "") {
        array.push(parseInt(string));
      }

      string = "";
    }
  }

  if (!isNaN(parseInt(string))) {
    array.push(parseInt(string));
  }

  return array;
}

export default toArrayInteger;
