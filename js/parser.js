
export function parseTransactions(text){

  const transactions = [];

  const blocks = text.split('-----------------------------------------------------');

  for(const block of blocks){

    if(
      !block.includes('تم استلام مبلغ') &&
      !block.includes('تم تحويل') &&
      !block.includes('تم سحب') &&
      !block.includes('Received EGP')
    ){
      continue;
    }

    let amount = 0;
    let type = 'unknown';
    let counterparty = '';
    let phone = '';
    let direction = 'neutral';

    const amountMatchArabic = block.match(/مبلغ\s+([\d\.]+)/);
    const amountMatchTransfer = block.match(/تم تحويل\s+([\d\.]+)/);
    const amountMatchEnglish = block.match(/Received EGP([\d\.]+)/);

    if(amountMatchArabic){
      amount = parseFloat(amountMatchArabic[1]);
    }

    if(amountMatchTransfer){
      amount = parseFloat(amountMatchTransfer[1]);
    }

    if(amountMatchEnglish){
      amount = parseFloat(amountMatchEnglish[1]);
    }

    if(block.includes('تم استلام مبلغ') || block.includes('Received EGP')){
      direction = 'income';
      type = 'wallet_income';
    }

    if(block.includes('تم تحويل')){
      direction = 'expense';
      type = 'wallet_transfer';
      amount *= -1;
    }

    if(block.includes('تم سحب')){
      direction = 'internal_transfer';
      type = 'cash_withdrawal';
      amount *= -1;
    }

    const phoneMatch = block.match(/01\d{9}/);

    if(phoneMatch){
      phone = phoneMatch[0];
    }

    const nameMatch = block.match(/بإسم\s+([A-Za-z\s]+)/);

    if(nameMatch){
      counterparty = nameMatch[1].trim();
    }

    transactions.push({
      amount,
      type,
      direction,
      counterparty,
      phone,
      raw:block.trim()
    });

  }

  return transactions;
}
