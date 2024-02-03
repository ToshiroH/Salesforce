import { LightningElement } from 'lwc';

export default class ConditionalRender extends LightningElement {
    show=false;
    handleChange(event){
        this.show=event.value.checked;
    }
}