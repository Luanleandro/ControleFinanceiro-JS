const TransactionsUL = document.querySelector("#transactions");
const incomeDisplay = document.querySelector("#money-plus");
const expenseDisplay = document.querySelector("#money-minus");
const balanceDisplay = document.querySelector("#balance");
const form = document.querySelector("#form");
const InputTransactionName = document.querySelector("#text");
const InputTransactionAmount = document.querySelector("#amount");
const ButtonDeleteTransaction = document.querySelector(".delete-btn");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

const removeTransaction = (ID) => {
  transactions = transactions.filter((transaction) => transaction.id !== ID);
  updateLocalStorage();
  init();
};

const addTransactionIntoDOM = (transaction) => {
  const operator = transaction.amount < 0 ? "-" : "+";
  const CSSclass = transaction.amount < 0 ? "minus" : "plus";
  const amountWithOutOperator = Math.abs(transaction.amount);
  const li = document.createElement("li");

  li.classList.add(CSSclass);
  li.innerHTML = `${transaction.name} 
  <span>${operator} R$ ${amountWithOutOperator}
  </span>
  <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
   x
  </button>`;

  TransactionsUL.append(li);
};

const updatebalanceValues = () => {
  const transactionAmounts = transactions.map(
    (transaction) => transaction.amount
  );
  const total = transactionAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);
  const income = transactionAmounts
    .filter((income) => income > 0)
    .reduce((accumulator, income) => accumulator + income, 0)
    .toFixed(2);
  const expense = Math.abs(
    transactionAmounts
      .filter((expense) => expense < 0)
      .reduce((accumulator, expense) => accumulator + expense, 0)
  ).toFixed(2);
  balanceDisplay.textContent = `R$ ${total}`;
  incomeDisplay.textContent = `R$ ${income}`;
  expenseDisplay.textContent = `R$ ${expense}`;
};

const init = () => {
  TransactionsUL.innerHTML = "";

  transactions.forEach(addTransactionIntoDOM);
  
  updatebalanceValues();
};

init();

const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

const generateID = () => Math.round(Math.random() * 1000);

const addToTransactionsArray = (transactionName, transactionAmounts) => {
  transactions.push({
    id: generateID(),
    name: transactionName,
    amount: Number(transactionAmounts),
  });
};

const cleanInputs = () => {
  InputTransactionAmount.value = "";
  InputTransactionName.value = "";
}

const handleFormSubmit = event => {
  event.preventDefault();

  const transactionName = InputTransactionName.value.trim();
  const transactionAmount = InputTransactionAmount.value.trim();
  const isSomeInputEmpty = transactionName === "" || transactionAmount === "";

  if(isSomeInputEmpty) {
    alert('Por favor, preencha tanto o nome quanto o valor da transação')
    return
  }

  addToTransactionsArray(transactionName, transactionAmount);
  init();
  updateLocalStorage();
  cleanInputs()
  
};

form.addEventListener("submit", handleFormSubmit);
