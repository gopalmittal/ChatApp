
const socket = io('http://localhost:8000');

const form = document.getElementById('frm');
const messageInput = document.getElementById('inputtxt');
const messageContainer = document.querySelector('.container');
const audio=new Audio('ting.mp3')
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if( position =='left')
    {
    audio.play();
}
};
const name = prompt('Enter Your Name to Join.');
form.addEventListener('submit' , (e)=>{
      e.preventDefault();
      const message = messageInput.value;
      append(`You: ${message}`, 'right');
      socket.emit('send', message);
     messageInput.value = "";
});


socket.emit('new-user-joined', name);
socket.on('user-joined', data => {
    append(`${data} Joined The Chat`, 'left');
});
socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left');
});
socket.on('left', data => {
    append(`${data.name}: has left the Chat.`, 'left');
});