// JavaScript Document



function submit() {
	var strophes = document.getElementById("strophes").value;
	var verses = document.getElementById("verses").value;
	var theme = document.getElementById("theme").value;
	var keywords = document.getElementById("keywords").value;

	document.getElementById("output_container").style.display = "block";
				
	const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			strophes: strophes,
			verses: verses,
			theme: theme,
			keywords: keywords
		})
	};

	var poem = "API Error";
	var link = 'https://www.freeiconspng.com/uploads/error-icon-7.png';
	
	fetch('http://localhost:8080/poem', options)
		.then(async response => {
			poem_obj = await response.json();
			poem = poem_obj.poem;
			poem = poem.replace(/(?:\r\n|\r|\n)/g, '<br>');
			link = poem_obj.link;
			document.getElementById("text").innerHTML = poem;
			document.getElementById("image").src = link;
		})
		.catch(err => {
			poem = 'Sorry, we could not generate a poem for you at this time, please try again later';
			link = 'https://www.freeiconspng.com/uploads/error-icon-7.png';
			console.error(err);
		});
}