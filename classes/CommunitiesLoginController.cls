/**
 * An apex page controller that exposes the site login functionality
 */
global with sharing class CommunitiesLoginController {

    global CommunitiesLoginController () {}
    
    // Code we will invoke on page load.
    global PageReference forwardToAuthPage() {
    	String startUrl = System.currentPageReference().getParameters().get('startURL');
    	String displayType = System.currentPageReference().getParameters().get('display');
        return Network.forwardToAuthPage(startUrl, displayType);
    }

    @AuraEnabled
    global static String doLogin(String username,String password, String siteUrl){
        
        try {
            
            ApexPages.PageReference pageRef = Site.login(username, password, siteUrl);

            if(pageRef != null){ return pageRef.getUrl();}
            Exception e = new AuraHandledException('');
            e.setMessage('PageReg returned=>'+JSON.serialize(pageref));
            throw e;
        } catch (Exception e) {
            system.debug('e.getMessagelogin+   '+e.getMessage());
            throw new AuraHandledException(e.getMessage());
        }
    
    } 
}