const transactions = []; // Array para armazenar as transações

// Elementos do DOM
const incomeElement = document.getElementById("income");
const expensesElement = document.getElementById("expenses");
const balanceElement = document.getElementById("balance");
const transactionsElement = document.getElementById("transactions");

// Formulário de submissão
document.getElementById("transactionsForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Coleta os valores do formulário
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);

    // Validação dos valores
    if (description && !isNaN(amount) && amount !== 0) {
        const transaction = { description, amount };
        transactions.push(transaction); // Adiciona ao array
        updateUI(); // Atualiza a interface
    } else {
        alert("Por favor, insira uma descrição e um valor válido (não zero).");
    }

    this.reset(); // Reseta o formulário
});

// Atualiza a interface do usuário
function updateUI() {
    let income = 0, expenses = 0;

    // Limpa a tabela antes de redesenhar
    transactionsElement.innerHTML = "";

    // Itera sobre as transações para montar a tabela
    transactions.forEach((transaction, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>${transaction.amount > 0 ? "R$ " + transaction.amount.toFixed(2) : "-R$ " + Math.abs(transaction.amount).toFixed(2)}</td>
            <td><button onclick="removeTransaction(${index})">Remover</button></td>
        `;

        transactionsElement.appendChild(row);

        // Soma receitas e despesas
        if (transaction.amount > 0) {
            income += transaction.amount;
        } else {
            expenses += transaction.amount;
        }
    });

    // Atualiza os elementos de resumo
    incomeElement.textContent = income.toFixed(2);
    expensesElement.textContent = Math.abs(expenses).toFixed(2);
    balanceElement.textContent = (income + expenses).toFixed(2);
}

// Remove uma transação
function removeTransaction(index) {
    transactions.splice(index, 1); // Remove do array
    updateUI(); // Atualiza a interface
}