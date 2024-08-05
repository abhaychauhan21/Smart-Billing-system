document.addEventListener('DOMContentLoaded', () => {
    const invoicesTable = document.getElementById('invoices-table').getElementsByTagName('tbody')[0];
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    function renderTable() {
        invoicesTable.innerHTML = '';
        invoices.forEach((invoice, index) => {
            const row = invoicesTable.insertRow();
            row.insertCell(0).innerText = invoice.id;
            row.insertCell(1).innerText = invoice.clientName;
            row.insertCell(2).innerText = `$${invoice.amount.toFixed(2)}`;
            row.insertCell(3).innerText = invoice.date;
            row.insertCell(4).innerText = invoice.status;
            const actionsCell = row.insertCell(5);
            
            // Print Button
            const printBtn = document.createElement('button');
            printBtn.innerText = 'Print';
            printBtn.addEventListener('click', () => printInvoice(invoice));
            actionsCell.appendChild(printBtn);

            // Delete Button
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.addEventListener('click', () => {
                invoices.splice(index, 1);
                localStorage.setItem('invoices', JSON.stringify(invoices));
                renderTable();
            });
            actionsCell.appendChild(deleteBtn);
        });
    }

    function getInvoiceItems(invoiceId) {
        return inventory.filter(item => item.invoiceId === invoiceId);
    }

    function printInvoice(invoice) {
        const items = getInvoiceItems(invoice.id);
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.open();
        printWindow.document.write(`
            <html>
            <head>
                <title>Print Invoice</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .invoice { border: 1px solid #ddd; padding: 20px; margin: 20px; }
                    .invoice h2 { margin-top: 0; }
                    .invoice table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    .invoice th, .invoice td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    .invoice th { background-color: #f4f4f4; }
                </style>
            </head>
            <body>
                <div class="invoice">
                    <h2>Invoice #${invoice.id}</h2>
                    <p><strong>Client Name:</strong> ${invoice.clientName}</p>
                    <p><strong>Amount:</strong> $${invoice.amount.toFixed(2)}</p>
                    <p><strong>Date:</strong> ${invoice.date}</p>
                    <p><strong>Status:</strong> ${invoice.status}</p>
                    <h3>Items</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${items.map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td>${item.quantity}</td>
                                    <td>$${item.price.toFixed(2)}</td>
                                    <td>$${(item.quantity * item.price).toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <script>
                    window.print();
                    window.onafterprint = function() { window.close(); };
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }

    function printAllInvoices() {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.open();
        printWindow.document.write(`
            <html>
            <head>
                <title>Print All Invoices</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .invoice { border: 1px solid #ddd; padding: 20px; margin: 20px; }
                    .invoice h2 { margin-top: 0; }
                    .invoice table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    .invoice th, .invoice td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    .invoice th { background-color: #f4f4f4; }
                </style>
            </head>
            <body>
                <h1>All Invoices</h1>
                ${invoices.map(invoice => {
                    const items = getInvoiceItems(invoice.id);
                    return `
                        <div class="invoice">
                            <h2>Invoice #${invoice.id}</h2>
                            <p><strong>Client Name:</strong> ${invoice.clientName}</p>
                            <p><strong>Amount:</strong> $${invoice.amount.toFixed(2)}</p>
                            <p><strong>Date:</strong> ${invoice.date}</p>
                            <p><strong>Status:</strong> ${invoice.status}</p>
                            <h3>Items</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${items.map(item => `
                                        <tr>
                                            <td>${item.name}</td>
                                            <td>${item.quantity}</td>
                                            <td>$${item.price.toFixed(2)}</td>
                                            <td>$${(item.quantity * item.price).toFixed(2)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    `;
                }).join('')}
                <script>
                    window.print();
                    window.onafterprint = function() { window.close(); };
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }

    document.getElementById('add-invoice-btn').addEventListener('click', () => {
        const invoiceId = `INV-${Math.floor(Math.random() * 1000)}`;
        const clientName = prompt('Enter client name:');
        const amount = parseFloat(prompt('Enter amount:'), 10);
        const date = prompt('Enter date:');
        const status = prompt('Enter status:');
        
        if (clientName && !isNaN(amount) && date && status) {
            invoices.push({ id: invoiceId, clientName: clientName, amount: amount, date: date, status: status });
            localStorage.setItem('invoices', JSON.stringify(invoices));
            renderTable();
        } else {
            alert('Please enter valid invoice details.');
        }
    });

    document.getElementById('print-all-btn').addEventListener('click', printAllInvoices);

    renderTable();
});
