const socket = io();
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const msgInput = document.getElementById('msg');

// Emit message to server on form submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const message = msgInput.value;
    
    socket.emit('chatMessage', message);
    
    msgInput.value = '';
    msgInput.focus();
});

// Display message from server
socket.on('message', message => {
    outputMessage(message);
    
    // Scroll down to show latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(div);
}
