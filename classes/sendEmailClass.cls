public with sharing class sendEmailClass {
    @AuraEnabled(cacheable=true)
    public static void sendMailToRecipient(String body, String[] toSend, String subject){
        try{
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            String[] toAddresses = toSend;
            mail.setToAddresses(toAddresses);
            mail.setSubject(subject);
            mail.setHtmlBody('<h1>'+ body + '</h1>');
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        }catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}