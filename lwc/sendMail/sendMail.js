import { LightningElement,api,track } from 'lwc';
import sendMailToRecipient from '@salesforce/apex/sendEmailClass.sendMailToRecipient';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class SendMail extends LightningElement {
    @api
    myRecordIds;
    @api
    emails;
    @track
    title;
    @track
    msg;
    setSub(event){
        this.title=event.target.value;
    }
    setMsg(event){
        this.msg=event.target.value;
    }
    uploadFiles(event){
        //do nothing
        myRecordIds=event.detail.files;
    }
    toast(title,variant){
        const toastEvent = new ShowToastEvent({
            title, 
            variant
        })
        this.dispatchEvent(toastEvent)
    }
    sendMsg(component){
        //alert(this.msg);
        //alert(this.title);
        //do nothing for now
        const recordInput = {body: this.msg, toSend: this.emails, subject: this.title} ;
        sendMailToRecipient(recordInput)
        .then( () => {
            //If response is ok
            this.toast("Successfully sent","Success");
        }).catch( error => {
            //If there is an error on response
            this.toast("Unsuccessful :(","Failure");
        });
    }
}