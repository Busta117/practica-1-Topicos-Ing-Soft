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
		this.boton = panel.getElementsByTagName("button")[0];
		this.key = panel.getElementsByTagName("input")[0];
		
		this.subscriptor = new MVCGooogleDocs.SubsVistaInterface;
		var self = this;



		this.boton.onclick = function() {
			//console.log(self.key.value)
			self.boton.disabled=true;
			self.subscriptor.alClickCargar(self.key.value);
		};

	},
	proto: function(p) {
		var contenido = "";

		p.setSubscriptor = function(obj) {
			this.subscriptor = obj;
		};


		p.cargandoMsg = function(){
			var contenido = "Cargando...";
			this.panel.getElementsByTagName("table")[0].innerHTML = contenido;
			
		};

		p.mostrarDatos = function(columna1, columna2, columna3, columna4, columna5) {
			var contenido1 = "";
			contenido1 = contenido1 + "";
			for (d in columna5) {
				contenido1 = contenido1 + "<tr><td>" + columna1[d] + "</td>";
				contenido1 = contenido1 + "<td>" + columna2[d] + "</td>";
				contenido1 = contenido1 + "<td>" + columna3[d] + "</td>";
				contenido1 = contenido1 + "<td>" + columna4[d] + "</td>";
				contenido1 = contenido1 + "<td>" + columna5[d] + "</td></tr>";

			}
			contenido1 += "<br />";
			contenido += contenido1;

			this.panel.getElementsByTagName("table")[0].innerHTML = contenido;
		};
	}
});

