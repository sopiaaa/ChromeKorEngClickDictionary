window.onload = function () {
	// since popup will restart its state, so we need to check if localStorage contain 
	// previous information about user choosed dictioanry type or not; if yes, we'll
	// notify user about their previous selected dictionary instead of "SELECT DICTIONARY MODE"
	if (localStorage.getItem("curr_dict") != null) {
		var curr_dict = document.getElementById("dict-type");
		curr_dict.innerHTML = localStorage.getItem("curr_dict");
	} else {
		var curr_dict = document.getElementById("dict-type");
		curr_dict.innerHTML = "SELECT DICTIONARY MODE";
	}
};

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("hist").addEventListener("click", showHist);
	document.getElementById("eng-kor").addEventListener("click", setDict);
	document.getElementById("kor-eng").addEventListener("click", setDict);
	document.getElementById("eng-eng").addEventListener("click", setDict);
});

chrome.runtime.sendMessage({method:"getHist"}, function(response) {
	var hist_div = document.getElementById("history");
	hist_div.innerHTML = response;
	//console.log(response);
});

function showHist() {
	var hist = document.getElementById("history");
	// allow user to click to show/hide the list of history by just clicking on the
	// search history button
	if (window.getComputedStyle(hist).display == "none") {
		//console.log(document.getElementById("history").getComputedStyle("display"));
		hist.style.display = "block";
	} else {
		hist.style.display = "none";
	}
	//console.log("showHist");
}
function setDict() {
	var curr_dict = document.getElementById("dict-type");
	//something
	chrome.runtime.sendMessage({"message":"dictionaries", "data": this.value}, function(response) {
		curr_dict.innerHTML = "";
		if (response == "eng-kor") {
			localStorage.setItem("curr_dict", "ENG -> KOR MODE SELECTED");
		} else if (response == "eng-eng") {
			localStorage.setItem("curr_dict", "ENG -> ENG MODE SELECTED");
		} else if (response == "kor-eng") {
			localStorage.setItem("curr_dict", "KOR -> ENG MODE SELECTED");
		} 
		curr_dict.innerHTML = localStorage.getItem("curr_dict");

	});
}