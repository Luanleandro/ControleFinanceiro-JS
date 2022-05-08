const TransactionsUL = document.querySelector("#transactions");


const dummyTransactions = [
  { id: 1, name: "Bolo de brigadeiro", amount: -20 },
  { id: 2, name: "Salário", amount: 300 },
  { id: 3, name: "Torta de Frango", amount: -10 },
  { id: 4, name: "Violão", amount: 150 },
];

const addTransactionIntoDOM = (transaction) => {
  const operator = transaction.amount < 0 ? "-" : "+";
  const CSSclass = transaction.amount < 0 ? "minus" : "plus";
  const amountWithOutOperator = Math.abs(transaction.amount);
  const li = document.createElement("li");

  li.classList.add(CSSclass);
  li.innerHTML = `${transaction.name} <span>${operator} R$ ${amountWithOutOperator}</span><button class="delete-btn">x</button>`;

  TransactionsUL.prepend(li)
  console.log(TransactionsUL)
};

const init = () => {
    dummyTransactions.forEach(addTransactionIntoDOM)
}

init()