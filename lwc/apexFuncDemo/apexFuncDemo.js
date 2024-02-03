import { track,wire,LightningElement,} from 'lwc';
import listAllContacts from '@salesforce/apex/contactController.listAllContacts';
export default class ApexFuncDemo extends LightningElement {
    @track contacts=[];
    @wire(listAllContacts)
    wiredGetAllContacts({data,error}){
        if(data){
            alert(JSON.stringify(data));
            data.forEach(contact=>{
                this.contacts.push({Id:contact.Id,Name:contact.Name,
                                    Title:contact.Title,Phone:contact.Phone,
                                    Email:contact.Email})
            });
        }
    }
}