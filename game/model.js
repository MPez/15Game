//costruttore oggetto Tassello
function Tassello(id, x, y, l) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.lunghezza = l;
    this.modificato = 0;
}

//funzione che modifica la posizione e la lunghezza del tassello
Tassello.prototype.adattaMisure = function(x, y, l) {
    console.log('on adattaMisure');

    this.x = x;
    this.y = y;
    this.lunghezza = l;
    this.modificato = 1;
}

//costruttore oggetto tavola
function Tavola(dim, dist, x, y) {
    this.dimensione = dim;
    this.distanza = dist;
    this.x = x;
    this.y = y;
    this.tasselli = [];
}

//funzione che crea i tasselli per riempire la tavola
Tavola.prototype.creaTasselli = function() {
    console.log('on creaTasselli');

    var i = 1;
    var x = y = 0;
    var dim = this.dimensione;
    var dist = this.distanza;

    for(var r = 1; r <= dim; r++) {
        x = 0;
        for(var c = 1; c <= dim; c++) {
            this.tasselli.push(new Tassello(i++, x, y, dist));
            x += dist;
        }
        y += dist;
    }
}

//funzione che adatta la posizione e la dimensione dei tasselli
Tavola.prototype.adattaTasselli = function(distanza) {
    console.log('on adattaTasselli');

    var dist = distanza / this.dimensione;
    var dim = this.dimensione;
    var x = y = i = 0;
    for(var r = 1; r <= dim; r++) {
        x = 0;
        for(var c = 1; c <= dim; c++) {
            this.tasselli[i].adattaMisure(x, y, dist);
            x += dist;
            i++;
        }
        y += dist;
    }
}
