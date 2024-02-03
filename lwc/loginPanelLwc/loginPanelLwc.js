import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import {reduceErrors} from 'c/ldsUtils';    
import doLogin from '@salesforce/apex/CommunitiesLoginController.doLogin';
export default class LoginPanelLwc extends LightningElement {
    @wire(CurrentPageReference)
    currentPageReference;

    error;

    username;
    handleUsernameChange(event){
        this.username=event.target.value;
    }
    password;
    handlePasswordChange(event){
        this.password=event.target.value;
    }

    handleClick(){
        //site login logic
        try{
            console.log('started login');
            console.log(JSON.stringify(this.username+this.password));
            if(this.username && this.password){
                console.log('before imperative call');
                doLogin({username:this.username,password:this.password,siteUrl:this.currentPageReference.state.startURL})
                .then((response)=>{
                    console.log(response);
                    location.href=response;
                })
                .catch((error)=>{   
                    this.error=reduceErrors(error);
                    console.error(error.body.message);
                });
            }
        }catch(e){
            console.error(e);
        }
    }
}