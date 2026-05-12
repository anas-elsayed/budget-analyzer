
export function parseTransactions(text){

  const lines = text.split('\n');

  const transactions = [];

  for(const line of lines){

    const amountMatch = line.match(/\d+[\.,]?\d*/);

    if(!amountMatch) continue;

    transactions.push({
      amount: parseFloat(amountMatch[0]),
      description: line,
      counterparty: line
    });
  }

  return transactions;
}
