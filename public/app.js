// public/app.js
document.getElementById("send").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value;
  const responseElement = document.getElementById("response");

  responseElement.textContent = "Loading...";

  try {
    const response = await fetch("http://localhost:3000/api/claude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    responseElement.textContent = data.response;
  } catch (error) {
    responseElement.textContent =
      "Error: Unable to get a response from Claude AI";
  }
});
