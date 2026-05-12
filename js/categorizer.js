
export function categorizeTransaction(tx, contacts){

  const text = `${tx.description} ${tx.counterparty}`;

  let category = "uncategorized";
  let confidence = 0;

  if(tx.amount >= 8000){
    category = "faculty_salary";
    confidence = 80;
  }

  const tutoringKeywords = [
    "طالب",
    "كريدت",
    "اهلية"
  ];

  tutoringKeywords.forEach(keyword=>{
    if(text.includes(keyword)){
      category = "private_tutoring";
      confidence = 90;
    }
  });

  contacts.forEach(contact=>{

    if(contact.phone && text.includes(contact.phone)){

      if(contact.inferredCategory === "private_tutoring"){
        category = "private_tutoring";
        confidence = 95;
      }
    }

  });

  return {
    category,
    confidence
  };
}
