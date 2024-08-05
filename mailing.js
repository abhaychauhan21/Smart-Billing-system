// mailing.js

document.addEventListener('DOMContentLoaded', () => {
    const mailingTable = document.getElementById('mailing-table').getElementsByTagName('tbody')[0];
    let messages = JSON.parse(localStorage.getItem('messages')) || [];

    function renderTable() {
        mailingTable.innerHTML = '';
        messages.forEach((message, index) => {
            const row = mailingTable.insertRow();
            row.insertCell(0).innerText = message.id;
            row.insertCell(1).innerText = message.recipient;
            row.insertCell(2).innerText = message.type;
            row.insertCell(3).innerText = message.content;
            const actionsCell = row.insertCell(4);
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.addEventListener('click', () => {
                messages.splice(index, 1);
                saveMessages();
                renderTable();
            });
            actionsCell.appendChild(deleteBtn);
        });
    }

    function saveMessages() {
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    document.getElementById('send-message-btn').addEventListener('click', () => {
        const messageId = `MSG-${Math.floor(Math.random() * 1000)}`;
        const recipient = prompt('Enter recipient:');
        const type = prompt('Enter type (Email/SMS):');
        const content = prompt('Enter message:');
        if (recipient && type && content) {
            messages.push({ id: messageId, recipient: recipient, type: type, content: content });
            saveMessages();
            renderTable();
        } else {
            alert('Please fill in all fields.');
        }
    });

    renderTable();
});
