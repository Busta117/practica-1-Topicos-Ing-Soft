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
        p.alClickCargar = function() {
            this.modelo.obtenerDatos(0);
            //this.vista.cargando();
        };
        p.alRecibirDatos = function(columna1, columna2, columna3, columna4, columna5) {
		
		//	if(next == 1){
            	// Transformar los datos
            	this.vista.mostrarDatos(columna1, columna2, columna3, columna4, columna5);
			//}
        };
    }
});

