// Client-Side JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    // Flag to keep track of gradient state
    let isGradientActive = false;

    // Function to toggle the gradient state
    const toggleGradient = () => {
        isGradientActive = !isGradientActive;
        console.log(isGradientActive ? 'Gradient Activated' : 'Gradient Deactivated');
    };

    // Listen for incoming messages from the server
    socket.on('receiveMessage', ({ username, text, color, imageUrl, isGradient }) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');

        const usernameElement = document.createElement('div');
        usernameElement.classList.add('username');

        // Apply gradient if enabled either by server or by console command
        if (isGradient || isGradientActive) {
            usernameElement.style.background = "linear-gradient(90deg, #ff7e5f, #feb47b)";
            usernameElement.style.backgroundClip = "text";  // Modern browsers
            usernameElement.style.webkitBackgroundClip = "text";  // Safari and Chrome
            usernameElement.style.color = "transparent";  // Make text transparent to show gradient
        } else {
            usernameElement.style.color = color;  // Use provided color if no gradient
        }

        usernameElement.textContent = `${username}:`;

        const messageTextElement = document.createElement('div');
        messageTextElement.classList.add('text');
        messageTextElement.textContent = text;

        messageElement.appendChild(usernameElement);
        messageElement.appendChild(messageTextElement);

        if (imageUrl) {
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.alt = "User Image";
            imageElement.style.maxWidth = "200px";
            imageElement.style.marginTop = "5px";
            messageElement.appendChild(imageElement);
        }

        document.getElementById('chatBox').appendChild(messageElement);
    });

    // Expose the toggle function to the console
    window.toggleGradient = toggleGradient;
});


// To ensure chat box scrolls down when new messages come
const chatBox = document.getElementById('chatBox');
chatBox.scrollTop = chatBox.scrollHeight;
