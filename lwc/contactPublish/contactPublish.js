import { LightningElement,wire } from 'lwc';
import {publish, MessageContext} from 'lightning/messageService';
import listAllContacts from '@salesforce/apex/contactController.listAllContacts';
import CONTACT_SELECTED_CHANNEL from '@salesforce/messageChannel/Contact_Selected__c';
export default class ContactPublish extends LightningElement 
{
    @wire(listAllContacts)
    contacts;


    @wire(MessageContext)
    messageContext;


    handleContactSelection(event)
    {
        alert('Selection Contact Id ' + event.detail.contactId);


        const payload = {recordId: event.detail.contactId}
        publish(this.messageContext,CONTACT_SELECTED_CHANNEL,payload);
    }
}