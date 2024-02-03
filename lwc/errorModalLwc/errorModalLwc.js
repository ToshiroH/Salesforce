import { LightningElement, api } from 'lwc';
import { LightningModal } from 'lightning/modal';
export default class ErrorModalLwc extends LightningModal {
    @api error;
}