document.addEventListener('DOMContentLoaded', () => {
    const paymentsTable = document.getElementById('payments-table').getElementsByTagName('tbody')[0];
    const payments = JSON.parse(localStorage.getItem('payments')) || [];

    function renderTable() {
        paymentsTable.innerHTML = '';
        payments.forEach((payment, index) => {
            const row = paymentsTable.insertRow();
            row.insertCell(0).innerText = payment.id;
            row.insertCell(1).innerText = payment.clientName;
            row.insertCell(2).innerText = `$${payment.amount.toFixed(2)}`;
            row.insertCell(3).innerText = payment.status;
            const actionsCell = row.insertCell(4);
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.addEventListener('click', () => {
                payments.splice(index, 1);
                localStorage.setItem('payments', JSON.stringify(payments));
                renderTable();
            });
            actionsCell.appendChild(deleteBtn);
        });
    }

    function handlePaymentMethod(method) {
        alert(`Payment via ${method} selected.`);
        // Implement further logic for payment processing if required.
    }

    document.getElementById('pay-upi-btn').addEventListener('click', () => handlePaymentMethod('UPI'));
    document.getElementById('pay-card-btn').addEventListener('click', () => handlePaymentMethod('Credit/Debit Card'));
    document.getElementById('pay-netbanking-btn').addEventListener('click', () => handlePaymentMethod('Net Banking'));
    document.getElementById('pay-neft-btn').addEventListener('click', () => handlePaymentMethod('NEFT'));

    renderTable();
});
