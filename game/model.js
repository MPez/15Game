function Tassello(id, x, y, l) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.lunghezza = l;
}

function Tavola(dim, dist, x, y) {
    this.dimensione = dim;
    this.distanza = dist;
    this.x = x;
    this.y = y;
    this.tasselli = [];
}

Tavola.prototype.creaTasselli = function() {
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
