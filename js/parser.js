
export function parseTransactions(text){

const transactions=[];

const lines=text.split('\n');

for(let i=0;i<lines.length;i++){

const line=lines[i].trim();

if(line.length<10) continue;

if(
line.includes('INWARD ACH') ||
line.includes('الهندسة بشبرا')
){

const amountMatch=line.match(/(\d{1,3}(?:,\d{3})*\.\d{2})/);

if(amountMatch){

transactions.push({
date:'',
amount:parseFloat(amountMatch[1].replace(/,/g,'')),
category:'faculty_salary',
description:line,
raw:line
});

}

}

if(
line.includes('IPN transfer') ||
line.includes('instapay') ||
line.includes('تحويل')
){

const amountMatch=line.match(/(\d{1,3}(?:,\d{3})*\.\d{2})/);

if(amountMatch){

transactions.push({
date:'',
amount:parseFloat(amountMatch[1].replace(/,/g,'')),
category:'private_tutoring',
description:line,
raw:line
});

}

}

if(
line.includes('سحب نقدى') ||
line.includes('الصراف الالى')
){

const amountMatch=line.match(/(\d{1,3}(?:,\d{3})*\.\d{2})/);

if(amountMatch){

transactions.push({
date:'',
amount:-Math.abs(parseFloat(amountMatch[1].replace(/,/g,''))),
category:'internal_transfer',
description:line,
raw:line
});

}

}

}

return transactions;

}
