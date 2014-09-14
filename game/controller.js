function start() {
    console.log('on start');
}

//oggetto globale tavola
var tavola;

//oggetto globale svg dove disegnare la tavola
var svg = d3.select('#tavola');

//funzione che crea l'oggetto tavola e i relativi taselli
function creaTavola(num, x, y) {
    console.log('on creaTavola');

    //distanza tra due tasselli adiacenti
    var distanza = $('#tavola').width() / num;

    tavola = new Tavola(num, distanza, x, y);
    tavola.creaTasselli();
}

//funzione che genera una partita casuale
function generaPartita() {
    console.log('on shuffle');

    tavola.tasselli = shuffle(tavola.tasselli);
    aggiornaTavola();
}

//funzione che disegna la tavola
function disegnaTavola() {
    console.log('on disegnaTavola');

    //data join
    var tasselli = svg.selectAll('.tassello')
        .data(tavola.tasselli, function(d) { return d.id; });

    //enter selection
    var tasselliEnter = tasselli.enter().append('g')
        .attr('class', 'tassello');

    tasselliEnter.append('rect')
        .attr('width', function(d) {return d.lunghezza; })
        .attr('height', function(d) {return d.lunghezza; })
        .attr('x', function(d) { return d.x; })
        .attr('y', function(d) { return d.y; });

    tasselliEnter.append('text')
        .text(function(d) { return d.id; })
        .style('text-anchor', 'middle')
        .style('font-size', function(d) { return d.lunghezza * 0.8; })
        .attr('x', function(d) { return d.lunghezza / 2 + d.x; })
        .attr('y', function(d) { return d.lunghezza / 2 + d.y; })
        .attr('dy', '.35em');

    tasselliEnter.filter(function(d, i) { return i & 1 })
        .style('fill', '#333');

    tasselliEnter.filter(function(d) { return d.id == Math.pow(tavola.dimensione, 2);  })
        .style('fill', '#FFF');
}

//funzione che aggiorna la tavola ad uno nuovo stato
function aggiornaTavola() {
    console.log('on aggiornaTavola');

    //data join
    var tasselli = svg.selectAll('.tassello')
        .data(tavola.tasselli, function(d) { return d.id; });

    //update selection
    tasselli.selectAll('rect')
        .filter(function(d) { return d.modificato == 1; })
        .transition()
        .duration(100)
        .attr('width', function(d) {return d.lunghezza; })
        .attr('height', function(d) {return d.lunghezza; })
        .attr('x', function(d) { return d.x; })
        .attr('y', function(d) { return d.y; });

    tasselli.selectAll('text')
        .filter(function(d) { return d.modificato == 1; })
        .transition()
        .duration(100)
        .style('font-size', function(d) { return d.lunghezza * 0.8; })
        .attr('x', function(d) { return d.lunghezza / 2 + d.x; })
        .attr('y', function(d) { d.modificato = 0; return d.lunghezza / 2 + d.y; })
        .attr('dy', '.35em');
}

//funzione che elimina la tavola precedente
function pulisciTavola() {
    console.log('on pulisciTavola');

    svg.selectAll('.tassello').data([]).exit().remove();
}

//funzione che adatta le dimensioni della tavola e dei tasselli
function adattaTavola() {
    if(typeof(tavola) === 'undefined') {
        console.log('on if adattaTavola');
    }
    else {
        console.log('on else adattaTavola');

        var width = $('#tavola').width();

        adattaAltezzaTavola();
        tavola.adattaTasselli(width);
        aggiornaTavola();
    }
}

//funzione che adatta l'altezza dei container della tavola
function adattaAltezzaTavola() {
    console.log('on adattaAltezzaTavola');

    var width = $('#tavola').width();
    $('.heightDim').attr('height', width + 4);
}



