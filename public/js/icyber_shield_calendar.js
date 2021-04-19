
/**
 * @Calender Events js file 
 * for click events
 * BlockAPT
 * Created by Nauman Munawar
 * 21 September 2017
 * 
 */

 /*************************event click function******************/

 var click_date = 'daysmonth tr td',
 handleScheduleCalendar = function() {
    var monthNames = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];
    var dayNames = ["S", "M", "T", "W", "T", "F", "S"];

    var now = new Date(),
        month = now.getMonth() + 1,
        year = now.getFullYear(),
        events = _events, // comng from home blade
        calendarTarget = $('#schedule-calendar');

     var dateToday = new Date();
    $(calendarTarget).calendar({
        months: monthNames,
        days: dayNames,
        minDate : dateToday,
        events: events,
        popover_options:{
            placement: 'top',
            html: true
        }
    });
    $(calendarTarget).find('td.event').each(function() {
        var backgroundColor = $(this).css('background-color');
        $(this).removeAttr('style');
        $(this).find('a').css('background-color', backgroundColor);
    });
    $(calendarTarget).find('.icon-arrow-left, .icon-arrow-right').parent().on('click', function() {
        $(calendarTarget).find('td.event').each(function() {
            var backgroundColor = $(this).css('background-color');
            $(this).removeAttr('style');
            $(this).find('a').css('background-color', backgroundColor);
        });
    });
},
 event_click = function(obj) {
    var getClassName = $('#'+obj.id).attr('class');
    if(getClassName === 'event event_tooltip' ||  getClassName === 'last event event_tooltip' || getClassName === 'first event event_tooltip'){
        var dateSearch = obj.id;
        var dynamicDate = $(obj).find('a').attr('data-original-title');

        if(dynamicDate){
            getArchive(dynamicDate);

        } else{
            getArchive(dateSearch);
        }

    } else {

        open_schedule_archive_popup(obj);
    }
},
        open_schedule_archive_popup = function (obj){
            var date = obj.id,
            original_date = formatDate(date),
            //give date of required format
            schedule_date = $.datepicker.formatDate('dd-mm-yy', new Date(original_date));

            $('.schedule_show_date').val(schedule_date),
            $('#schedule_date').val(original_date),
            $('#schedule_archive').modal();
        }, 

 formatDate = function(string) 
 {
 	var date_split = string.split('_'),  //split string to seperate variables
 	day = date_split[2],                //get day from string 
 	month = date_split[3],               //get month from string
 	year = date_split[4],               //get year from string

 	format_date =  year+ '/' +month+ '/' +day ;  //make formate of the date
 	return format_date;
 };


 $(document).ready(function(){

 	//$('body').on('click', '.'+click_date, function(){ event_click(this); });
     $('body').on('click', '.'+click_date, function(){
         // set the id of clicked date
         $('#selected_date_from_dashboard_calendar').val(this.id); // this id will be used to get the previous obj
         event_click(this);
     });
//get another Schedule
     $('.addMoreSchedule').on('click', function(){

         var selected_date_id = $('#selected_date_from_dashboard_calendar').val(),  // get the previous clicked date
             previous_clicked_obj = $('#'+selected_date_id).get(0);  // the 1st td by given id

         //$('#'+selected_date_id).removeClass('event');//

       
         open_schedule_archive_popup(previous_clicked_obj);
     });

 });


