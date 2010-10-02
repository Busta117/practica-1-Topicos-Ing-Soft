var MVCGooogleDocs = window.MVCGooogleDocs || {};

MVCGooogleDocs.Controlador = Oops.constructor({
    init: function( v, m ) {
        v.setSubscriptor( this );
        m.setSubscriptor( this );
        this.modelo = m;
        this.vista = v;
    },
    augment: [ MVCGooogleDocs.SubsVistaInterface, MVCGooogleDocs.SubsModeloInterface ],
    proto: function(p) {
        p.alClickCargar = function(key) {
			this.vista.cargandoMsg();
            this.modelo.obtenerDatos(key);
        };

		p.cargando = function(){
			this.vista.cargandoMsg();
		};
		
		p.votosGlobales = function(candidatos, votos){
			this.vista.votosGlobales(candidatos, votos);
		};
        p.alRecibirDatos = function(columna1, columna2, columna3, columna4, columna5, completo) {
		 	this.vista.mostrarDatos(columna1, columna2, columna3, columna4, columna5, completo);

        };
    }
});

