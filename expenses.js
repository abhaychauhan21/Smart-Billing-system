// expenses.js

document.addEventListener('DOMContentLoaded', () => {
    const addExpenseBtn = document.getElementById('add-expense-btn');
    const expenseTable = document.getElementById('expense-list');

    // Load expenses from localStorage on page load
    loadExpenses();

    if (addExpenseBtn) {
        addExpenseBtn.addEventListener('click', () => {
            const description = document.getElementById('expense-description').value;
            const amount = document.getElementById('expense-amount').value;
            const date = document.getElementById('expense-date').value;

            if (description && amount && date) {
                const expense = {
                    id: Date.now(),
                    description,
                    amount,
                    date
                };

                // Save the expense to localStorage
                saveExpense(expense);

                // Add the expense to the table
                addExpenseToTable(expense);

                // Clear input fields
                document.getElementById('expense-description').value = '';
                document.getElementById('expense-amount').value = '';
                document.getElementById('expense-date').value = '';
            } else {
                alert('Please fill out all fields.');
            }
        });

        // Handle deletion of expense rows
        expenseTable.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('delete-btn')) {
                const row = e.target.parentElement.parentElement;
                const expenseId = row.cells[0].textContent;

                // Remove expense from localStorage
                removeExpense(expenseId);

                // Remove the row from the table
                row.remove();
            }
        });
    }

    function saveExpense(expense) {
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function loadExpenses() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.forEach(expense => addExpenseToTable(expense));
    }

    function addExpenseToTable(expense) {
        const row = expenseTable.insertRow();
        row.insertCell(0).textContent = expense.id;
        row.insertCell(1).textContent = expense.description;
        row.insertCell(2).textContent = expense.amount;
        row.insertCell(3).textContent = expense.date;
        row.insertCell(4).innerHTML = '<button class="delete-btn">Delete</button>';
    }

    function removeExpense(expenseId) {
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses = expenses.filter(expense => expense.id != expenseId);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
});

