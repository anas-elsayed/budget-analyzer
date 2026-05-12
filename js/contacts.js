
export function parseContacts(text){

const contacts=[];

const entries=text.split(/\n\s*\n/);

entries.forEach(entry=>{

const phoneMatch=entry.match(/01\d{9}/);

const nameMatch=entry.match(/#Name\s*\n(.+)/);

const workMatch=entry.match(/#Work\s*\n(.+)/);

const contact={
name:nameMatch?nameMatch[1].trim():'Unknown',
phone:phoneMatch?phoneMatch[0]:'',
work:workMatch?workMatch[1].trim():'',
category:'unknown'
};

const combined=`${contact.name} ${contact.work}`;

if(
combined.includes('طالب')||
combined.includes('كريدت')||
combined.includes('اهلية')
){
contact.category='private_tutoring';
}

contacts.push(contact);

});

return contacts;

}
