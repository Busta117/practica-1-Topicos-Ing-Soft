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
		
		p.imprimir = function(texto, nivel){
				var text = "";
				for(var y = 0; y < nivel ; y++){
					text += "\t";
				}	
				console.log(text+""+texto+" en nivel: "+nivel);				
		}
		
		p.setSubscriptor = function(obj) {
			this.subscriptor = obj;
		};
		p.recibirDatos = function(root) {
			//console.log(root);
			this.subscriptor.alRecibirDias(null);
		};

		var nivel = [];
		var nivelSee = 0;
		var key = '';

		var keyList = [];
		var nameList = [];				

		var columna1 = [];	//departamento	nivel = 0
		var columna2 = [];	//ciudad		nivel = 1
		var columna3 = [];	//centro		nivel = 2
		var columna4 = [];	//mesa			nivel = 3
		var columna5 = [];	//votos			nivel = 4		
		
		
		var paraSelf = true;
		var self;

		p.obtenerDatos = function(getKey) {
			key = getKey;//0AlumHf6aC2nodFp0bWtoMkU5R2JYMThSRzhCS1FlZmc

			if(paraSelf){
				nivel = [];
				nivelSee = 0;
				self = this;
			}
			paraSelf = false;

			MVCGooogleDocs.callback = function(root) {
				var rows = root.table.rows;
				var cols = root.table.cols;

				var importante = false;
				var importante2 = false;
				for ( var r = 0 ; r< rows.length ; r++ ) {
					
					if(rows[r].c[0].v == "" ){
						importante = true;
					}
					if(importante && rows[r].c[0].v != ""){
						
						if(rows[r].c[1].v.length > 5){	
							nivel.push(nivelSee+1);				
							keyList.push(rows[r].c[1].v); 
							nameList.push(rows[r].c[0].v);							
						}else{
							//	console.log(rows[r].c[1].f.length);
							if(rows[r].c[1].v != ''){
								importante2 = true;
							}
							
						}
					}
				}
				
				//console.log(nameList[nameList.length-1]);
				
				if(importante2){
					nivelSee++;
					var sumaVotos = 0;
					var importante3 = false;
					for ( var i = 0 ; i< rows.length ; i++ ) {

						if(rows[i].c[0].v == "" ){
							importante3 = true;
						}
						if(importante3 && rows[i].c[0].v != ""){
							p.imprimir(rows[i].c[0].v ,nivelSee);
							sumaVotos += rows[i].c[1].v;
						}

					}
					
					
					//console.log("total votos mesa: "+sumaVotos);
					columna5.push(sumaVotos)
					importante2 = false;
					if(keyList.length > 0){
						nivelSee = nivel.pop();
						p.imprimir(nameList.pop(), nivelSee);
						p.obtenerDatos(keyList.pop());
					}else{
						//organizar datos para mostrar
						//se llama cuando sale del ciclo...
						self.subscriptor.alRecibirDatos(columna1, columna2, columna3, columna4, columna5);				
					}
				}else{
					nivelSee = nivel.pop();
					p.imprimir(nameList.pop(),nivelSee);
					p.obtenerDatos(keyList.pop());

				}
				
			}



			// Leer de google docs
			var e = document.createElement("script");

		//	console.log("recibiendo datos!");
			e.src = 'http://spreadsheets.google.com/tq?tqx=responseHandler:MVCGooogleDocs.callback&key='+key+'&pub=0';

			e.type="text/javascript";
			document.getElementsByTagName("head")[0].appendChild(e);


		};
	}
});

