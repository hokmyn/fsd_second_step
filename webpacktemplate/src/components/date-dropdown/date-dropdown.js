import './date-dropdown.scss';
import $ from 'jquery';

if (!$.fn.datepicker) {
    require('../../assets/js/datepicker.min.js');
    require('../../assets/css/datepicker.min.css');
}

$(".form_select-arrival, .booking-arrival").datepicker({
    startDate: new Date(),
    range: true,
    multipleDatesSeparator: " - "

});

//$(".form_select-arrival, .booking-arrival").datepicker().data('datepicker').show();
//$(".form_select-arrival, .booking-arrival").datepicker().data('datepicker').hide();



$(".date-dropdown").on("click", (e) => {   
    if ($(e.target).hasClass("form_select-departure") || $(e.target).hasClass("booking-departure")) {
        
        $(e.target)
            .parents(".datepicker-wrap")
            .siblings(".datepicker-wrap")
            .find(".input").datepicker()
            .data('datepicker').show();
    }
    
});



