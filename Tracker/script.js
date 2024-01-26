const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");

const addExpenseBtn = document.getElementById("add-expense-btn");

const categoryInput = document.getElementById("category");

let action = "add";

const API = axios.create({
  baseURL: "http://localhost:3000/expense",
});
// "http://localhost:3000/editexpense",

addExpenseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addExpense();
});

async function getExpenses() {
  const response = await API.get("/all");
  console.log("got expenses ", response);
  return response.data;
}
function setExpenses(expensesList) {
  localStorage.setItem("expenses-list", JSON.stringify(expensesList));
  renderExpenses();
  calculateTotalExpenses();
  return expensesList;
}

// add expense
async function addExpense() {
  let amount = Number(amountInput.value);
  let description = descriptionInput.value;
  let category = categoryInput.value;

  if (!amount || !description || category === "Choose...") return;
  // console.log(amountInput.value)
  let expense = { amount, description, category };
  let response;
  if (action === "add") {
    response = API.post("/add", expense);
  } else {
    const expenseId = +action.split("#")[1];
    response = await API.put(`/edit/${expenseId}`, expense);
  }

  renderExpenses();
  // Clear the form fields
  amountInput.value = "";
  descriptionInput.value = "";
  categoryInput.value = "";

  console.log(response);
}

// delete expense
function deleteExpense(expense) {
  // const expensesList = getExpenses();
  // const filteredExpenses = expensesList.filter((item) => {
  //   return item.id !== expense.id;
  // });
  // setExpenses(filteredExpenses);
}

function editForm(expense) {
  console.log(expense);
  amountInput.value = expense.amount;
  descriptionInput.value = expense.description;
  categoryInput.value = expense.category;
  action = `edit#${expense.id}`;
}
// edit expenses
// async function editExpense(expense) {
//   // amountInput.value = expense.amount;
//   // descriptionInput.value = expense.description;
//   // categoryInput.value = expense.category;
//   // deleteExpense(expense);

//   const response = await API.get(`/edit/${}`);
// }

const list = document.getElementById("expenses-list");

async function renderExpenses() {
  const expensesList = await getExpenses();
  list.innerHTML = "";
  if (expensesList.length) {
    expensesList.forEach((expense) => {
      const listItem = document.createElement("li");
      listItem.className =
        "list-group-item d-flex justify-content-between align-items-center gap-3";

      listItem.innerHTML = `
        <span class="col">${expense.category}</span>
        <span class="col">Rs. ${expense.amount}</span>
        <p class="col">${expense.description} </p>
        <div class="btn-group">
          <button class="btn btn-primary col w-50" id="delete-btn">Delete</button>
          <button class="btn btn-success col" id="edit-btn">Edit</button>
        </div>`;

      listItem.querySelector("#delete-btn").addEventListener("click", (e) => {
        e.preventDefault();
        deleteExpense(expense);
      });
      listItem.querySelector("#edit-btn").addEventListener("click", (e) => {
        e.preventDefault();
        editForm(expense);
      });

      list.appendChild(listItem);
    });
  } else {
    const listItem = document.createElement("li");
    listItem.textContent = "There is no any expense😎";
    listItem.className =
      "fs-5 list-group-item d-flex justify-content-between align-items-center";
    list.appendChild(listItem);
  }
}
function calculateTotalExpenses() {
  const expensesList = getExpenses();
  const totalExpense = expensesList.reduce((accu, item) => {
    accu += Number(item.amount);
    console.log(accu);
    return accu;
  }, 0);

  const totalExpenseElement = document.getElementById("total-expense");
  totalExpenseElement.innerHTML = "";
  console.log(totalExpense);
  totalExpenseElement.textContent = `Rs. ${totalExpense}`;
  //    console.log(totalExpenseElement)
}

renderExpenses();

// var expenses = [
//     { id: 1, amount: 50.00, description: "Groceries", category: "shopping" },
//     { id: 2, amount: 25.00, description: "Dinner at a restaurant", category: "food" },
//     { id: 3, amount: 12.50, description: "Movie tickets", category: "movie" },
//     { id: 4, amount: 100.00, description: "Weekend getaway", category: "travel" },
//     { id: 5, amount: 30.00, description: "Clothing shopping", category: "shopping" },
//     { id: 6, amount: 15.00, description: "Lunch at a cafe", category: "food" },
//     { id: 7, amount: 8.00, description: "Snacks for the road trip", category: "food" },
//     { id: 8, amount: 60.00, description: "Concert tickets", category: "entertainment" },
//     { id: 9, amount: 75.00, description: "Hotel stay", category: "travel" },
//     { id: 10, amount: 40.00, description: "Home theater system", category: "shopping" },
//     { id: 11, amount: 20.00, description: "Dinner with friends", category: "food" },
//     { id: 12, amount: 9.99, description: "Online streaming subscription", category: "entertainment" },
//     { id: 13, amount: 55.00, description: "Gas for road trip", category: "travel" },
//     { id: 14, amount: 18.00, description: "Coffee and snacks", category: "food" },
//     { id: 15, amount: 120.00, description: "Birthday gift", category: "shopping" },
//     { id: 16, amount: 10.00, description: "Ice cream outing", category: "food" },
//     { id: 17, amount: 45.00, description: "Museum tickets", category: "entertainment" },
//     { id: 18, amount: 70.00, description: "Hotel booking for vacation", category: "travel" },
//     { id: 19, amount: 22.00, description: "Office supplies", category: "shopping" },
//     { id: 20, amount: 15.00, description: "Fast food lunch", category: "food" }
// ];

// setExpenses(expenses);

// renderExpenses();
// calculateTotalExpenses();

// getExpenses();
