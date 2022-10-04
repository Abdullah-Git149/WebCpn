//toggle-js-start
$('.mobile-toggle').click(function(){
	$('.mobile-wrap').toggleClass('active');
});


//date-picker
jQuery(document).ready(function () {
    jQuery('.datepicker').datepicker({
        format: 'dd-mm-yyyy',
        startDate: '+1d'
    });
});





//location-picker
var optionMenu = document.querySelector(".select-menu"),
  selectBtn = optionMenu.querySelector(".select-btn"),
  options = optionMenu.querySelectorAll(".option"),
  sBtn_text = optionMenu.querySelector(".sBtn-text");

selectBtn.addEventListener("click", () =>
  optionMenu.classList.toggle("active")
);

options.forEach((option) => {
  option.addEventListener("click", () => {
    var selectedOption = option.querySelector(".option-text").innerText;
    sBtn_text.innerText = selectedOption;
    optionMenu.classList.remove("active");
  });
});

//location-picker-two
var optionMenus = document.querySelector(".select-menu-two"),
  selectBtnn = optionMenus.querySelector(".select-btn-two"),
  optionstw = optionMenus.querySelectorAll(".option-two"),
  sBtn_texts = optionMenus.querySelector(".sBtn-text-two");

selectBtnn.addEventListener("click", () =>
  optionMenus.classList.toggle("active")
);

optionstw.forEach((optionth) => {
  optionth.addEventListener("click", () => {
    var selectedOptions = optionth.querySelector(".option-text-two").innerText;
    sBtn_texts.innerText = selectedOptions;
    optionMenus.classList.remove("active");
  });
});


//location-picker-three
var optionMenuth = document.querySelector(".select-menu-three"),
  selectBtnns = optionMenuth.querySelector(".select-btn-three"),
  optionstws = optionMenuth.querySelectorAll(".option-three"),
  sBtn_textss = optionMenuth.querySelector(".sBtn-text-three");

selectBtnns.addEventListener("click", () =>
  optionMenuth.classList.toggle("active")
);

optionstws.forEach((optionth) => {
  optionth.addEventListener("click", () => {
    var selectedOptionss = optionth.querySelector(".option-text-three").innerText;
    sBtn_textss.innerText = selectedOptionss;
    optionMenuth.classList.remove("active");
  });
});











