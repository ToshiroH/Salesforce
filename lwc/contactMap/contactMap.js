import { api,LightningElement,track, wire } from 'lwc';
import {getRecord,getFieldValue} from 'lightning/uiRecordApi'
import FIELD_CITY from '@salesforce/schema/Contact.MailingCity';
import FIELD_COUNTRY from '@salesforce/schema/Contact.MailingCountry';

const FIELDS = [FIELD_CITY,FIELD_COUNTRY];

export default class ContactMap extends LightningElement {
    @track mapMarkers=[];
    @api recordId;

    @wire(getRecord,{recordId:'$recordId',fields:FIELDS})
    wiredGetContact({data,error}){
        if(data){
            const city=getFieldValue(data,FIELD_CITY);
            const country=getFieldValue(data,FIELD_COUNTRY);
            this.mapMarkers=[{location:{City:city,Coutry:country},title:'Contact Location',description:'Location :: '+city+'-- '+country}];
        }
    }
}