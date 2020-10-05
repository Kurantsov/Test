async function responseToServer() {
  const request = await fetch(
    "https://cors-anywhere.herokuapp.com/https://www.mrsoft.by/data.json",
    {
      method: "GET",
    }
  );
  const data = (await request.json()).data;
  return data;
}

export { responseToServer };
