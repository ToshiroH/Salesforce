global class GiftVoucherCreater Implements Schedulable
    {
        global void execute(SchedulableContext sc)
        {
            createGift();
        }

        public void createGift(){
	        List<Gift_Voucher__c> toAdd = new List<Gift_Voucher__c>();
	        Date bday=Date.Today();
            List<Contact> cList = [SELECT Id FROM Contact WHERE 
			DAY_In_Month(Contact.DOB__c) =:bday.day() AND CALENDAR_MONTH(Contact.DOB__c) =:bday.month()];

            for(Contact l:cList)
            {
                toAdd.add(new Gift_Voucher__c(Amount__C=1000,Contact__c=l.Id));
            }
	    try{
            insert toAdd;
            System.debug('Successfully added ');
		}
	    catch(DMLException e){
		System.debug('Couldn\'t insert records');
		}
        }
    
}