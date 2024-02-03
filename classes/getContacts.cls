public with sharing class getContacts {
    @AuraEnabled(cacheable=true)
    public static list<Contact> listAllContacts() {
        return [select id,name,title,phone,email from contact where email<>null];
    }
}