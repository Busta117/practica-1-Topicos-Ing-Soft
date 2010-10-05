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
			
			console.log(candidatos+" - "+votos);
			var arrayTempVotos = [];
			var arrayTempCand =  [];
							
			for(var k=0 ; k<votos.length; k++){
				arrayTempVotos.push(votos[k]);
			}			
			arrayTempVotos.sort(function(a,b){return a - b});
			for(var j=0 ; j<votos.length ; j++){
				for(var h=0 ; h<votos.length ; h++){
					console.log(votos[j]+" - "+arrayTempVotos[h]);
					if(votos[j] == arrayTempVotos[h]){
						arrayTempCand.push(candidatos[h]);
						break;
					}
				}
			}
			
			console.log(arrayTempCand+" - "+arrayTempVotos);
				
			var cien = 0;
			for(var i=0 ; i<votos.length ; i++){
				cien += votos[i];
			}

			arrayTempCand.reverse();
			arrayTempVotos.reverse();
			
			var contenido = "<tr><td class='topTable' colspan='3'><h3>Resultados Globales por Candidato:</h3></td></tr>";
			var cont = 0;
			var par = "";
			for(var p in arrayTempCand){
				if(cont%2 == 0){par = "trImpar";}
				else{par = "trPar";}
				contenido += "<tr class='"+par+"'><td class='table1td'>" + arrayTempCand[p] + "</td>";
				contenido += "<td class='table1td'>" + arrayTempVotos[p] + "</td>";
				contenido += "<td class='table1td'>" + (arrayTempVotos[p]*100/cien) + "%</td></tr>";
				cont++;
			}
			
			var ni = document.getElementById('globales');
			var newTable = document.createElement('table');
			newTable.setAttribute('id','globalResult');
			newTable.innerHTML = contenido;
			ni.appendChild(newTable);						
		};
		
		p.graficar = function(candidatos, votos){
		
			var cien = 0;
			for(var i=0 ; i<votos.length ; i++){
				cien += votos[i];
			}
			
			var tabla = "";
			var td = "";	
			tabla += "<tr>";
			for(var b=0;b<candidatos.length;b++){				
					tabla += "<td align='center' valign='bottom'>";
					td = "<table width='100%' cellpadding='0' border='0'><tr><td></td><td align='center' valign='bottom'>"+parseInt(votos[b]*100/cien)+"%</td><td></td></tr>   <tr><td></td><td bgcolor='orange' height='"+parseInt(votos[b]*100/cien)*2+"' width='50%'>  </td><td></td></tr></table>"
					tabla += td;
					tabla += "</td>";		
			}
			
			tabla += "</tr><tr>";
			for(var a=0;a<candidatos.length;a++){
				tabla += "<td>"+candidatos[a]+"</td>";
			}
			tabla += "</tr>";			
			var ei = document.getElementById('globales');
			var graphTable = document.createElement('table');
			graphTable.setAttribute('id','graph');
			graphTable.innerHTML = tabla;
			ei.appendChild(graphTable);
			
		}

		p.cargandoMsg = function(){
			var contenido = "Cargando...<br /><img src='./images/loading.gif' width='3%'></img>";
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
				contenido1 = contenido1 + "<tr class='"+par+"'><td class='table1td'>" + columna1[columna1.length-1] + "</td>";
			}else{
				contenido1 += "<tr class='"+par+"'><td class='table1td'> </td>";	
			}
			if(columna2[columna2.length-1] != col2){
				contenido1 = contenido1 + "<td class='table1td'>" + columna2[columna2.length-1] + "</td>";
			}else{
				contenido1 += "<td  class='table1td'> </td>";	
			}
			if(columna3[columna3.length-1] != col3){
				contenido1 = contenido1 + "<td  class='table1td'>" + columna3[columna3.length-1] + "</td>";
			}else{
				contenido1 += "<td  class='table1td'> </td>";	
			}
			contenido1 = contenido1 + "<td  class='table1td'>" + columna4[columna4.length-1] + "</td>";
			contenido1 = contenido1 + "<td class='table1td'>" + columna5[columna5.length-1] + "</td></tr>";

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

