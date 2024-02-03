import {ShowToastEvent} from 'lightning/platformShowToastEvent';
 
let showToast = function(comp,toastTitle,toastMessage,toastVariant)
{
    let event = new ShowToastEvent(
        {
 
            title: toastTitle,
            message: toastMessage,
            variant: toastVariant
        }
            
    );
 
    comp.dispatchEvent(event);
}
 
export { showToast }