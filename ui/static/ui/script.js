const chatBox = document.querySelector('.chat-box');
const form = document.querySelector('form');
const textInput = document.getElementById('text');
const clearBtn = document.getElementById('clear-btn');
const cookieNotification = document.getElementById('cookie-notification');
const cookieAccept = document.getElementById('cookie-button');

// Check if the notification has been displayed before
if (!localStorage.getItem('cookie-notification-displayed')) {
  // Display the notification
  cookieNotification.style.display = 'block';

  // Add an event listener to the "Accept" button
  cookieAccept.addEventListener('click', () => {
    // Hide the notification
    cookieNotification.style.display = 'none';

    // Set the flag indicating that the notification has been displayed
    localStorage.setItem('cookie-notification-displayed', true);
  });
}


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

// Function to get or generate session ID
const getSessionId = () => {
  let sessionId = window.sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = generateSessionId();
    window.sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

// Event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = textInput.value;
  addUserMessage(text);
  textInput.value = '';
  const sessionId = getSessionId();
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

// Event listener for the toggle sidebar button
const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
const sidebar = document.querySelector('.sidebar');

toggleSidebarBtn.addEventListener('click', function() {
  sidebar.classList.toggle('hidden');
});
