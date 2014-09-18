function start() {
    console.log('on start');
    nascondiAlert('risolvibile');
    nascondiAlert('risolto');
}

//oggetto globale tavola
var tavola;

//array di nodi che rappresentano le azioni che risolvono la tavola
var soluzione;

//oggetto globale svg dove disegnare la tavola
var svg = d3.select('#tavola');

//parametro globale usato per impostare intervallo di visualizzazione della soluzione
var intervallo = 0;

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
    console.log('on mescolaTavola');

    nascondiAlert('risolvibile');
    nascondiAlert('risolto');
    window.clearInterval(intervallo);

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
        mostraAlert('risolvibile', 'La tavola non è risolvibile!','alert');
        return 0;
    }
    else {
        mostraAlert('risolvibile', 'La tavola è risolvibile!', 'success');
        return 1;
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

//funzione che elimina la tavola precedente
function pulisciTavola() {
    console.log('on pulisciTavola');

    svg.selectAll('.tassello').data([]).exit().remove();
}

//funzione che avvia il solutore della tavola
function risolviTavola(strategia, euristica, cutoff) {
    console.log('on risolviTavola');

    soluzione = ricercaGrafo(tavola.tasselli.slice(), strategia, euristica, cutoff);

    mostraAlert('risolto', 'È stata trovata una soluzione', 'success');
    $('#risolviModal').foundation('reveal', 'close');
    mostraModal();
    nascondiAlert('risolvibile');
}

//funzione che mostra la finestra modale con le statistiche della soluzione trovata
function mostraModal() {
    $('#durata').text(durata / 1000);
    $('#lunghezza').text(soluzione.length);
    $('#numeroNodi').text(nodiVisitati);
    $('#profondità').text(soluzione[0].profondità);

    $('#risoltoModal').foundation('reveal','open');
}

//funzione che mostra le azioni che portano alla soluzione della tavola
function mostraSoluzione() {
    console.log('on mostraSoluzione');

    intervallo = window.setInterval(function() {
        if(soluzione != 'null' && soluzione.length > 0) {
            tavola.setStato(soluzione.pop().stato);
            aggiornaTavola();
        }
    }, 400);
}

//funzione che aggiorna l'alert con testo e classe corrette e lo mostra
function mostraAlert(alert, testo, classe) {
    console.log('on mostraAlert');

    $('#' + alert).text(testo);
    $('#' + alert).addClass(classe);
    $('#' + alert).show();
}

//funzione che nasconde l'alert
function nascondiAlert(alert) {
    console.log('on nascondiAlert');

    $('#' + alert).removeClass('alert' || 'success');
    $('#' + alert).hide();
}

//funzione che sistema i tasselli nella posizione iniziale
function riordinaTavola() {
    console.log('on riordinaTavola');

    tavola.riordinaTasselli();
    aggiornaTavola();
    nascondiAlert('risolvibile');
    nascondiAlert('risolto');
    window.clearInterval(intervallo);
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
    $('.heightDim').attr('height', width + 8);
}
