import './date-dropdown.scss';
import $ from 'jquery';

if (!$.fn.datepicker) {
    require('../../assets/js/datepicker.min.js');
    require('../../assets/css/datepicker.min.css');
}

$(".form_select-arrival, .booking-arrival").datepicker({
    startDate: new Date(),
    range: true,
    showButtonPanel: true,
    clearButton: true,
    navTitles: {
        days: 'MM yyyy',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2'
    },
    
    onSelect: (formattedDate, date, inst) => {
        if (formattedDate.split(",").length > 1) {
            $(inst.el).val(formattedDate.split(",")[0]);
            $(inst.el)
                .parents(".datepicker-wrap")
                .siblings(".datepicker-wrap")
                .find(".input")
                .val(formattedDate.split(",")[1]);            
        }
    }
});

$(".date-dropdown").on("click", (e) => {
    if ($(e.target).hasClass("form_select-departure")
    || $(e.target).hasClass("booking-departure")
    || $(e.target).siblings("input[class*='-departure']").length > 0
    || $(e.target).parent().siblings("input[class*='-departure']").length > 0) {              
        $(e.target)
            .parents(".datepicker-wrap")
            .siblings(".datepicker-wrap")
            .find(".input").datepicker()
            .data('datepicker').show();
    } else {
        $(e.target).parents(".date-dropdown").find(".input").datepicker().data('datepicker').show();
    }
    
});



