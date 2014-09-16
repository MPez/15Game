//costruttore oggetto Tassello
function Tassello(id, pos, l) {
    this.id = id;
    this.posizione = pos;
    this.lunghezza = l;
    this.modificato = 0;
}

//funzione che modifica la posizione e la lunghezza del tassello
Tassello.prototype.adattaMisure = function(pos, l) {
    console.log('on adattaMisure');

    this.posizione = pos;
    this.lunghezza = l;
    this.modificato = 1;
}

//costruttore oggetto Tavola
function Tavola(dim, dist) {
    this.dimensione = dim;
    this.distanza = dist;
    this.tasselli = [];
}

//funzione che crea i tasselli per riempire la tavola
Tavola.prototype.creaTasselli = function() {
    console.log('on creaTasselli');

    var dim = this.dimensione;
    var dist = this.distanza;
    var i = 1;

    for(var r = 0; r < dim; r++ ) {
        for( var c = 0; c < dim; c++) {
            this.tasselli.push(new Tassello(i, [r,c], dist));
            i++;
        }
    }
}

//funzione che adatta la posizione e la dimensione dei tasselli e li riordina
Tavola.prototype.riordinaTasselli = function() {
    console.log('on riordinaTasselli');

    var dist = this.distanza;
    var dim = this.dimensione;

    var i = 0;

    for(var r = 0; r < dim; r++ ) {
        for( var c = 0; c < dim; c++) {
            this.tasselli[i].adattaMisure([r,c], dist);
            i++;
        }
    }
}

//funzione che adatta la posizione e la dimensione dei tasselli
Tavola.prototype.adattaTasselli = function(distanza) {
    console.log('on adattaTasselli');

    var dist = this.distanza = distanza / this.dimensione;
    var dim = this.dimensione;

    for(var i = 0; i < dim * dim; i++) {
        this.tasselli[i].adattaMisure(this.tasselli[i].posizione, dist);
    }
}

//funzione che ritorna il tassello con la posizione data
Tavola.prototype.getTassello(posizione) {
    console.log('on getTassello');

    var dim = this.dimensione;
    var trovato = 0;
    var tassello = null;

    for(var i = 0; i < dim * dim && trovato == 0; i++) {
        if(posizone[0] == this.tasselli[i].posizione[0]) {
            if(posizione[1] == this.taselli[i].posizione[1]) {
                trovato = 1;
                tassello = this.tasselli[i];
            }
        }
    }
    return tassello;
}

//costruttore oggetto nodo
function Nodo(nodoPadre, stato) {
    this.padre = nodoPadre;
    this.primoFiglio = null;
    this.ultimoFiglio = null;
    this.predenteFratello = null;
    this.prossimoFratello = null;

    this.profondità = 0;
    this.costoCammino = 0;
    this.stato = []; //copia della tavola
    this.visitato = 0;
}

//funzione che aggiunge un figlio al nodo corrente
Nodo.prototype.aggiungiFiglio = function(nodoFiglio) {
    console.log('on aggiungiFiglio');

    nodoFiglio.padre = this;
    nodoFiglio.predenteFratello = this.ultimoFiglio;
    nodoFiglio.profondità = this.profondità + 1;

    if(this.ultimoFiglio != null) {
        this.ultimoFiglio.prossimoFratello = nodoFiglio;
    }

    this.ultimoFiglio = nodoFiglio;

    if(this.primoFiglio == null) {
        this.primoFiglio = nodoFiglio;
    }
}

//funzione che ritorna i figli del nodo dato
Nodo.prototype.getFigli = function(nodo) {
    console.log('on getFigli');

    var figli = [];
    var figlio = nodo.primoFiglio;

    while(figlio != null) {
        figli.push(figlio);
        figlio = figlio.prossimoFratello;
    }

    return figli;
}

//funzione che ritorna il figlio con il costo di cammino minore
Nodo.prototype.cercaFiglioMigliore = function(nodo) {
    console.log('cercaFiglioMigliore');

    var figlio = nodo.primoFiglio;
    var costo = 0;

    while(figlio != null) {
        if(costo > figlio.costoCammino) {
            costo = figlio.costoCammino;
        }
        figlio = figlio.prossimoFratello;
    }

    return costo;
}
