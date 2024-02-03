import { getFieldValue,getRecord } from 'lightning/uiRecordApi';
import { LightningElement, wire,api } from 'lwc';
import FIELD_NAME from '@salesforce/schema/Contact.Name';
import FIELD_TITLE from '@salesforce/schema/Contact.Title';
import FIELD_EMAIL from '@salesforce/schema/Contact.Email' ;
import FIELD_PHONE from '@salesforce/schema/Contact.Phone';
const FIELDS= [FIELD_NAME,FIELD_TITLE,FIELD_EMAIL,FIELD_PHONE]
export default class WireFunctionDemo extends LightningElement {
    @api recordId;
    contact;
    error;
    @wire(getRecord,{recordId:'$recordId',fields:FIELDS})
    wiredContact({data,error}){
        //alert(data);
        if(data){
            this.contact=data;
            this.error=undefined;
        }
        else if(error){
            this.error=error;
            this.contact=undefined;
        }
    }
    get name(){
        return getFieldValue(this.contact,FIELD_NAME);
    }
    get phone(){
        return getFieldValue(this.contact,FIELD_PHONE);
    }
    get email(){
        return getFieldValue(this.contact,FIELD_EMAIL);
    }
}