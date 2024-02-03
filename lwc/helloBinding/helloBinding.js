import { LightningElement } from 'lwc';

export default class HelloBinding extends LightningElement {

    message = 'This is a message for display';
    handleChange(event){
        this.message=event.target.value;
    }
}