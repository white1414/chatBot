// API key constant
const apiKey = APIKEY;  

// Script for triggering enter key to send
var input = document.getElementById("user-input");
input.addEventListener("keypress", function(event){
  if(event.key === "Enter") {
    event.preventDefault();
    document.getElementById("sendBtn").click();
  }
})
// Script to get user input  to API server
async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
  input.value = "";

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }]
        }),
      }
    );

    const data = await response.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Hmm, no response.";
    chatBox.innerHTML += `<p><strong><p style="color:#0b03fc;">Bot:</p></strong> ${botReply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    chatBox.innerHTML += `<p style="color:red;">Error: ${error.message}</p>`;
  }
}