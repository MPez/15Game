function start() {

}

//funzione che crea l'oggetto tavola e i relativi taselli
function creaTavola(num, x, y) {
    //distanza tra due tasselli adiacenti
    distanza = $('#tavola').width() / num;

    tavola = new Tavola(num, distanza, x, y);
    tavola.creaTasselli();
}

//oggetto svg dove disegnare la tavola
var svg = d3.select('#tavola');

//funzione che disegna la tavola
function disegnaTavola(num) {
    creaTavola(num, 0, 0);

    var tasselli = svg.selectAll('rect')
        .data(tavola.tasselli, function(d) { return d.id; });

    var tasselliEnter = tasselli.enter().append('g')
        .attr('class', 'tassello');

    tasselliEnter.append('rect')
        .attr('width', distanza)
        .attr('height', distanza)
        .attr('x', function(d) { return d.x; })
        .attr('y', function(d) { return d.y; });

    tasselliEnter.append('text')
        .text(function(d) { return d.id; })
        .style('text-anchor', 'middle')
        .style('font-size', function(d) { return d.lunghezza * 0.8; })
        .attr('x', function(d) { return d.lunghezza / 2 + d.x; })
        .attr('y', function(d) { return d.lunghezza / 2 + d.y; })
        .attr('dy', function(d) { return (d.lunghezza * 0.8) / 3; });

    tasselliEnter.filter(function(d, i) { return i & 1 })
        .style('fill', '#333');

    tasselliEnter.filter(function(d) { return d.id == Math.pow(tavola.dimensione, 2);  })
        .style('fill', '#FFF');

}

//funzione che elimina la tavola precedente
function pulisciTavola() {
    svg.selectAll('rect').data([]).exit().remove();
}

//funzione che adatta l'altezza dei container della tavola
function adattaAltezza() {
    var width = $('#tavola').width();
    $('.heightDim').attr('height', width + 4);
}


