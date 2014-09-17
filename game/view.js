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
        .attr('x', function(d) { return calcolaX(d.posizione); })
        .attr('y', function(d) { return calcolaY(d.posizione); })
        .attr('rx', function(d) {return d.lunghezza / 10; })
        .attr('ry', function(d) {return d.lunghezza / 10; });

    tasselliEnter.append('text')
        .text(function(d) { return d.id; })
        .style('text-anchor', 'middle')
        .style('font-size', function(d) { return d.lunghezza * 0.8; })
        .attr('x', function(d) { return d.lunghezza / 2 + calcolaX(d.posizione); })
        .attr('y', function(d) { return d.lunghezza / 2 + calcolaY(d.posizione); })
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
        .duration(200)
        .attr('width', function(d) {return d.lunghezza; })
        .attr('height', function(d) {return d.lunghezza; })
        .attr('x', function(d) { return calcolaX(d.posizione); })
        .attr('y', function(d) { return calcolaY(d.posizione); })
        .attr('rx', function(d) {return d.lunghezza / 10; })
        .attr('ry', function(d) {return d.lunghezza / 10; });

    tasselli.selectAll('text')
        .filter(function(d) { return d.modificato == 1; })
        .transition()
        .duration(200)
        .style('font-size', function(d) { return d.lunghezza * 0.8; })
        .attr('x', function(d) { return d.lunghezza / 2 + calcolaX(d.posizione); })
        .attr('y', function(d) { d.modificato = 0; return d.lunghezza / 2 + calcolaY(d.posizione); })
        .attr('dy', '.35em');
}

//funzione cha calcola la coordinata X di un tassello in funzione della posizione nella tavola
function calcolaX(pos) {
    return pos[1] * tavola.distanza;
}
//funzione cha calcola la coordinata Y di un tassello in funzione della posizione nella tavola
function calcolaY(pos) {
    return pos[0] * tavola.distanza;
}
