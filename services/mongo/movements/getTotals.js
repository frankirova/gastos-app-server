const getMovements = require("./getMovements");
const resetExpenses = require("./resetExpenses");
const saveMonthlyExpenses = require("./saveMothlyExpenses");

async function getTotals() {
  const movements = await getMovements();
  const totalIncome = movements
    .filter((movement) => movement.group === "income")
    .reduce((total, movement) => total + Number(movement.amount), 0);

  const totalExpense = movements
    .filter((movement) => movement.group === "expense")
    .reduce((total, movement) => total + Number(movement.amount), 0);

  const saldo = totalIncome - totalExpense;
   // Obtén la fecha actual
   const currentDate = new Date();

   // Comprueba si es el último día del mes
   const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
   if (currentDate.getDate() === lastDayOfMonth) {
     // Guarda los gastos acumulados en una nueva ruta en la base de datos
     await saveMonthlyExpenses(totalExpense);
 
     // Reinicia el contador de gastos
     await resetExpenses();
   }
  return {
    totalIncome,
    totalExpense,
    saldo,
  };
}
module.exports = getTotals;
