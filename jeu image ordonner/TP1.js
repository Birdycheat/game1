function ntm(ch)
{
	if(ch === 'undefined')
		return '';
	else
		return ch;
}	



function int2letters(a) // This function works only when a-var is between 0 and 999
{
	if(a <= 999 && a >= 0)
	{
		if(a == 0)
		{
			return 'zéro'		
		}
		var chaine_retour;
		var units = ['un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
		var dixaines = ['dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante','soixante-dix', 'quatre-vingt', 'quatre-vingt dix'];
		var chiant = ['onze','douze', 'treize', 'quatorze', 'quinze', 'seize'];

		var Tab = [a % 10, ((a % 100) - a % 10)/10, (a - (a % 100))/100];
		if((Tab[0] == 1) && (Tab[1] != 0) && (Tab[1] != 1) && (Tab[1] != 7) && (Tab[1] != 8) && (Tab[1] != 9))
			chaine_retour = "et un";
		

		else if((Tab[0] == 1) && (Tab[1] == 8))
			chaine_retour = "un";

		else if((Tab[0] > 6) || ((Tab[1] != 9) && (Tab[1] != 7) && (Tab[1] != 1)))
			chaine_retour = "" + units[Tab[0] - 1];
		if(Tab[1] != 0)
		{
			if(Tab[1] != 0 && Tab[1] != 7 && Tab[1] != 9)
				chaine_retour = dixaines[Tab[1] - 1] + " " + ntm(chaine_retour);
			else if((Tab[1] == 7 || Tab[1] == 9) && Tab[0] > 6)
				chaine_retour = dixaines[Tab[1] - 2] + "-dix " + ntm(chaine_retour);
			else if((Tab[0] > 0 && Tab[0] < 7 && (Tab[1] == 1 || Tab[1] == 7 || Tab[1] == 9)) && (Tab[0] != 1 || Tab[1] != 7))
			{
				if(Tab[1] == 1)
					chaine_retour = chiant[Tab[0] - 1];
				else
					chaine_retour = dixaines[Tab[1] - 2] + "-" + chiant[Tab[0] - 1];		
			}
			else if(chaine_retour != '')
				chaine_retour = dixaines[Tab[1] - 1] + " " + ntm(chaine_retour);
		if(Tab[1] == 8 && Tab[0] == 0)
			chaine_retour = dixaines[Tab[1] - 1] + 's';		
				
		else if((Tab[0] == 1) && (Tab[1] == 7))
			chaine_retour = dixaines[Tab[1] - 2] + " et " + chiant[0];
		}
		if(Tab[2] != 0)
		{
			if((Tab[2] != 1) && (Tab[0] == 0) && (Tab[1] == 0))
				chaine_retour = units[Tab[2] - 1] + " cents";
			else if(Tab[2] == 1)
				chaine_retour = 'cent ' + ntm(chaine_retour);	
			else if(Tab[2] != 1)
				chaine_retour = units[Tab[2] - 1] + ' cent ' + ntm(chaine_retour);				
		
		}
		
		
		
	return chaine_retour;
	}
	else
		return '';
}


function generate_table()
{
	// Avoir la référence de "body"
	var body = document.getElementsByTagName("body")[0];
	
	// Créer une balise <table> et <tbody>
	var tbl = document.createElement("table");
	var tblBody = document.createElement("tbody");

	// Création des cellules
	for(var i = 0; i < 4; i++)
	{
		var row = document.createElement("tr");

		for(var j = 0; j < 4; j++)
		{
			var cell = document.createElement("td");
			var cellText = document.createTextNode("("+i+","+j+")");
			cell.appendChild(cellText);
			row.appendChild(cell);
		}
		tblBody.appendChild(row);
	}

	

	tbl.appendChild(tblBody);
	body.appendChild(tbl);

	tbl.setAttribute("border", "2");
	






}
	var button = document.createElement("input");
	button.type = "button";
	button.value = "Valider";
	button.name = "Valider";
	button.setAttribute("onclick", "win_request()");
	document.appendChild(button);
















































//alert(int2letters(parseInt(prompt('Entrer un nombre netre 0 et 999'), 10)));
