import { LightningElement } from 'lwc';

export default class Calculator extends LightningElement {

    firstNumber=0;
    lastNumber=0;
    result=0;
    handleChange(event){
        const evS = event.target.name;
        if(evS==='firstNumber'){
                this.firstNumber=event.target.value;
        }
        else{
            this.lastNumber=event.target.value;
        }
    }
    doAdd(){
        this.result = parseFloat(this.firstNumber)+parseFloat(this.lastNumber);
    }
    doSub(){
        this.result = parseFloat(this.firstNumber)-parseFloat(this.lastNumber);
    }
}