import { LightningElement,track } from 'lwc';
import listAllContacts from '@salesforce/apex/contactController.listAllContacts';
export default class LoadAsyncContact extends LightningElement {
    @track contacts=[];
    error;
    handleClick(){
        listAllContacts()
        .then(
            result=>{this.contacts=result;}
        )
        .else(
            error=>{this.error=error;}
        );
    }
    handleHe(){
        this.contacts=[];
    }
    }