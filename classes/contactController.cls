public with sharing class contactController {
    @AuraEnabled(cacheable=true)
    public static list<Contact> listAllContacts() {
        return [select id,name,title,phone,email from contact];
    }

    @AuraEnabled(cacheable=true)
    public static List<contact> getContactLocations(){
        return [Select ID, mailingcity,mailingcountry from contact where mailingcity<>null];
        }
    }