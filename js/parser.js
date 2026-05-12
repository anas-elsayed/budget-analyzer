
export function parseTransactions(text){

  const transactions = [];

  const lines = text.split('\n');

  lines.forEach(line=>{

    const cleaned = line.trim();

    if(cleaned.length < 5) return;

    const amountMatch =
      cleaned.match(/(\d{1,3}(?:,\d{3})*(?:\.\d+)?)/);

    if(!amountMatch) return;

    const amount =
      parseFloat(amountMatch[1].replace(/,/g,''));

    let category = 'uncategorized';

    if(
      cleaned.includes('الهندسة بشبرا') ||
      cleaned.includes('INWARD ACH')
    ){
      category = 'faculty_salary';
    }

    transactions.push({
      amount,
      description: cleaned,
      raw: cleaned,
      category,
      confidence: 50
    });

  });

  return transactions;
}
