async function request() {
  const request = fetch(
    "https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/908622995/tracks",
    {
      method: "GET",
    }
  );
  const response = await request;
  const responseData = (await response.json()).data;
  for (let i = 0; i < responseData.length; i++) {
    responseData[i].likes = 0;
  }
  localStorage.setItem("sessionID", JSON.stringify(responseData));
  return responseData;
}
export { request };
