
import { parseContacts } from './contacts.js';
import { parseTransactions } from './parser.js';
import { categorizeTransaction } from './categorizer.js';
import { renderDashboard } from './dashboard.js';

let contacts = [];
let transactions = [];

const importBtn = document.getElementById('importBtn');

importBtn.addEventListener('click', async ()=>{

  const contactsFile = document.getElementById('contactsFile').files[0];
  const transactionsFile = document.getElementById('transactionsFile').files[0];

  if(contactsFile){

    const contactsText = await contactsFile.text();

    contacts = parseContacts(contactsText);

    console.log("Contacts Imported", contacts);
  }

  if(transactionsFile){

    const txText = await transactionsFile.text();

    transactions = parseTransactions(txText);

    transactions = transactions.map(tx=>{

      const result = categorizeTransaction(tx, contacts);

      return {
        ...tx,
        category:result.category,
        confidence:result.confidence
      };

    });

    renderDashboard(transactions);

    renderTransactions(transactions);
  }

});

function renderTransactions(transactions){

  const tbody = document.querySelector('#transactionsTable tbody');

  tbody.innerHTML = "";

  transactions.forEach(tx=>{

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${tx.amount}</td>
      <td>${tx.category}</td>
      <td>${tx.description}</td>
      <td>${tx.confidence}%</td>
    `;

    tbody.appendChild(row);
  });
}
