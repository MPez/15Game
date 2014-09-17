//variabili globali che indicano il tempo di inizio e la durata della ricerca della soluzione
var tempoInizio = 0;
var durata = 0;

//variabile che indica quanti nodi sono stati visitati per trovare la soluzione
var nodiVisitati = 0;

//funzione che implementa l'algoritmo Fisher–Yates shuffle (Donald E. Knuth)
//applicato non agli elementi dell'array ma alla loro posizione
function shuffle(array) {
    console.log('on shuffle');

    var n = array.length;
    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i);

        var x = array[i].posizione[0];
        var y = array[i].posizione[1];
        array[i].posizione[0] = array[j].posizione[0];
        array[i].posizione[1] = array[j].posizione[1];
        array[j].posizione[0] = x;
        array[j].posizione[1] = y;

        array[i].modificato = 1;
        array[j].modificato = 1;
    }
    return array;
}

//funzione che implementa l'agoritmo di ricerca best-first greedy
function ricercaGrafo(stato, euristica) {
    console.log('on ricercaGrafo');

    tempoInizio = Date.now();

    var esplorati = [];
    var frontiera = [];
    frontiera.push(new Nodo(null, stato));


    while(typeof frontiera[0] != 'undefined' && frontiera.length > 0) {
        var nodo = frontiera.shift();

        if(testObiettivo(nodo)) {
            durata = Date.now() - tempoInizio;
            return calcolaSoluzione(nodo);
        }
        if(isEsplorato(nodo, esplorati) == 0) {
            esplorati.push(nodo);
            frontiera = espandi(frontiera, nodo, euristica);
            nodiVisitati++;
        }
    }
    return null;
}

//funzione che controlla se la tavola è stata risolta
function testObiettivo(nodo) {
    console.log('on testObiettivo');

    var dim = tavola.dimensione;
    var test = 1;
    var i = 0;

    for(var r = 0; r < dim && test == 1; r++) {
        for( var c = 0; c < dim && test == 1; c++) {
            if(nodo.stato[i].posizione[0] == r) {
                if(nodo.stato[i].posizione[1] == c) {
                    test = 1;
                }
                else {
                    test = 0;
                }
            }
            else {
                test = 0;
            }
            i++;
        }
    }
    return test;
}

//funzione che ritorna la sequenza di nodi che portano alla soluzione della tavola
function calcolaSoluzione(nodo) {
    console.log('on soluzione');

    var sol = [nodo];
    var padre = nodo.padre;
    while(padre != null) {
        sol.push(padre);
        padre = padre.padre;
    }
    return sol;
}

//funzione che cerca se lo stato del nodo oggetto di invocazione è già stato esplorato
function isEsplorato(nodo, esplorati) {
    console.log('on isEsplorato');

    var dim = tavola.dimensione;
    var trovato = 0;

    for(var i = 0; i < esplorati.length && trovato == 0; i++) {
        var continua = 1;

        for(var j = 0; j < dim * dim && continua == 1; j++) {
            if(nodo.stato[j].posizione[0] == esplorati[i].stato[j].posizione[0]) {
                if(nodo.stato[j].posizione[1] == esplorati[i].stato[j].posizione[1]) {
                    trovato = 1;
                }
                else {
                    continua = 0;
                    trovato = 0;
                }
            }
            else {
                continua = 0;
                trovato = 0;
            }
        }
    }
    return trovato;
}

//funzione che espande il nodo dato cercando i figli e li ritorna ordinati per costo di cammino
function espandi(frontiera, nodo, euristica) {
    console.log('on espandi');

    var successori = cercaSuccessori(nodo);

    for(var i = 0; i < successori.length; i++) {
        successori[i].costoCammino = calcolaEuristica(successori[i].stato, euristica);
        nodo.aggiungiFiglio(successori[i]);
    }

    successori.forEach(function(nodo,indice,array) {
        frontiera.push(nodo);
    })

    frontiera.sort(function(a,b) {
        if(a.costoCammino < b. costoCammino) {
            return -1;
        }
        if(a.costoCammino > b.costoCammino) {
            return 1;
        }
        return 0;
    });
    return frontiera;
}

//funzione che calcola tutte le mosse possibili da un dato stato e ritorna i relativi nodi
function cercaSuccessori(nodo) {
    console.log('on cercaSuccessori');

    var dim = tavola.dimensione;
    var vuoto = nodo.stato[dim * dim - 1];
    var successori = [];
    var esaminatoD = 0;
    var esaminatoS = 0;

    if(vuoto.posizione[0] < dim - 1) {
        successori.push(muovi(nodo, 'basso'));
        if(vuoto.posizione[1] < dim - 1 && esaminatoD == 0) {
            successori.push(muovi(nodo, 'destra'));
            esaminatoD = 1;
        }
        if(vuoto.posizione[1] > 0 && esaminatoS == 0) {
            successori.push(muovi(nodo, 'sinistra'));
            esaminatoS = 1;
        }
    }

    if(vuoto.posizione[0] > 0) {
        successori.push(muovi(nodo, 'alto'));
        if(vuoto.posizione[1] > 0 && esaminatoS == 0) {
            successori.push(muovi(nodo, 'sinistra'));
            esaminatoS = 1;
        }
        if(vuoto.posizione[1] < dim - 1 && esaminatoD == 0) {
            successori.push(muovi(nodo, 'destra'));
            esaminatoD = 1;
        }
    }
    return successori;
}

//funzione che ritorna un nodo che rappresenta una mossa verso l'alto
function muovi(nodo, direzione) {
    console.log('on muovi ' + direzione);

    var nuovoStato = copiaProfonda(nodo.stato);

    var dim = tavola.dimensione;
    var vuoto = nuovoStato[dim * dim - 1];
    var r = vuoto.posizione[0];
    var c = vuoto.posizione[1];

    var tassello;

    if(direzione == 'alto') {
        tassello = ottieniTassello(nuovoStato, [r - 1, c]);
    }
    else {
        if(direzione == 'basso') {
            tassello = ottieniTassello(nuovoStato, [r + 1, c]);
        }
        else {
            if(direzione == 'destra') {
                tassello = ottieniTassello(nuovoStato, [r, c + 1]);
            }
            else {
                tassello = ottieniTassello(nuovoStato, [r, c - 1]);
            }
        }
    }

    scambiaPosizione(tassello, vuoto);
    var nuovoNodo = new Nodo(null, nuovoStato);

    return nuovoNodo;
}

//funzione che esegue una copia profonda dello stato
function copiaProfonda(stato) {
    console.log('on copiaProfonda');

    var nuovoStato = [];
    var dim = tavola.dimensione;

    var id = 0 ;
    var posizione = [];
    var lunghezza = 0;

    for(var i = 0; i < dim * dim; i++) {
        id = stato[i].id;
        posizione = stato[i].posizione.slice();
        lunghezza = stato[i].lunghezza;
        nuovoStato[i] = new Tassello(id, posizione, lunghezza);
    }
    return nuovoStato;
}

//funzione che ritorna il tassello con la posizione data
function ottieniTassello(stato, posizione) {
    console.log('on ottieniTassello');

    var dim = tavola.dimensione;
    var trovato = 0;
    var tassello = null;

    for(var i = 0; i < dim * dim && trovato == 0; i++) {
        if(posizione[0] == stato[i].posizione[0]) {
            if(posizione[1] == stato[i].posizione[1]) {
                trovato = 1;
                tassello = stato[i];
            }
        }
    }
    return tassello;
}

//funzione che scambia la posizione dei due tasselli dati
function scambiaPosizione(tassello, vuoto) {
    console.log('on scambiaPosizione');

    r = tassello.posizione[0];
    c = tassello.posizione[1];
    tassello.posizione[0] = vuoto.posizione[0];
    tassello.posizione[1] = vuoto.posizione[1];
    vuoto.posizione[0] = r;
    vuoto.posizione[1] = c;

    tassello.modificato = 1;
    vuoto.modificato = 1;
}

//funzione che chiama la funzione euristica da applicare scelta dall'utente
function calcolaEuristica(stato, euristica) {
    console.log('on calcolaEuristica');

    if(euristica == 'tasselli-sbagliati') {
        return calcolaTasselliSbagliati(stato);
    }
    else {
        return calcolaDistanzaManhattanTavola(stato);
    }
}

//funzione che calcola il numero di tasselli in posizione errata sulla configurazione della tavola data
function calcolaTasselliSbagliati(stato) {
    console.log('on calcolaTasselliSbagliati');

    var dim = tavola.dimensione;
    var i = 0;
    var numero = 0;

    for(var r = 0; r < dim; r++) {
        for( var c = 0; c < dim; c++) {
            if(stato[i].posizione[0] != r) {
                numero++;
            }
            else {
                if(stato[i].posizione[1] != c) {
                    numero++;
                }
            }
            i++;
        }
    }
    return numero;
}

//funzione che calcola la distanza Manhattan totale della configurazione della tavola data
function calcolaDistanzaManhattanTavola(stato) {
    console.log('on calcolaDistanzaManhattanTavola');

    var dim = tavola.dimensione;
    var distanza = 0;
    var i = 0;

    for(var r = 0; r < dim; r++) {
        for(var c = 0; c < dim; c++) {
            distanza += calcolaDistanzaManhattan(stato[i].posizione, [r,c]);
            i++;
        }
    }
    return distanza;
}
