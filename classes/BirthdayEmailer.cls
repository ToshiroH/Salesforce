global class BirthdayEmailer implements Database.Batchable<sObject>
{
    global string query;
    global List<String> toAddress=new List<String>();
    global Database.QueryLocator start(Database.BatchableContext bc)
    {
        Date bday=Date.today();
        //system.debug('outputs');
        return Database.getQueryLocator('SELECT Id,Contact__r.Id,Contact__r.Name,Contact__r.Email FROM Gift_Voucher__c WHERE DAY_IN_MONTH(Contact__r.DOB__c) = ' + bday.day() +  ' AND CALENDAR_MONTH(Contact__r.DOB__c) = ' + bday.month());
    }
    
    global void execute(Database.BatchableContext bc, List<Gift_Voucher__c> vList)
    {
         List < Messaging.SingleEmailMessage > mails = new List < Messaging.SingleEmailMessage > ();
        System.debug(vlist.size());
            for (Gift_Voucher__c v : vList) {
                if (v.Contact__r.Email!=null) {
					toAddress.add(v.Contact__r.email);
                     Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                   mail.setTemplateId('00X5g000002Mnl3');//Give the Email Template id
                    mail.setTargetObjectId(v.Contact__r.id);//Contact Id
		    mail.setToAddresses(toAddress);	//Contact Email
                    mail.setWhatId(v.Id); 	//Voucher Id for Detail Link
                mails.add(mail);
                   // System.debug('Added '+v.Contact__r.email+' to the mailing list');
                    toAddress.clear();
                 }
             }
        try{
	     Messaging.sendEmail(mails); 
        }
        catch(exception e){
            System.debug('Error encountered');
        }
        
    }
    
    global void finish(Database.BatchableContext bc)
    {
        AsyncApexJob job =[select Id,Status from AsyncApexJob where Id=:bc.getJobId()];
        System.debug('Job Status :'+job.Status);
   
    }
}