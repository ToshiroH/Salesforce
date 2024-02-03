import { track,LightningElement,wire,api } from 'lwc';
import getContactLocations from '@salesforce/apex/contactController.getContactLocations';
export default class ContactListLocation extends LightningElement {
    @track mapMarkers=[];
    
    @api markersTitle="Contacts Worldwide";
    @api listVisible="visible";
    @wire(getContactLocations)
    wiredGetContactsLocations({data,error}){
        this.mapMarkers=[];
        if(data){
            data.forEach(Contact=>{
                this.mapMarkers.push({location:{City:Contact.mailingcity,Country:Contact.mailingcountry},
                                                descripition:Contact.mailingCity+' -- '+Contact.mailingCountry});
            });
        }
    }
}