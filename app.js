const playerForm = document.getElementById('playerForm');
const jsonResponseDiv = document.getElementById('jsonResponseDiv');
const apiKey = "";
const apiUrl = "https://api.playbattlegrounds.com/shards/pc-eu/";

// var form = document.querySelector('form');
// form.addEventListener('submit', function(event) {
	// event.preventDefault();
	// var data = new FormData(form);
	// suchen(data);
// });

// function suchen(data) {
    // var request = new XMLHttpRequest();
    
    // request.open("GET", "daten.txt");
    // request.setRequestHeader("player",document.getElementById("playerName").value);
    // request.addEventListener('submit', function(event) {
        // if(request.Status >= 200 && request.status < 300){
            // console.log(request.responseText);
        // } else {
            // console.warn(request.statusText, request.responseText);
        // }
    // });
    // request.send();
// }

var form = document.querySelector('form');
form.addEventListener('submit', function(event){
	event.preventDefault();
	var name = document.getElementById("playerName").value;
	console.log(name);
	var data = new FormData(form);
	check(name);
});

function check(name){
	var request = new XMLHttpRequest();
	request.open("GET" , apiUrl + "players?filter[playerNames]=" + name);
	request.setRequestHeader("Authorization", "Bearer " + apiKey);
	request.setRequestHeader("Accept", "application/vnd.api+json");
	request.addEventListener('load', function(event){
		if(request.status >= 200 && request.status<300){
			var text = JSON.parse(request.responseText);
			getName(text);
			console.log(text);
			console.log(request.responseText);
			// document.getElementById("jsonResponseDiv").innerHTML = request.responseText;
		}else{
			console.warn(request.statusText);
		}
	});
	request.send();
}

function getName(json){
	document.getElementById("name").innerHTML = json.data[0].attributes.name;
	document.getElementById("matches").innerHTML = "";
	for(var i = 0; i< json.data[0].relationships.matches.data.length; i++){
		document.getElementById("matches").innerHTML += "<Button>Match " + (i+1) +"</Button></br>";
	}
}

function jsonbla(json){
	for(var key in json){
		document.getElementById("jsonResponseDiv").innerHTML += key + " -> ";
		if(Array.isArray(json[key])){
			jsonbla(json[key]);
		}else if(typeof json[key] === 'object'){
			jsonbla(json[key]);
		}
		else{
			document.getElementById("jsonResponseDiv").innerHTML += json[key] + "</br>";
		}
	}
}
