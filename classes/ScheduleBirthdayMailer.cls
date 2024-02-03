global class ScheduleBirthdayMailer implements Schedulable{
	global void execute(SchedulableContext sc)
    {
        BirthdayEmailer ba = new BirthdayEmailer();
        Database.executeBatch(ba);
    }
}