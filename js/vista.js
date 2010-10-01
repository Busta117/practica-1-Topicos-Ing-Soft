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

		p.setSubscriptor = function(obj) {
			this.subscriptor = obj;
		};


		p.cargandoMsg = function(){
			var contenido = "Cargando...";
			var ni = document.getElementById('myDiv');
			var newdiv = document.createElement('div');
			var divIdName = 'cargando';
			newdiv.setAttribute('id',divIdName);
			newdiv.innerHTML = contenido+"<br />";
			ni.appendChild(newdiv);			
		};

		
		p.mostrarDatos = function(columna1, columna2, columna3, columna4, columna5) {
			var d = document.getElementById('myDiv');
			var olddiv = document.getElementById('cargando');
			d.removeChild(olddiv);

			var contenido1 = "";
			var par = "";
			for (d in columna5) {
				if(d%2 == 0){par = "trPar";}
				else{par = "trImpar";}
				contenido1 = contenido1 + "<tr class='"+par+"'><td>" + columna1[d] + "</td>";
				contenido1 = contenido1 + "<td>" + columna2[d] + "</td>";
				contenido1 = contenido1 + "<td>" + columna3[d] + "</td>";
				contenido1 = contenido1 + "<td>" + columna4[d] + "</td>";
				contenido1 = contenido1 + "<td>" + columna5[d] + "</td></tr>";

			}
			contenido += contenido1;

			var ni = document.getElementById('table');
			var newTable = document.createElement('table');
			newTable.setAttribute('id','resultados');
			newTable.innerHTML = contenido;
			ni.appendChild(newTable);
		};
	}
});

