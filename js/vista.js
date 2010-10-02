var MVCGooogleDocs = window.MVCGooogleDocs || {};

MVCGooogleDocs.SubsVistaInterface = Oops.constructor({   
	proto: function(p) {
		p.alClickCargar = function() {
			console.log("alClickCargar");
		};
	}
});


MVCGooogleDocs.Vista = Oops.constructor({
	init: function(panel) {

		this.panel = panel;
		this.boton = document.getElementById("cargar");
		this.borrar = document.getElementById("borrar");
		this.key = panel.getElementsByTagName("input")[0];

		this.subscriptor = new MVCGooogleDocs.SubsVistaInterface;
		var self = this;


		this.boton.onclick = function() {
			self.boton.disabled=true;
			self.borrar.disabled = false;
			self.subscriptor.alClickCargar(self.key.value);
		};
		
		this.borrar.onclick = function(){
		//	self.boton.disabled=false;
			self.borrarTodo();
			self.borrar.disabled = true;
		};
		
		this.borrarTodo = function(){
			var d = document.getElementById('table');
			var olddiv = document.getElementById('resultados');
			d.removeChild(olddiv);
		};
		

	},
	proto: function(p) {
		var contenido = "";

		var col1 = "";
		var col2 = "";
		var col3 = "";
		var col4 = "";
		var col5 = "";

		p.setSubscriptor = function(obj) {
			this.subscriptor = obj;
		};

		p.votosGlobales = function(candidatos, votos){
			
			var contenido = "<tr><td class='topTable' colspan='2'><h3>Resultados Globales por Candidato:</h3></td></tr>";
			var cont = 0;
			var par = "";
			for(var p in candidatos){
				if(cont%2 == 0){par = "trImpar";}
				else{par = "trPar";}
				contenido += "<tr class='"+par+"'><td>" + candidatos[p] + "</td>";
				contenido += "<td>" + votos[p] + "</td></tr>";
				cont++;
			}
			
			
			var ni = document.getElementById('globales');
			var newTable = document.createElement('table');
			newTable.setAttribute('id','globalResult');
			newTable.innerHTML = contenido;
			ni.appendChild(newTable);
			
		}

		p.cargandoMsg = function(){
			var contenido = "Cargando...";
			var ni = document.getElementById('myDiv');
			var newdiv = document.createElement('div');
			var divIdName = 'cargando';
			newdiv.setAttribute('id',divIdName);
			newdiv.innerHTML = contenido+"<br />";
			ni.appendChild(newdiv);			
		};

		var cont = 0;
		p.mostrarDatos = function(columna1, columna2, columna3, columna4, columna5, completo) {
			var contenido1 = "";
			if(completo){
				var d = document.getElementById('myDiv');
				var olddiv = document.getElementById('cargando');
				d.removeChild(olddiv);
			}
			if(cont > 0){
				var d = document.getElementById('table');
				var olddiv = document.getElementById('resultados');
				d.removeChild(olddiv);				
			}
			if(cont==0){
				contenido1 = "<tr><td class='topTable' colspan='5'><h2>Total Votos por Mesa:</h2></td></tr>";
			}


			var par = "";
			if(cont%2 == 0){par = "trImpar";}
			else{par = "trPar";}
			if(columna1[columna1.length-1] != col1){
				contenido1 = contenido1 + "<tr class='"+par+"'><td>" + columna1[columna1.length-1] + "</td>";
			}else{
				contenido1 += "<tr class='"+par+"'><td> </td>";	
			}
			if(columna2[columna2.length-1] != col2){
				contenido1 = contenido1 + "<td>" + columna2[columna2.length-1] + "</td>";
			}else{
				contenido1 += "<td> </td>";	
			}
			if(columna3[columna3.length-1] != col3){
				contenido1 = contenido1 + "<td>" + columna3[columna3.length-1] + "</td>";
			}else{
				contenido1 += "<td> </td>";	
			}
			contenido1 = contenido1 + "<td>" + columna4[columna4.length-1] + "</td>";
			contenido1 = contenido1 + "<td>" + columna5[columna5.length-1] + "</td></tr>";

			col1 = columna1[columna1.length-1];
			col2 = columna2[columna2.length-1];
			col3 = columna3[columna3.length-1];

			contenido +=  contenido1;

			cont++;
			var ni = document.getElementById('table');
			var newTable = document.createElement('table');
			newTable.setAttribute('id','resultados');
			newTable.innerHTML = contenido;
			ni.appendChild(newTable);
		};
	}
});

