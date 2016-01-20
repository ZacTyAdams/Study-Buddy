var stage;

function init()
{
	document.addEventListener("DOMContentLoaded", allLoaded, false);
	document.getElementById("item").value = localStorage.getItem("blacklist");
	if(localStorage.getItem("timer") != null){
		document.getElementById("time").value = localStorage.getItem("timer");
	}
	else
		document.getElementById("time").value = "time in minutes";
}

function saveChanges(){
	console.log("in save changes function");
	var theValue = document.getElementById("item").value;
	var theValue2 = document.getElementById("time").value;
	localStorage.setItem("blacklist", theValue);
	localStorage.setItem("timer", theValue2);
	console.log(localStorage.getItem("blacklist"));

}

function allLoaded(event)
{
	document.removeEventListener("DOMContentLoaded", allLoaded, false);

	stage = {};

	stage.startScreenEntrance = document.querySelector(".startScreen_cont_entrance");

	stage.startScreenEntance_tl_line0 = document.querySelector(".startScreen_entranceLine0");
	stage.startScreenEntance_tl_line1 = document.querySelector(".startScreen_entranceLine1");
	stage.startScreenEntrance_soundTrue = document.querySelector(".startScreen_soundOption_true");
	stage.startScreenEntrance_soundFalse = document.querySelector(".startScreen_soundOption_false");

	var delay_test = setTimeout(entranceScreen_soundOptionsDrop, 1000);
}

function entranceScreen_soundOptionsDrop()
{
	stage.startScreenEntrance.addEventListener("webkitTransitionEnd", entranceScreen_soundOptionsDrop_step0, false);
	stage.startScreenEntrance.addEventListener("transitionend", entranceScreen_soundOptionsDrop_step0, false);

	stage.startScreenEntrance.classList.remove("startScreen_cont_hide");
	stage.startScreenEntrance.classList.add("startScreen_cont_show");
}

function entranceScreen_soundOptionsDrop_step0(event)
{
	stage.startScreenEntrance.removeEventListener("webkitTransitionEnd", entranceScreen_soundOptionsDrop_step0, false);
	stage.startScreenEntrance.removeEventListener("transitionend", entranceScreen_soundOptionsDrop_step0, false);

	stage.startScreenEntance_tl_line0.classList.remove("startScreen_tl_hide");
	stage.startScreenEntance_tl_line0.classList.add("startScreen_tl_show");

	stage.startScreenEntance_tl_line1.classList.remove("startScreen_tl_hide");
	stage.startScreenEntance_tl_line1.classList.add("startScreen_tl_show");

	stage.startScreenEntance_tl_line1.addEventListener("webkitTransitionEnd", entranceScreen_soundOptionsDrop_step1, false);
	stage.startScreenEntance_tl_line1.addEventListener("transitionend", entranceScreen_soundOptionsDrop_step1, false);
}

function entranceScreen_soundOptionsDrop_step1(event)
{
	stage.startScreenEntance_tl_line1.removeEventListener("webkitTransitionEnd", entranceScreen_soundOptionsDrop_step1, false);
	stage.startScreenEntance_tl_line1.removeEventListener("transitionend", entranceScreen_soundOptionsDrop_step1, false);

	stage.startScreenEntrance_soundFalse.addEventListener("webkitTransitionEnd", entranceScreen_soundOptionsDrop_step2, false);
	stage.startScreenEntrance_soundFalse.addEventListener("transitionend", entranceScreen_soundOptionsDrop_step2, false);

	stage.startScreenEntance_tl_line1.classList.remove("startScreen_tl_delay");


	stage.startScreenEntrance_soundTrue.classList.remove("startScreen_soundOption_hide");
	stage.startScreenEntrance_soundTrue.classList.add("startScreen_soundOption_show");

	stage.startScreenEntrance_soundFalse.classList.remove("startScreen_soundOption_hide");
	stage.startScreenEntrance_soundFalse.classList.add("startScreen_soundOption_show");
}

function entranceScreen_soundOptionsDrop_step2(event)
{
	stage.startScreenEntrance_soundTrue.removeEventListener("webkitTransitionEnd", entranceScreen_soundOptionsDrop_step2, false);
	stage.startScreenEntrance_soundFalse.removeEventListener("transitionend", entranceScreen_soundOptionsDrop_step2, false);

	stage.startScreenEntrance_soundFalse.classList.remove("startScreen_br_delay");

	entranceScreen_soundBtnsInit(true);
}

function entranceScreen_soundBtnsInit(run)
{
	if(run)
	{
		stage.startScreenEntrance_soundTrue.addEventListener("click", entranceScreen_soundBtnsEvent, false);
		stage.startScreenEntrance_soundFalse.addEventListener("click", entranceScreen_soundBtnsEvent, false);

		stage.startScreenEntrance_soundTrue.addEventListener("touchend", entranceScreen_soundBtnsEvent, false);
		stage.startScreenEntrance_soundFalse.addEventListener("touchend", entranceScreen_soundBtnsEvent, false);
	}

	else
	{
		stage.startScreenEntrance_soundTrue.removeEventListener("click", entranceScreen_soundBtnsEvent, false);
		stage.startScreenEntrance_soundFalse.removeEventListener("click", entranceScreen_soundBtnsEvent, false);

		stage.startScreenEntrance_soundTrue.removeEventListener("touchend", entranceScreen_soundBtnsEvent, false);
		stage.startScreenEntrance_soundFalse.removeEventListener("touchend", entranceScreen_soundBtnsEvent, false);

		stage.startScreenEntrance_soundTrue.classList.add("startScreen_optionDisabled");
		stage.startScreenEntrance_soundFalse.classList.add("startScreen_optionDisabled");
	}
}

function entranceScreen_soundBtnsEvent(event)
{

	entranceScreen_soundBtnsInit(false);

	for(var c = 0; c < event.target.classList.length; c++)
	{
		var cl = event.target.classList[c];

		if(cl === "startScreen_soundOption_true" || cl === "startScreen_soundOption_false")
		{
			if(cl === "startScreen_soundOption_true")
			{
				stage.startScreenEntrance_soundFalse.classList.remove("startScreen_soundOption_show");
				stage.startScreenEntrance_soundFalse.classList.add("startScreen_soundOption_hide");
				var input = document.getElementById("item").value;
				alert(input + " have been added to the blacklist");
				console.log(input);
				saveChanges();
				chrome.runtime.reload();
				chrome.tabs.getCurrent(function(tab){
					chrome.tabs.remove(tab.id, function(){});
				});

			}

			if(cl === "startScreen_soundOption_false")
			{
				stage.startScreenEntrance_soundTrue.classList.remove("startScreen_soundOption_show");
				stage.startScreenEntrance_soundTrue.classList.add("startScreen_soundOption_hide");
				console.log("close was pressed");
				chrome.runtime.reload();
				chrome.tabs.getCurrent(function(tab){
					chrome.tabs.remove(tab.id, function(){});
				});
			}
		}
	}

	entranceScreen_soundOptionsRemoveTitle();
}

function entranceScreen_soundOptionsRemoveTitle()
{
	stage.startScreenEntance_tl_line0.classList.add("startScreen_tl_delay");

	stage.startScreenEntance_tl_line0.classList.remove("startScreen_tl_show");
	stage.startScreenEntance_tl_line0.classList.add("startScreen_tl_hide");

	stage.startScreenEntance_tl_line1.classList.remove("startScreen_tl_show");
	stage.startScreenEntance_tl_line1.classList.add("startScreen_tl_hide");

	stage.startScreenEntance_tl_line0.addEventListener("webkitTransitionEnd", entranceScreen_soundOptionsRise, false);

	stage.startScreenEntance_tl_line0.addEventListener("transitionend", entranceScreen_soundOptionsRise, false);
}

function entranceScreen_soundOptionsRise(event)
{
	stage.startScreenEntance_tl_line0.removeEventListener("webkitTransitionEnd", entranceScreen_soundOptionsRise, false);

	stage.startScreenEntance_tl_line0.removeEventListener("transitionend", entranceScreen_soundOptionsRise, false);

	stage.startScreenEntrance.classList.remove("startScreen_cont_show");
	stage.startScreenEntrance.classList.add("startScreen_cont_hide");
}

init();