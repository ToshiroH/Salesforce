import { LightningElement } from 'lwc';

export default class HelloBinding extends LightningElement {

    firstName = "Gol D.";
    lastName="Roger";
    handleChange(event){
        const evS = event.target.name;
        if(evS==='firstName'){
                this.firstName=event.target.value;
        }
        else{
            this.lastName=event.target.value;
        }
    }
}