import { wire,LightningElement,} from 'lwc';
import listAllContacts from '@salesforce/apex/contactController.listAllContacts';
export default class ApexPropertyDemo extends LightningElement {
    @wire(listAllContacts)
    contacts;
}