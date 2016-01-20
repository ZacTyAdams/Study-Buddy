var y = 0;
var x = 0;


chrome.browserAction.onClicked.addListener(function(tab) {

	var timer = 10, minutes, seconds;
  // No tabs or host permissions needed!
  	if(localStorage.getItem("timer") != "time in minutes" && localStorage.getItem("timer") != null){
    	//alert("Study time not set, defaulting to 10 minutes");
    	//console.log(localStorage.getItem("timer"));
    	var timer = localStorage.getItem("timer").match(/\d+/)[0], minutes, seconds;
    }
    else{
    	timer = 10;
    }
    	//console.log("timer set localStorage"+localStorage.getItem("timer").match(/\d+/)[0]);
    
    if(localStorage.getItem("blacklist") == null || localStorage.getItem("blacklist").match(/\S+/g) == null){
    	alert("No blacklist present, redirecting to options menu");
    	clearInterval(x);
		x = 0; //resetting
		//console.log("its done");
		chrome.browserAction.setBadgeText({text: ""});
		chrome.tabs.create({url:"options/index.html"});
		y = 1
    }
    else{
    	//console.log(localStorage.getItem("blacklist").match(/\S+/g));
    	var blist = localStorage.getItem("blacklist").match(/\S+/g);
    }
    
    var violation = false;

    //console.log(blist);

    if(x == 0 && y == 0){ //click level 1
    	//showing notification
    	//console.log("starting notification");
		chrome.notifications.create("Timerstarted", {
			type: 'basic',
			iconUrl: 'prog.png',
			title:'The timer has started',
			message: 'Click here to change settings, or click the icon to stop timer!',
			isClickable: true
		}, function(note){
			//console.log("in function");
			timer2 = setTimeout(function(){chrome.notifications.clear('Timerstarted');}, 2000);
			chrome.notifications.onClicked.addListener(function(dothis){
				//console.log("it was clicked");
				chrome.notifications.clear('Timerstarted', function(){
					clearInterval(x);
		            x = 0; //resetting
		            //console.log("its done");
		            chrome.browserAction.setBadgeText({text: ""});
		            chrome.tabs.create({url:"options/index.html"});
		            return;
				});
			});
		});

    	//starting timer
	    x = setInterval(function () {
	        minutes = parseInt(timer / 60, 10);
	        seconds = parseInt(timer % 60, 10);
	    	chrome.browserAction.setBadgeText({text: timer.toString()});
	        minutes = minutes < 10 ? "0" + minutes : minutes;
	        seconds = seconds < 10 ? "0" + seconds : seconds;

	        if(timer % 5 == 0){
	        	chrome.tabs.query({}, function(tabs){
			  		for(var i = 0; i < tabs.length; i++){
					  	var tab_url = tabs[i].url;
					  	for(var j = 0; j < blist.length; j++){
					  		//console.log(blist[j]);
					  		if(tab_url.indexOf(blist[j]) > -1){
					  			//console.log(blist[j] + " is not allowed");
					  			violation = true;
					  		}
					  	}
					}
				});
				if(violation){
					alert("Get back to work");
					violation = false;
				}
	        }

	        if (--timer == 0) {
	            clearInterval(x);
	            x = 0; //resetting
	            //console.log("its done");
	            chrome.browserAction.setBadgeText({text: ""});
	            chrome.notifications.create('cancelled', {
					type: 'basic',
					iconUrl: 'prog.png',
					title:'Timer Finished',
					message: "You're now free to browse",

				},function(){
					timer3 = setTimeout(function(){
						chrome.notifications.clear('cancelled');
						chrome.runtime.reload();
				}, 5000);
				});
	            //chrome.runtime.reload();
	        }
	   	}, 1000);

	    /*if(x == 0){
	    	//console.log("off");
	    }
	    else
	    	//console.log("on");*/
	}
	else if(x != 0){ //click level 2
		clearInterval(x);
		x = 0; //resetting
		//console.log("its done");
		chrome.browserAction.setBadgeText({text: ""});
		chrome.notifications.create('cancelled', {
			type: 'basic',
			iconUrl: 'prog.png',
			title:'Timer Cancelled',
			message: 'Timer has been cancelled, click here to change settings',

		},function(){
			timer3 = setTimeout(function(){
				chrome.notifications.clear('cancelled');
				chrome.runtime.reload();
		}, 5000);
		});
	}
});
