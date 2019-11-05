import './datepicker.scss';
import $ from 'jquery';

if (!$.fn.datepicker) {
    require('jquery-ui/ui/widgets/datepicker');
    require('jquery-ui/themes/base/datepicker.css');
    require('jquery-ui/ui/i18n/datepicker-ru');
}

$(function () {
    $("#datepicker").datepicker($.datepicker.regional["ru"]);
    
});



