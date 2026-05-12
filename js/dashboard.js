
export function renderDashboard(transactions){

let income=0;
let expenses=0;
let tutoring=0;
let faculty=0;

transactions.forEach(tx=>{

if(tx.amount>0){
income+=tx.amount;
}

if(tx.amount<0){
expenses+=Math.abs(tx.amount);
}

if(tx.category==='private_tutoring'){
tutoring+=tx.amount;
}

if(tx.category==='faculty_salary'){
faculty+=tx.amount;
}

});

document.getElementById('totalIncome').innerText=income.toFixed(2)+' EGP';

document.getElementById('totalExpenses').innerText=expenses.toFixed(2)+' EGP';

document.getElementById('tutoringIncome').innerText=tutoring.toFixed(2)+' EGP';

document.getElementById('facultyIncome').innerText=faculty.toFixed(2)+' EGP';

new Chart(document.getElementById('incomeChart'),{
type:'bar',
data:{
labels:['Tutoring','Faculty','Expenses'],
datasets:[{
label:'EGP',
data:[tutoring,faculty,expenses]
}]
}
});

}
