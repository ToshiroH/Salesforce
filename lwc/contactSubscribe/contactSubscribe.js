import { LightningElement, wire } from 'lwc';
import {subscribe, MessageContext, unsubscribe} from 'lightning/messageService';
import CONTACT_SELECTED_CHANNEL from '@salesforce/messageChannel/Contact_Selected__c';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import FIELD_NAME from '@salesforce/schema/Contact.Name';
import FIELD_TITLE from '@salesforce/schema/Contact.Title';
import FIELD_PHONE from '@salesforce/schema/Contact.Phone';
import FIELD_EMAIL from '@salesforce/schema/Contact.Email';
 
const FIELDS = [ FIELD_NAME, FIELD_TITLE, FIELD_PHONE, FIELD_EMAIL];
 
export default class ContactSubscribe extends LightningElement {
 
    subscription;
    recordId;
 
    @wire(MessageContext)
    messageContext;
 
    @wire(getRecord,{recordId : '$recordId', fields : FIELDS})
    contact;
 
    connectedCallback()
    {
        this.subscribeToChannel();
    }
 
    disconnectedCallback()
    {
        unsubscribe(this.subscription);
        this.subscription = undefined;
    }
 
    subscribeToChannel()
    {
        if(this.subscription)
        {
            return;
        }
        this.subscription = subscribe(this.messageContext,CONTACT_SELECTED_CHANNEL, 
                                                                (message) => { this.handleMessage(message) });
    }
 
    handleMessage(message)
    {
        this.recordId = message.recordId;
    }
 
    get name()
    {
        return getFieldValue(this.contact.data, FIELD_NAME);
    }
    get title()
    {
        return getFieldValue(this.contact.data, FIELD_TITLE);
    }
    get phone()
    {
        return getFieldValue(this.contact.data, FIELD_PHONE);
    }
    get email()
    {
        return getFieldValue(this.contact.data, FIELD_EMAIL);
    }
    editRecord(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{objectApiName:'Contact',recordId:this.recordId,actionName:'edit'}
        });
    }
}