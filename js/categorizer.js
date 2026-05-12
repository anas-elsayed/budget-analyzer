
export function categorizeTransaction(tx, contacts){

  let category = 'uncategorized';
  let confidence = 50;
  let reason = [];

  const text = `${tx.raw} ${tx.counterparty}`;

  if(tx.direction === 'internal_transfer'){
    category = 'internal_transfer';
    confidence = 100;
    reason.push('wallet withdrawal');
  }

  if(tx.amount >= 8000){
    category = 'faculty_salary';
    confidence = 85;
    reason.push('large recurring income');
  }

  const tutoringKeywords = [
    'طالب',
    'اهلية',
    'كريدت',
    'طالب عرب'
  ];

  tutoringKeywords.forEach(keyword=>{

    if(text.includes(keyword)){
      category = 'private_tutoring';
      confidence = 95;
      reason.push(`keyword:${keyword}`);
    }

  });

  contacts.forEach(contact=>{

    if(
      contact.phone &&
      tx.phone &&
      contact.phone.includes(tx.phone.replace('+2',''))
    ){

      if(contact.inferredCategory === 'private_tutoring'){

        category = 'private_tutoring';
        confidence = 98;
        reason.push('matched tutoring contact');

      }

    }

  });

  const recurringExpensePhones = [
    '01001149360'
  ];

  recurringExpensePhones.forEach(number=>{

    if(tx.phone === number){

      category = 'recurring_expense';
      confidence = 90;
      reason.push('recurring target');

    }

  });

  return {
    category,
    confidence,
    reason
  };
}
