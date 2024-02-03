import { LightningElement ,api} from 'lwc';

export default class ContactDisplay extends LightningElement {
    @api contact;


    handleClick()
    {
        let event = new CustomEvent("contactselection",{detail: {contactId: this.contact.Id}});
        this.dispatchEvent(event);
    }

}