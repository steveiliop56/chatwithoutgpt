const chatBox = document.querySelector('.chat-box');
const form = document.querySelector('form');
const textInput = document.getElementById('text');
const clearBtn = document.getElementById('clear-btn');

// Function to add a user message to the chat box
const addUserMessage = (text) => {
  const userMessage = document.createElement('div');
  userMessage.classList.add('user-message');
  const messageContent = document.createElement('p');
  messageContent.textContent = text;
  userMessage.appendChild(messageContent);
  chatBox.appendChild(userMessage);
};

// Function to add a bot message to the chat box
const addBotMessage = (text) => {
  const botMessage = document.createElement('div');
  botMessage.classList.add('bot-message');
  const messageContent = document.createElement('p');
  messageContent.textContent = text;
  botMessage.appendChild(messageContent);
  chatBox.appendChild(botMessage);
};

// Function to generate a random session ID
const generateSessionId = () => {
  return Math.floor(Math.random() * 1000000);
};

// Event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = textInput.value;
  addUserMessage(text);
  textInput.value = '';
  const sessionId = generateSessionId();
  const url = `/get_message/?session_id=${sessionId}&text=${text}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    addBotMessage(data.message);
  });
});

clearBtn.addEventListener("click", () => {
  chatBox.innerHTML = "";
  addBotMessage("Hello! How can I help you today?");
});

function goToAdmin() {
  window.location.href = '/admin';
}