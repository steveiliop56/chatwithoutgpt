const messageInput = document.querySelector('.chat-input input[type="text"]');
const messageList = document.querySelector('.chat-messages');
const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

document.querySelector('.chat-input button').addEventListener('click', (event) => {
    event.preventDefault();

    // Get the message text from the input element
    const messageText = messageInput.value.trim();

    // Only proceed if the message text is not empty
    if (messageText !== '') {
        // Create a new user message element
        const userMessageElem = document.createElement('div');
        userMessageElem.classList.add('message', 'user-message', 'message-right');
        const userMessageTextElem = document.createElement('p');
        userMessageTextElem.textContent = messageText;
        userMessageElem.appendChild(userMessageTextElem);
        messageList.appendChild(userMessageElem);

        // Clear the input element
        messageInput.value = '';

        // Send the message to the Django backend
        fetch('/get_message/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({ message: messageText })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Create a new bot message element
            const botMessageElem = document.createElement('div');
            botMessageElem.classList.add('message', 'bot-message');
            const botMessageTextElem = document.createElement('p');
            botMessageTextElem.textContent = data.bot_message;
            botMessageElem.appendChild(botMessageTextElem);
            messageList.appendChild(botMessageElem);

            // Scroll the message list to the bottom
            messageList.scrollTop = messageList.scrollHeight;
        })
        .catch(error => {
            console.error('There was a problem sending the message:', error);
        });
    }
});
