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

    for(var x = 0; x < dim; x++ ) {
        for( var y = 0; y < dim; y++) {
            this.tasselli.push(new Tassello(i, [x,y], dist));
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

    for(var x = 0; x < dim; x++ ) {
        for( var y = 0; y < dim; y++) {
            this.tasselli[i].adattaMisure([x,y], dist);
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
