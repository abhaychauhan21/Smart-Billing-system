document.addEventListener('DOMContentLoaded', () => {
    const customersTable = document.getElementById('customers-table').getElementsByTagName('tbody')[0];
    const customers = JSON.parse(localStorage.getItem('customers')) || [];

    function renderTable() {
        customersTable.innerHTML = '';
        customers.forEach((customer, index) => {
            const row = customersTable.insertRow();
            row.insertCell(0).innerText = customer.id;
            row.insertCell(1).innerText = customer.name;
            row.insertCell(2).innerText = customer.email;
            row.insertCell(3).innerText = customer.phone;
            row.insertCell(4).innerText = customer.address;
            const actionsCell = row.insertCell(5);
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.addEventListener('click', () => {
                customers.splice(index, 1);
                localStorage.setItem('customers', JSON.stringify(customers));
                renderTable();
            });
            actionsCell.appendChild(deleteBtn);
        });
    }

    document.getElementById('add-customer-btn').addEventListener('click', () => {
        const customerId = `CUST-${Math.floor(Math.random() * 1000)}`;
        const name = prompt('Enter customer name:');
        const email = prompt('Enter customer email:');
        const phone = prompt('Enter customer phone:');
        const address = prompt('Enter customer address:');
        
        if (name && email && phone && address) {
            customers.push({ id: customerId, name: name, email: email, phone: phone, address: address });
            localStorage.setItem('customers', JSON.stringify(customers));
            renderTable();
        } else {
            alert('Please enter valid customer details.');
        }
    });

    renderTable();
});
