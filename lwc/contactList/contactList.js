import { LightningElement,wire,track,api} from 'lwc';
import listAllContacts from '@salesforce/apex/getContacts.listAllContacts';
import FIELD_NAME from '@salesforce/schema/Contact.Name';
import FIELD_TITLE from '@salesforce/schema/Contact.Title';
import FIELD_PHONE from '@salesforce/schema/Contact.Phone';
import FIELD_EMAIL from '@salesforce/schema/Contact.Email';

const COLUMNS=[
    {label:'Name',fieldName:'Name'},
    {label:'Phone',fieldName:'Phone'},
    {label:'Email',fieldName:'Email', type:'email'},
    {label:'Title',fieldName:'Title'}
];
//const COLUMNS =[FIELD_NAME,FIELD_TITLE,FIELD_PHONE,FIELD_EMAIL];
export default class ContactList extends LightningElement {
   temp=[];
    @track
    contacts=[];
   columns=COLUMNS;
   @track
   sel=false; 
   @api
   email=[];
   @track
   output=[];
   @track
   selectedIds=[];
   @wire(listAllContacts)
   wireContacts(result){
        if(result.data){
            this.contacts=result.data;
        }
   }
   handleSelection(event){
       //alert('entered');
       this.email=undefined;
       if(event.detail.selectedRows){
        this.email=[];
        this.selectedIds=[];
        this.output=event.detail.selectedRows;
        event.detail.selectedRows.forEach(element => {
            this.email.push(element.Email);
            this.selectedIds.push(element.Id);
            });
        //alert(JSON.stringify(this.output));
       }
       if(this.email!=[]){
           this.sel=true;
       }
       else{
           //alert('entered else');
           this.sel=false;
       }
   }
   handleClick(event){
    //alert('Entered HandleClick');
    //alert('Entered 2');
     this.temp = this.output;
     //alert(JSON.stringify(this.temp));
     this.output=[];
     this.Email=[];
     this.selectedIds=[];
     this.temp.forEach(element => {
         if(element.Email!=event.target.value){
            //alert('Reached 2');
            this.selectedIds.push(element.Id);
            this.output.push(element);
            //alert(JSON.stringify(this.output));
            this.email.push(element.Email);
        }
        else{
           // alert('Reached elsee');
        }
     });
    
   }
    

}