import './form-datepicker.scss';
import $ from 'jquery';

if (!$.fn.datepicker) {
    require('../../assets/js/datepicker.min.js');
    require('../../assets/css/datepicker.min.css');
}

let applyButton = document.createElement('span');
$(applyButton).addClass("select-btns__submit");
$(applyButton).text("применить");

$(".datepicker-here").datepicker({
    startDate: new Date(),
    prevHtml: '<i class="material-icons datepicker--nav-prev">arrow_back</i>',
    nextHtml: '<i class="material-icons datepicker--nav-next">arrow_forward</i>',
    range: true,
    showButtonPanel: true,
    clearButton: true,
    navTitles: {
        days: 'MM yyyy',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2'
    }
});

$('.datepicker-inline .datepicker--buttons').append($(applyButton));