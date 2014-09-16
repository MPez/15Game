function start() {
    console.log('on start');
    nascondiAlert();
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
function mescolaTavola() {
    console.log('on shuffle');

    nascondiAlert();

    tavola.tasselli = shuffle(tavola.tasselli);
    aggiornaTavola();
    verificaTavola();
}

//funziona che controlla se la configurazione della tavola si può risolvere
//sfruttando l'invariante della parità della somma del 15 della tavola
function verificaTavola() {
    console.log('on verificaTavola');

    var dim = tavola.dimensione;
    var distanzaVuotoFine = calcolaDistanzaManhattan(tavola.tasselli[dim * dim - 1].posizione, [dim - 1, dim - 1]);
    var somma15 = calcolaInversioni() + distanzaVuotoFine;

    if(somma15 % 2) {
        mostraAlert('La tavola non è risolvibile!','alert');
    }
    else {
        mostraAlert('La tavola è risolvibile!', 'success')
    }
}

//funzione che calcola la distanza Manhattan tra le posizioni di due tasselli
function calcolaDistanzaManhattan(inizio, fine) {
    console.log('on calcolaDistanzaManhattan');

    var L = Math.abs(inizio[0] - fine[0]) + Math.abs(inizio[1] - fine[1]);
    return L;
}

//funzione che calcola il numero di inversioni presente nella tavola
function calcolaInversioni() {
    console.log('on calcolaInversioni');

    var dim = tavola.dimensione;
    var inv = 0;
    var T = ordinaTasselli();
    var somma = 0;

    for(var i = 0; i < dim * dim; i++) {
        for(var j = i + 1; j < dim * dim; j++) {
            if(T[j].id < T[i].id ) {
                somma++;
            }
        }
    }
    return somma;
}

//funzione che ordina i tasselli in base alla posizione sulla tavola
function ordinaTasselli() {
    console.log('on ordinaTasselli');

    var T = tavola.tasselli.slice();

    T.sort(function(a, b) {
                if(a.posizione[0] < b.posizione[0]) {
                    return -1;
                }
                else {
                    if(a.posizione[0] == b.posizione[0] && a.posizione[1] < b.posizione[1]){
                        return -1;
                    }
                    else {
                        return 1;
                    }
                }
            })
    return T;
}

//funzione che aggiorna l'alert con testo e classe corrette e lo mostra
function mostraAlert(testo, classe) {
    $('#risolvibile').text(testo);
    $('#risolvibile').addClass(classe);
    $('#risolvibile').show();
}

//funzione che nasconde l'alert
function nascondiAlert() {
    $('#risolvibile').removeClass('alert' || 'success');
    $('#risolvibile').hide();
}

//funzione che sistema i tasselli nella posizione iniziale
function riordinaTavola() {
    console.log('on riordinaTavola');

    tavola.riordinaTasselli();
    aggiornaTavola();
    nascondiAlert();
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

//funzione cha calcola la coordinata X di un tassello in funzione della posizione nella tavola
function calcolaX(pos) {
    return pos[1] * tavola.distanza;
}
//funzione cha calcola la coordinata Y di un tassello in funzione della posizione nella tavola
function calcolaY(pos) {
    return pos[0] * tavola.distanza;
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
        .attr('x', function(d) { return calcolaX(d.posizione); })
        .attr('y', function(d) { return calcolaY(d.posizione); });

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
        .duration(100)
        .attr('width', function(d) {return d.lunghezza; })
        .attr('height', function(d) {return d.lunghezza; })
        .attr('x', function(d) { return calcolaX(d.posizione); })
        .attr('y', function(d) { return calcolaY(d.posizione); });

    tasselli.selectAll('text')
        .filter(function(d) { return d.modificato == 1; })
        .transition()
        .duration(200)
        .style('font-size', function(d) { return d.lunghezza * 0.8; })
        .attr('x', function(d) { return d.lunghezza / 2 + calcolaX(d.posizione); })
        .attr('y', function(d) { d.modificato = 0; return d.lunghezza / 2 + calcolaY(d.posizione); })
        .attr('dy', '.35em');
}

//funzione che elimina la tavola precedente
function pulisciTavola() {
    console.log('on pulisciTavola');

    svg.selectAll('.tassello').data([]).exit().remove();
}



