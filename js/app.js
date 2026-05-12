
import { parseContacts } from './contacts.js';
import { parseTransactions } from './parser.js';
import { renderDashboard } from './dashboard.js';

pdfjsLib.GlobalWorkerOptions.workerSrc =
'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let contacts=[];

document.getElementById('importBtn')
.addEventListener('click',async()=>{

const contactsFile=
document.getElementById('contactsFile').files[0];

const transactionsFile=
document.getElementById('transactionsFile').files[0];

if(contactsFile){

const text=await contactsFile.text();

contacts=parseContacts(text);

console.log(contacts);

}

if(transactionsFile){

const pdfText=await extractPDFText(transactionsFile);

document.getElementById('debugText').value=pdfText;

const transactions=parseTransactions(pdfText);

renderDashboard(transactions);

renderTransactions(transactions);

console.log(transactions);

}

});

async function extractPDFText(file){

const arrayBuffer=await file.arrayBuffer();

const pdf=await pdfjsLib.getDocument({
data:arrayBuffer
}).promise;

let fullText='';

for(let pageNum=1;pageNum<=pdf.numPages;pageNum++){

const page=await pdf.getPage(pageNum);

const textContent=await page.getTextContent();

const text=textContent.items
.map(item=>item.str)
.join(' ');

fullText += text + '\n';

}

return fullText;

}

function renderTransactions(transactions){

const tbody=document.querySelector(
'#transactionsTable tbody'
);

tbody.innerHTML='';

transactions.forEach(tx=>{

const row=document.createElement('tr');

row.innerHTML=`
<td>${tx.date}</td>
<td>${tx.amount}</td>
<td>${tx.category}</td>
<td>${tx.description}</td>
`;

tbody.appendChild(row);

});

}
