
export function parseContacts(text){

  const entries = text.split(/\n\s*\n/);

  const contacts = [];

  for(const entry of entries){

    const nameMatch = entry.match(/#Name\s*\n(.+)/);
    const phoneMatch = entry.match(/\+?\d[\d\s\-]+/);
    const workMatch = entry.match(/#Work\s*\n(.+)/);

    const contact = {
      name: nameMatch ? nameMatch[1].trim() : "Unknown",
      phone: phoneMatch ? phoneMatch[0].replace(/\s|\-/g,'') : "",
      work: workMatch ? workMatch[1].trim() : "",
      tutoringScore:0,
      inferredCategory:"unknown"
    };

    const tutoringKeywords = [
      "طالب",
      "طالب عرب",
      "كريدت",
      "اهلية"
    ];

    const combined = `${contact.name} ${contact.work}`;

    tutoringKeywords.forEach(keyword=>{
      if(combined.includes(keyword)){
        contact.tutoringScore += 25;
      }
    });

    if(contact.tutoringScore >= 25){
      contact.inferredCategory = "private_tutoring";
    }

    contacts.push(contact);
  }

  return contacts;
}
