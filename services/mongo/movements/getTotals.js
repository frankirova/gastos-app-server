const getMovements = require("./getMovements");
const resetExpenses = require("./resetExpenses");
const saveMonthlyExpenses = require("./saveMothlyExpenses");

async function getTotals(id) {
  const movements = await getMovements(id);
  console.log(movements)
  console.log(id)

  const totalIncome = movements
    .filter((movement) => movement.group === "income")
    .reduce((total, movement) => total + Number(movement.amount), 0);

  const totalExpense = movements
    .filter((movement) => movement.group === "expense")
    .reduce((total, movement) => total + Number(movement.amount), 0);

  const saldo = totalIncome - totalExpense;
  const currentDate = new Date();

  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  if (currentDate.getDate() === lastDayOfMonth) {
    await saveMonthlyExpenses(totalExpense);
    await resetExpenses();
  }
  return {
    totalIncome,
    totalExpense,
    saldo,
  };
}
module.exports = getTotals;
