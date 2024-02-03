import { LightningElement , track, wire } from 'lwc';

import listAllFields from '@salesforce/apex/reusableObjectController.listAllFields';

export default class ReUsableObjectFieldInput extends LightningElement {

    objectValue = '';
    fieldValue = '';
    showFieldValue = '';
    @track 
    fieldOptions = [];
    @track 
    mapValues=[];
    columns = [{label:'Object Name', fieldName: 'objectName',type:'text',sortable:true},
                {label:'Condition Fields', fieldName: 'conditionFields',type:'text',sortable:false},
                {label:'Condition Values', fieldName: 'conditions',type:'text',sortable:false},
                {label:'Query Fields', fieldName: 'inputOnlyFields',type:'text',sortable:false}];
    //result=[];
    disableFieldOptions = true;
    disableOnlyInputFieldButton = true;
    selectedFields = [];
    inputFields = [];
    conditionValue = '';
    selectedConditions = [];
    disableAddConditionButton = true;
    @track mapData = [];
    disableAddNextButton = true;



    get objectOptions() {
        return [
            { label: 'User', value: 'User' },
            { label: 'Contact', value: 'Contact' },
            { label: 'Account', value: 'Account' },
        ];
    }

    handleChangeObject(event){
        this.objectValue=event.detail.value;
        alert(this.objectValue);
        if(this.objectValue != null) {
            console.log('in before listallfields');
          listAllFields({selectedObject : this.objectValue})
          .then(result=>{
              this.fieldOptions=[];
              console.log('objectOptons'+this.objectOptions+'objectValue'+this.objectValue);
              console.log(JSON.stringify(result));
              let data = JSON.parse(JSON.stringify(result));
              console.log(JSON.stringify(data));
              for(var i = 0; i < data[0].length; i++){
                this.fieldOptions.push({label: data[1][i],value: data[0][i]}); 
              }
              
              console.log(JSON.parse(JSON.stringify(this.fieldOptions)));
             //this.objectOptions.push({label: data[0][0], value: data[1][0]});
              this.fieldOptions =  JSON.parse(JSON.stringify(this.fieldOptions));
          })
          .catch(error =>{
              console.log('error!'+error);
          });
          this.disableFieldOptions = false;
        }
    }
    handleChangeFieldManual(event){
        this.fieldValue = JSON.parse(JSON.stringify(event.target.value));
        if(this.fieldValue != null && this.fieldValue != undefined) {
            console.log('inside handleChangeField if condition');
            this.disableOnlyInputFieldButton = false;
        }else{
            this.disableOnlyInputFieldButton = true;
        }
        console.log(this.fieldValue);
    }
    handleChangeField(event){
        this.fieldValue=JSON.parse(JSON.stringify(event.detail.value));
        this.showFieldValue=JSON.parse(JSON.stringify(event.detail.value));
        console.log(this.fieldValue);
        if(this.fieldValue != null && this.fieldValue != undefined) {
            console.log('inside handleChangeField if condition');
            this.disableOnlyInputFieldButton = false;
        }
        console.log(this.fieldValue);
    }
    handleClickInputButton(event){
        var str =event.target.label;
        console.log('label-->'+str);
        console.log(this.conditionValue);
        console.log(this.fieldValue);
        if(str == 'InputButton' && this.fieldValue != null && !this.fieldValue.isBlank()) {
            this.inputFields.add(this.fieldValue);
            this.fieldValue='';
            this.disableOnlyInputFieldButton=true;
            let mapValue = {'objectName': this.objectValue, 'conditions':this.selectedConditions.join(','), 'inputOnlyFields':this.inputFields.join(','),'conditionFields':this.selectedFields.join(',')};
            if(this.mapData[this.objectValue]==undefined){
                this.mapData[this.objectValue]=mapValue;
            }
            else{
                var str = this.mapData.get(this.objectValue);
                str['inputOnlyFields']=this.inputFields;
                this.mapData[this.objectValue]=str;
            }
            this.mapData = JSON.parse(JSON.stringify(this.mapData));
            this.mapValues = JSON.parse(JSON.stringify(this.mapValues));
        }
        else if(str == 'EnterButton' && this.fieldValue != null 
                && this.conditionValue != null ){
                    console.log(this.conditionValue);
            this.selectedConditions.push(this.conditionValue);
            this.selectedFields.push(this.fieldValue);
            console.log(this.selectedConditions + this.selectedFields);
            let mapValue = {'objectName': this.objectValue, 'conditions':this.selectedConditions?.join(','), 'inputOnlyFields':this.inputFields?.join(','),'conditionFields':this.selectedFields?.join(',')};
            mapValue = JSON.parse(JSON.stringify(mapValue));
            console.log(mapValue);
            if(this.mapData[this.objectValue]==undefined){
                this.mapData.push({key:this.objectValue ,  value:mapValue});
                this.mapValues.push(mapValue);
                console.log('inside if'+this.mapData);
            }
            else{
                console.log('else');
                var str = this.mapData[this.objectValue];
                str['conditions']=this.selectedConditions;
                str['conditionFields']=this.selectedFields;
                this.mapData[this.objectValue]=str;
                for(var i = 0; i<this.mapValues.length; i++){
                    if(this.mapValues[i]['objectName']==this.objectValue){
                        this.mapValues[i]['conditions']=JSON.parse(JSON.stringify(this.selectedConditions));
                        this.mapValues[i]['conditionFields']=JSON.parse(JSON.stringify(this.selectedFields));
                    }
                }
            }
            this.mapData = JSON.parse(JSON.stringify(this.mapData));
            this.mapValues = JSON.parse(JSON.stringify(this.mapValues));
            console.log(JSON.stringify(this.mapValues));
            console.log(JSON.stringify(this.mapData));
            this.condtionValue='';
            this.fieldValue='';
            this.showFieldValue='';
            this.objectValue='';
            this.showFieldValue='';
            this.disableAddNextButton = true;
        }
        
    }

    handleChangeCondition(event){
        this.conditionValue=JSON.parse(JSON.stringify(event.target.value));
        console.log(this.conditionValue);
        if(this.conditionValue != null && this.conditionValue != undefined) {
            this.disableAddConditionButton = false;
        }

    }



}