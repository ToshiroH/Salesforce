public class MailAttempt {
    public static void mail(){
        list<string> toAddress = new list<string>();
        try{
        toaddress.add([select email from contact where id = '0035g000005jTnWAAU'].email);
        List < Messaging.SingleEmailMessage > mails = new List < Messaging.SingleEmailMessage > ();
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                   //mail.setTemplateId('00X5g000002NXiO');//Give the Email Template id 00X5g000002Mnl3
                    //mail.setTargetObjectId('0035g000005jTnWAAU');//Contact Id
		    mail.setToAddresses(toAddress);	//Contact Email
            mail.setSubject('Regarding Sending Issues');
            mail.setHtmlBody('Hi, <br/> If this reached there are no issues :P <br/>');
            system.debug('sending to '+toaddress);
                    //mail.setWhatId('a005g00002s7UXBAA2'); 	//Voucher Id for Detail Link
                mails.add(mail);
            Messaging.sendEmail(mails);
        system.debug('sent without errors if reached');}
        catch(Exception e){
            system.debug(e.getmessage());
        }
    }
}