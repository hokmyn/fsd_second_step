import './date-dropdown.scss';
import $ from 'jquery';

if (!$.fn.datepicker) {
  require('../../assets/js/datepicker.min.js');
  require('../../assets/css/datepicker.min.css');
}

$("input[class*='-arrival'], input[class*='-departure']").attr("readonly", "true");

let applyButton = document.createElement('span');
$(applyButton).addClass('select-btns__submit datepicker--button');
$(applyButton).text('применить');

$("input[class*='-arrival'").datepicker({
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
  },
  onShow: (inst) => {
    const elementValue = $(inst.el).val().split(',');
    if (elementValue.length > 1) {
      $(inst.el).val(elementValue[0]);
      $(inst.el)
        .parents('.datepicker-wrap')
        .siblings('.datepicker-wrap')
        .find("input[class*='-departure']")
        .val(elementValue[1]);
    }
    if ($('.datepicker--buttons').find('.select-btns__submit').length === 0) {
      $('.datepicker--buttons').append($(applyButton));
    }
  },
  onSelect: (formattedDate, date, inst) => {
    if (formattedDate.split(',').length > 1) {
      $(inst.el).val(formattedDate.split(',')[0]);
      $(inst.el)
        .parents('.datepicker-wrap')
        .siblings('.datepicker-wrap')
        .find("input[class*='-departure']")
        .val(formattedDate.split(',')[1]);
    }
  },
  onHide: () => {
    $('.select-btns__submit').remove();
  }
});

//if ($("input[class*='-arrival'")) {
   // $("input[class*='-arrival'").datepicker().data('datepicker').$datepicker.children('.datepicker--buttons').on("click", (e) => {
       // if (e.target.dataset.action === 'clear') {
          //  $("input[class*='-departure'").val("");
        //}
   // });
//}



$('.datepicker--buttons').on('click', (e) => {
  if ($(e.target).hasClass('select-btns__submit')){
    $("input[class*='-arrival'").datepicker().data('datepicker').hide();
  }    
});

$('.date-dropdown').on('click', (e) => {
  if ($(e.target).hasClass('form_select-departure')
  || $(e.target).hasClass('booking-departure')
  || $(e.target).siblings("input[class*='-departure']").length > 0
  || $(e.target).parent().siblings("input[class*='-departure']").length > 0) {
    $(e.target)
      .parents('.datepicker-wrap')
      .siblings('.datepicker-wrap')
      .find('.input').datepicker()
      .data('datepicker').show();        
  }
});



