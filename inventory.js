document.addEventListener('DOMContentLoaded', () => {
    const inventoryTable = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    function renderTable() {
        inventoryTable.innerHTML = '';
        inventory.forEach((item, index) => {
            const row = inventoryTable.insertRow();
            row.insertCell(0).innerText = item.invoiceId;
            row.insertCell(1).innerText = item.name;
            row.insertCell(2).innerText = item.quantity;
            row.insertCell(3).innerText = `$${item.price.toFixed(2)}`;
            const actionsCell = row.insertCell(4);
            
            // Delete Button
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.addEventListener('click', () => {
                inventory.splice(index, 1);
                localStorage.setItem('inventory', JSON.stringify(inventory));
                renderTable();
            });
            actionsCell.appendChild(deleteBtn);
        });
    }

    document.getElementById('add-item-btn').addEventListener('click', () => {
        const invoiceId = prompt('Enter invoice ID:');
        const name = prompt('Enter item name:');
        const quantity = parseInt(prompt('Enter quantity:'), 10);
        const price = parseFloat(prompt('Enter price:'), 10);
        
        if (invoiceId && name && !isNaN(quantity) && !isNaN(price)) {
            inventory.push({ invoiceId, name, quantity, price });
            localStorage.setItem('inventory', JSON.stringify(inventory));
            renderTable();
        } else {
            alert('Please enter valid item details.');
        }
    });

    renderTable();
});
