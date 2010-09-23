var MVCGooogleDocs = window.MVCGooogleDocs || {};

MVCGooogleDocs.SubsModeloInterface = Oops.constructor({
	proto: function(p) {
		p.alRecibirDatos = function( columna1, columna2, columna3, columna4, columna5 ) {
		};
	}
});

MVCGooogleDocs.Modelo = Oops.constructor({
	init: function() {
		this.subscriptor = new MVCGooogleDocs.SubsModeloInterface();
	},
	proto: function(p) {
		p.setSubscriptor = function(obj) {
			this.subscriptor = obj;
		};
		p.recibirDatos = function(root) {
			console.log(root);
			this.subscriptor.alRecibirDias(null);
		};
		var nivel = 0;
		var key = '';
		
		var departamento1 = [];	//departamento name
		var departamento2 = [];	//departamento key
		var ciudad1 = [];	//ciudad name
		var ciudad2 = [];	//ciudad key
		var centro1 = [];	//centro name
		var centro2 = [];	//centro key
		var mesa1 = [];	//mesa name
		var mesa2 = [];	//mesa key
		
		
		var columna1 = [];	//departamento
		var columna2 = [];	//ciudad
		var columna3 = [];	//centro
		var columna4 = [];	//mesa
		var columna5 = [];	//votos
		
		
		
		
		p.obtenerDatos = function(nodo) {
			var self = this;
			MVCGooogleDocs.callback = function(root) {
	
				
				var rows = root.table.rows;


				var sale = false;
				var i = 0;
				for ( var r = 0 ; r< rows.length ; r++ ) {
					if(rows[r].c[0].v == ("") ){
						sale = true;
					}
					if(rows[r].c[0].v != ""  && sale == true){
						departamento1[i] = rows[r].c[0].v;
						departamento2[i] = rows[r].c[1].v;
						i++;
					}
				}
				
				
				//sale = false;

				console.log("datos recibidos!");
			//	console.log(nivelA+" - "+nivel);
					if(nodo == 0){
						console.log(departamento1[0]);
						self.subscriptor.alRecibirDatos(columna1, columna2, columna3, departamento1, departamento2);
						key = columna5[0]; 
					}
					
					
					nivel ++;
									
					if(nivel < 6){
						p.obtenerDatos(nivel);
					}else{
						console.log("ultimo hijo!!!!");
					}
					
					
					
						
			}
			
			// Leer de google docs
			var e = document.createElement("script");
			
			//pais
			if(nodo == 0 ){
				console.log("recibiendo datos Pais!");
				e.src = 'http://spreadsheets.google.com/tq?tqx=responseHandler:MVCGooogleDocs.callback&key=0AlumHf6aC2nodFp0bWtoMkU5R2JYMThSRzhCS1FlZmc&pub=0';				
			}
			//departamento
			if(nodo == 1 ){
				console.log("recibiendo datos departamento!");
				e.src = 'http://spreadsheets.google.com/tq?tqx=responseHandler:MVCGooogleDocs.callback&key='+key+'&pub=0';				
			}
			
			e.type="text/javascript";
			document.getElementsByTagName("head")[0].appendChild(e);
		
			
		};
	}
});

