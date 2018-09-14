window.count = 0;



function tableau_nbr_sans_remise(mini, maxi)
{
	var tmp;
	
	var images = [];
	var seed = parseInt(Math.random() * (maxi - mini));


	
	for(var i = mini; i <= maxi; i++)
		images.push(i);		
		//var image = new Image();
		//image.src = 'pictures/fox/4x4/' + i + '.jpeg';
		//images.push(image);
		
	for(var i = 0; i < seed; i++)
	{
		var indexA = parseInt(Math.random() * (maxi - mini + 1));
		var indexB = parseInt(Math.random() * (maxi - mini + 1));	

		tmp = images[indexB];
		images[indexB] = images[indexA];
		images[indexA] = tmp;
	}
	images.push('  ');

	return images;
}








function generate_table()
{
	// Avoir la référence de "body"
	var body = document.getElementsByTagName("body")[0];
	
	// Créer une balise <table> et <tbody>
	var tbl = document.createElement("table");
	var tblBody = document.createElement("tbody");
	
	
	// Tableau mélangé qui va déterminer le contenant de chaque case

	// window.Tab = tableau_nbr_sans_remise(1, 15);
	window.Tab = [15,2,3,4,5,6,7,8,9,10,11,12,13,14,1,"  "];

	// Création des cellules
	for(var i = 0; i < 4; i++)
	{
		var row = document.createElement("tr");

		for(var j = 0; j < 4; j++)
		{
			var cell = document.createElement("td");
			
			var cellText = document.createTextNode(Tab[j + 4*i]);
			cell.appendChild(cellText);
			cell.setAttribute("onclick", "check_move(this)");
			cell.setAttribute("src", "/pictures/fox/4x4/" + j + 4*i + ".jpg");
			cell.background;
			cell.name = i + "," + j;
			row.appendChild(cell);
		}
		tblBody.appendChild(row);
	}
	


	tbl.appendChild(tblBody);
	body.appendChild(tbl);
	tbl.setAttribute("border", "1");
	tbl.setAttribute("table-layout", "fixed");
	tbl.setAttribute("width", "110px");
	tbl.setAttribute("text-align", "center");
	tbl.setAttribute("border-color", "black");
	tbl.setAttribute("background-color", "black");
	
	document.getElementsByTagName("input")[0].remove();


	// Création d'un bouton "valider"

	var button = document.createElement("input");
	button.type = "button";
	button.value = "Valider";
	button.name = "Valider";
	button.setAttribute("onclick", "win_request()");
	document.body.appendChild(button);
	

}

function changeover_switch(line1, cell1, line2, cell2) // Permute la cellule 1 de coordonnées (cell1, line1) avec la cellule 2 de coordonnées (cell2, line2)
{
	var content1 = document.getElementsByTagName("table")[0].rows[line1].cells[cell1].innerHTML;
	var content2 = document.getElementsByTagName("table")[0].rows[line2].cells[cell2].innerHTML;

	document.getElementsByTagName("table")[0].rows[line2].cells[cell2].innerHTML = content1;
	document.getElementsByTagName("table")[0].rows[line1].cells[cell1].innerHTML = content2;
	window.count += 1;
}


function number2letters(a)
{

	if (a == 0)
		return 'zéro';
	

	var Premiers_chiffres = ["un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize"];
	var Dizaines = ["vingt", "trente", "quarante", "cinquante", "soixante", "quatre-vingt"];
	var Tab = [a % 10, ((a % 100) - a % 10)/10, (a - a % 100)/100];
	
	var chaine_retour = '';


	// On commence par gérer les unités
	
	if (a % 100 < 17 && a % 100 != 0)
	{
		if (Tab[2] == 0)
					
			return Premiers_chiffres[a - 1].charAt(0).toUpperCase() + Premiers_chiffres[a - 1].substring(1);
		else if (a % 100 != 10)
			chaine_retour = Premiers_chiffres[(a % 100) - 1];
	}	
	else if (Tab[0] == 1)
	{
		if ((Tab[1] < 7) && (Tab[1] != 0) && (Tab[1] != 1))
			chaine_retour = "et-" + Premiers_chiffres[0];
		if (Tab[1] == 8 || Tab[1] == 0)
			chaine_retour = Premiers_chiffres[0];
	}	
	else if ((Tab[1] != 7 && Tab[1] != 9 && Tab[1] != 1) || Tab[0] > 6)
		chaine_retour = Premiers_chiffres[Tab[0] - 1];

	
	// on gère les dizaines

	if (Tab[1] != 0)
	{	
		if (Tab[0] < 7)
		{
			if (Tab[1] == 7)
			{
				if (Tab[0] == 1)
				{
					chaine_retour = Dizaines[4] +'-et-'+ Premiers_chiffres[10];		
				}
				else
					chaine_retour = Dizaines[4] + '-' + Premiers_chiffres[Tab[1]*10 + Tab[0] - 61];
			}
			if (Tab[1] == 9)
			{
				chaine_retour = Dizaines[5] + '-' + Premiers_chiffres[Tab[1]*10 + Tab[0] - 81];		
			}
		}
		else if (Tab[1] == 1)
		{
			chaine_retour = Premiers_chiffres[9] + '-' + chaine_retour;
		}
		else if (Tab[1] < 7)
		{
			chaine_retour = Dizaines[Tab[1] - 2] + '-' + chaine_retour;	
		}
		if (Tab[1] < 9 && Tab[0] == 0 && Tab[1] != 7)
		{
			if (Tab[1] == 8)
				chaine_retour = Dizaines[Dizaines.length - 1] + 's';
			else 
				chaine_retour = Dizaines[Tab[1] - 2];
		}
		if (0 < Tab[0] && Tab[0] < 7 && Tab[1] > 1 && Tab[1] < 7)
			chaine_retour = Dizaines[Tab[1] - 2] + '-' + chaine_retour;
		if ((Tab[1] == 9 || Tab[1] == 7) && Tab[0] > 6)
			chaine_retour = Dizaines[1/2 * (Tab[1] + 1)] + '-' + Premiers_chiffres[9] + '-' + chaine_retour; // Petite pirouette mathématique
		if (Tab[1] == 8 && Tab[0] != 0)
			chaine_retour = Dizaines[5] + '-' + Premiers_chiffres[Tab[0] - 1];
	}


	// on gère les centaines
	
	if (Tab[2] == 1)
	{		
		if (Tab[1] == 0 && Tab[0] == 0)
			chaine_retour = 'cent';
		else
			chaine_retour = "cent-" + chaine_retour;
	}	
	else if (Tab[2] > 1)
	{
		if (Tab[1] == 0 && Tab[0] == 0)
			chaine_retour = Premiers_chiffres[Tab[2] - 1] + '-' + 'cents';
		else
			chaine_retour = Premiers_chiffres[Tab[2] - 1] + '-cent-' + chaine_retour;
	}
	
	if (a % 100 == 10 && Tab[2] > 0)
	{
		if (Tab[2] == 1)
			chaine_retour = 'cent-dix';
		else
			chaine_retour = Premiers_chiffres[Tab[2] - 1] + '-cent-dix';
	}

	chaine_retour = chaine_retour.charAt(0).toUpperCase() + chaine_retour.substring(1);

	
	return chaine_retour;
}

/*for(i = 0; i < 1000; i++)
	console.log(number2letters(i)); */

function check_move(element)
{

		ligne = parseInt(element.name[0]);
		colonne = parseInt(element.name[2]);
		for(var i = -1; i <= 1; i++)
		{
			for(var j = -1; j <= 1; j++)
			{

			

				if(ligne + i >= 0 && colonne + j >= 0 && ligne + i < 4 && colonne + j < 4 && (i == 0 || j == 0))
				{
					if(document.getElementsByTagName("table")[0].rows[ligne + i].cells[colonne + j].innerHTML === "  ")
					{
						var test = parseInt(document.getElementsByTagName("table")[0].rows[ligne + i].cells[colonne + j].innerHTML);




						changeover_switch(ligne + i, colonne + j, ligne, colonne);
						i = 3;
						j = 3;
					}		
				}		
			}
		}

}

function restore_table()
{
	for (var i = 0; i < 4; i++)
	{
		for (j = 0; j < 4; j++)
		{
			if (document.getElementsByTagName("table")[0].rows[i].cells[j].innerHTML != window.Tab[4*i + j])
	
				document.getElementsByTagName("table")[0].rows[i].cells[j].innerHTML = window.Tab[4*i + j];
		}
	}
}

function win_request()
{
	
	var body = document.getElementsByTagName("body")[0];
	var p3 = document.getElementsByTagName("p3")[0];

	for (var i = 0; i < 15; i++)
	{
		if (document.getElementsByTagName("table")[0].rows[parseInt(i/4)].cells[i % 4].innerHTML != i + 1)
		{
			
			p3.innerHTML = "Vous n'avez pas fini ! (Vous avez fait "+ window.count +" coups)";
			body.appendChild(p3);			
			return 0;
		}	
	}

	p3.innerHTML = "Vous avez fini avec " + window.count + " coups !";
	body.appendChild(p3);
	
	
	return 1;

	



}













// marc.champesme@lipn.univ-paris13.fr B303
