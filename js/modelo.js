var MVCGooogleDocs = window.MVCGooogleDocs || {};

var _me;

var keyList = [];
var nameList = [];

MVCGooogleDocs.SubsModeloInterface = Oops.constructor({
	proto: function(p) {
		p.alRecibirDatos = function( columna1, columna2, columna3, columna4, columna5, completo ) {
		};
		p.votosGlobales = function(candidatos, votos){
		};
	}
});

MVCGooogleDocs.Modelo = Oops.constructor({
	init: function() {
		this.subscriptor = new MVCGooogleDocs.SubsModeloInterface();
	},
	proto: function(p) {

		var columna1 = [];	//departamento			nivel = 1
		var columna2 = [];	//ciudad				nivel = 2
		var columna3 = [];	//centro				nivel = 3
		var columna4 = [];	//mesa					nivel = 4
		var columna5 = [];	//votos x mesa			nivel = 5
		
		var candidatos = [];
		var votos = [];		

		var completo = false;
		var linea = false;
		
		
		p.agregarVotoCandidato = function(candidato , numVotos){
			candidato = candidato.toLowerCase();
			
			var encontro = false;
			for(var i=0 ; i<candidatos.length ; i++){
				if (candidato == candidatos[i]){
					votos[i] += numVotos;
					encontro = true;
				}
			}
			if(!encontro){
				candidatos.push(candidato);
				votos.push(numVotos);
			}
			encontro = false;
			
			var texto = "\t\t\t\t\t"+candidato + " con: " + numVotos;
			console.log(texto);
			
		}
		
		
		p.imprimir = function(texto, nivel){

			switch (nivel){
				case 1:
				columna1.push(texto);
				break;
				case 2:
				columna2.push(texto);
				if(columna2.length != columna1.length){
				//	columna1.push("");
				}
				break;
				case 3:
				columna3.push(texto);
				/*if(columna3.length != columna2.length){
					columna1.push("");
					columna2.push("");
				}*/
				break;
				case 4:
				columna4.push(texto);
				if(columna4.length != columna3.length){
				/*	columna1.push("");
					columna2.push("");
					columna3.push("");
				*/
					if(keyList.length==1){
						completo = true;
					}
				}
				break;
				case 5:
				_me.subscriptor.alRecibirDatos(columna1, columna2, columna3, columna4, columna5, completo);	
				if(completo){
					_me.subscriptor.votosGlobales(candidatos, votos);
				}
				break;
			}

			var text = "";
			for(var y = 0; y < nivel ; y++){
				text += "\t";
			}	
			console.log(text+""+texto+" con nivel: "+nivel);				
			
			
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
		var paraSelf = true;
		var self;

		p.obtenerDatos = function(getKey) {
			key = getKey;//0AlumHf6aC2nodFp0bWtoMkU5R2JYMThSRzhCS1FlZmc

			if(paraSelf){
				self = this;
				_me = self;
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
	//aqui se pone para sacar lo de casa candidato y sacar el resultado final
							p.agregarVotoCandidato(rows[i].c[0].v , rows[i].c[1].v);
							sumaVotos += rows[i].c[1].v;
							//p.imprimir(rows[i].c[0].v ,nivelSee);
						}

					}
					columna5.push(sumaVotos)
					p.imprimir("total mesa: "+sumaVotos ,nivelSee);
					importante2 = false;
					if(keyList.length > 0){
						nivelSee = nivel.pop();
						p.imprimir(nameList.pop(), nivelSee);
						p.obtenerDatos(keyList.pop());
					}else{

						nivel = [];
						nivelSee = 0;
						//self.subscriptor.alRecibirDatos(columna1, columna2, columna3, columna4, columna5);		
						for(var a = 0 ; a<columna5.length;a++){
							columna1.pop();
							columna2.pop();
							columna3.pop();
							columna4.pop();
							columna5.pop();
							nivelSee = 0;
						}		
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

