import { LightningElement, wire,api } from 'lwc';
import {getRecord, getFieldDisplayValue, getFieldValue} from 'lightning/uiRecordApi';
//static schema 
import FIELD_NAME from '@salesforce/schema/Account.Name';
import FIELD_SITE from '@salesforce/schema/Account.Site';
import FIELD_INDUSTRY from '@salesforce/schema/Account.Industry';
//const FIELDS =['Name','Site','Industry'];
const FIELDS =[FIELD_NAME,FIELD_SITE,FIELD_INDUSTRY];
export default class WireadapterDemo extends LightningElement 
{
    recordId='0015g000009kViEAAU';
    //@api recordId
    // $recordId is called Reactive variable
    //When the record is fetched, and object is stored in account variable.c/calculator
    //That object contains data and error property. 
    @wire (getRecord,{recordId: '$recordId', fields : FIELDS})
    account;
    get name()
    {
        return getFieldValue(this.account.data,FIELD_NAME);
    }
 
    get site()
    {
        return getFieldValue(this.account.data,FIELD_SITE);
    }
 
    get industry()
    {
        return getFieldValue(this.account.data,FIELD_INDUSTRY);
    }
}