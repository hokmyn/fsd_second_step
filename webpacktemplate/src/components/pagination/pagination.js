import './pagination.scss';

import $ from 'jquery';

if (!$.fn.pagination) {
    require('../../assets/js/jquery.simplePagination.js');
}



$(function () {
    $('#pagination').pagination({
        items: 100,
        itemsOnPage: 10
    });
});