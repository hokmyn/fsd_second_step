import './dropdown-expanded.scss';
import $ from 'jquery';

const minCount = 0;

let currentValue,
    totalGuests = 0,
    labelText = "",
    amenitiesCount;

const guestForms = ["гость", "гостя", "гостей"];
const amenitiesForms = [["спальня", "спальни", "спален"], ["кровать", "кровати", "кроватей"], ["ванная", "ванных", "ванных"]];

let rightEndings = (num, arrForms) => {
    let text;

    if (num >= 11 && num <= 14) {
        text = num + " " + arrForms[2];
        return text;
    }

    switch(num % 10) {
        case 1:
            text = num + " " + arrForms[0];
            break;       
        case 2:
        case 3:
        case 4:
            text = num + " " + arrForms[1];
            break;
        default:
            text = num + " " + arrForms[2];
    }    
    return text;
}
    

$(document).ready(function () {    
    
    $("body").on("click", (e)=> {
        if (!($(e.target).hasClass('select-expanded__label')) && !($(e.target).parents().is('.select-expanded__options')) && $(".select-expanded__options").hasClass("open")) {            
            $(".select-expanded__options").removeClass("open");
        }
    });
    
    $(".select").on("click", () => {
        $(".select-expanded__options").toggleClass("open");
    });

    $(".guests-list .option-counter__number").each(function () {
        totalGuests += Number($(this).text());
    });

    if (totalGuests === 0) {
        $(".guests-list .select-btns__clear").css("visibility", "hidden");
    } else {
        $(".guests-list .select-btns__clear").css("visibility", "visible");
    }
    totalGuests = 0;

    $(".option-counter__item").on("click", (e) => {
        let target = $(e.target);
        if (!target.parents().is('.guests-list_default')) {      
            currentValue = Number(target.siblings(".option-counter__number").html());
            if (target.html() === "-") {
                if (currentValue > minCount) {
                    currentValue--;
                    if (currentValue === minCount)
                        target.addClass("counter_disabled");
                }
            } else {
                currentValue++;
                if (target.siblings(".option-counter__item").hasClass("counter_disabled"))
                    target.siblings(".option-counter__item").removeClass("counter_disabled");
            }
            target.siblings(".option-counter__number").html(currentValue);
            if (target.parents().is('.guests-list')) {
                $(".guests-list .option-counter__number").each(function () {
                    totalGuests += Number($(this).text());
                });
                if (totalGuests === 0) {
                    labelText = "Сколько гостей";
                    $(".guests-list .select-btns__clear").css("visibility", "hidden");
                } else {
                    labelText = rightEndings(totalGuests, guestForms);
                    $(".guests-list .select-btns__clear").css("visibility", "visible");
                }
                $("#guests-label").html(labelText);
                totalGuests = 0;
                if ($(".numAdults").html().trim() === "0") {
                    $(".select-btns__submit").addClass("button_disabled");
                } else {
                    $(".select-btns__submit").removeClass("button_disabled");
                }
            } else {
                $(".amenities-list .option-counter__number").each(function(index){                    
                    if(index > 1)
                        return;
                    amenitiesCount = Number($(this).html());
                    if(amenitiesCount === 0)
                        return;
                    labelText += rightEndings(amenitiesCount, amenitiesForms[index])+", ";
                });                
                $("#amenities-label").html(labelText+"...");
                labelText = "";
            }
        }        
    });

    $(".guests-list .select-btns__clear").on("click", () => {
        $(".guests-list .option-counter__number").html(0);
        $("#guests-label").html("Сколько гостей");
        $(".guests-list .minus").addClass("counter_disabled");
    });

    $(".select-btns__submit").on("click", () => {
        if (!($(".numAdults").html() === "0")) {
            $(".guests-list").removeClass("open");
        }
    });

});