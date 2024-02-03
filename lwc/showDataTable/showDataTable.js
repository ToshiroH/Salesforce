import {track,wire, LightningElement } from 'lwc';
import listAllContacts from '@salesforce/apex/contactController.listAllContacts';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import {showToast} from 'c/utility';
const COLUMNS=[
    {label:'Name',fieldName:'Name'},
    {label:'Phone',fieldName:'Phone'},
    {label:'Email',fieldName:'Email'},
    {label:'Title',fieldName:'Title'}
];

export default class ShowDataTable extends LightningElement {
    @track contacts=[];
    columns=COLUMNS;
    contactId;
    _wiredResponse;
    showModal=false;
    @wire(listAllContacts)
    wireContacts(result){
        this._wiredResponse=result;
        if(result.data){
            this.contacts=result.data;
        }
    }

    handleSelection(event){
        this.contactId=event.detail.selectedRows[0].Id;
        alert('You\'ve selected '+JSON.stringify(this.contactId));
    }
    deleteIt(){
        deleteRecord(this.contactId)
            .then(() => { //alert('Record Deleted successfully!!!'); 
 
                let ldt = this.template.querySelector('lightning-datatable');
                ldt.selectedRows=[];
                refreshApex(this._wiredResponse);
 
                showToast(this,'DELETE Record','Record Deleted !!!','success');
 
          /*      let notification = new ShowToastEvent(
                    {
                        title: 'DELETE Record',
                        message: 'Record Deleted !!!',
                        variant: 'success',
                    }
                );
                this.dispatchEvent(notification);*/
            }
            )
            .catch(() => { alert('Could Not delete the record...'); });
    }
}