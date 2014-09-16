//funzione che implementa l'algoritmo Fisher–Yates shuffle (Donald E. Knuth)
//applicato non agli elementi dell'array ma alla loro posizione
function shuffle(array) {
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
    var frontiera.push(new Nodo(null, stato));

    while(typeof frontiera[0] != 'undefined' && frontiera.length > 0) {
        var nodo = frontiera.shift();
        if(testObiettivo(nodo)) {
            return soluzione(nodo);
        }
        nodo.visitato = 1;
        frontiera.push(espandi(nodo, euristica));
    }
    return null;
}

//funzione che controlla se la tavola è stata risolta
function testObiettivo(nodo) {
    var dim = tavola.dimensione;
    var test = 1;
    var i = 0;

    for(var r = 0; r < dim && test == 1; r++) {
        for( var c = 0; c < dim && test == 1; c++) {
            if(nodo.stato.tasselli[i].posizione[0] == r) {
                if(nodo.stato.tasselli[i].posizione[1] == c) {
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
function soluzione(nodo) {
    var sol = [nodo];
    var padre = nodo.padre;
    while(padre != null) {
        sol.push(padre);
        padre = padre.padre;
    }
    return sol;
}

//funzione che espande il nodo dato cercando i figli e li ritorna ordinati per costo di cammino
function espandi(nodo, euristica) {
    var successori = cercaSuccessori(nodo);

    for(var i = 0; i < successori.length; i++) {
        successori[i].costoCammino = calcolaEuristica(successori[i].stato, euristica);
    }

    successori = successori.sort(function(a,b) {
        if(a.costoCammino < b. costoCammino) {
            return -1;
        }
        if(a.costoCammino > b.costoCammino) {
            return 1;
        }
        return 0;
    });

    for(var i = 0; i < successori.length; i++) {
        nodo.aggiungiFiglio(successori[i]);
    }

    return successori;
}

//funzione che calcola tutte le mosse possibili da un dato stato e ritorna i relativi nodi
function cercaSuccessori(nodo) {
    var dim = nodo.stato.dimensione;
    var vuoto = nodo.stato.tasselli[dim * dim - 1];
    var successori = [];
    var esaminato = 0;

    if(vuoto.posizione[0] < dim - 1) {
        successori.push(muovi(nodo, vuoto, 'basso'));
        if(vuoto.posizione[1] < dim - 1 && esaminato == 0) {
            successori.push(muovi(nodo, vuoto, 'destra'));
            esaminato = 1;
        }
        if(vuoto.posizione[1] > 0 && esaminato == 0) {
            successori.push(muovi(nodo, vuoto, 'sinistra'));
            esaminato = 1;
        }
    }

    if(vuoto.posizione[0] > 0) {
        successori.push(muovi(nodo, vuoto, 'alto'));
        if(vuoto.posizione[1] > 0 && esaminato == 0) {
            successori.push(muovi(nodo, vuoto, 'sinistra'));
            esaminato = 1;
        }
        if(vuoto.posizione[1] < dim - 1 && esaminato == 0) {
            successori.push(muovi(nodo, vuoto, 'destra'));
            esaminato = 1;
        }
    }

    return successori;
}

//funzione che ritorna un nodo che rappresenta una mossa verso l'alto
function muovi(nodo, vuoto, direzione) {
    var r = vuoto.posizione[0];
    var c = vuoto.posizione[1];
    var nuovoStato = nodo.stato.slice();
    var tassello;

    if(direzione == 'alto') {
        var tassello = nuovoStato.getTassello([r - 1, c]);
    }
    else {
        if(direzione == 'basso') {
            var tassello = nuovoStato.getTassello([r + 1, c]);
        }
        else {
            if(direzione == 'destra') {
                var tassello = nuovoStato.getTassello([r, c + 1]);
            }
            else {
                var tassello = nuovoStato.getTassello([r, c - 1]);
            }
        }
    }

    scambiaPosizione(tassello, vuoto);
    var nuovoNodo = new Nodo(null, nuovoStato);

    return nuovoNodo;
}

//funzione che scambia la posizione dei due tasselli dati
function scambiaPosizione(tassello, vuoto) {
    r = tassello.posizione[0];
    c = tassello.posizione[1];
    tassello.posizione[0] = vuoto.posizione[0];
    tassello.posizione[1] = vuoto.posizione[1];
    vuoto.posizione[0] = r;
    vuoto.posizione[1] = c;
}

//funzione che chiama la funzione euristica da applicare scelta dall'utente
function calcolaEuristica(stato, euristica) {
    if(euristica == 'tasselli-sbagliati') {
        return calcolaTasselliSbagliati(stato);
    }
    else {
        return calcolaDistanzaManhattanTavola(stato);
    }
}

//funzione che calcola il numero di tasselli in posizione errata sulla configurazione della tavola data
function calcolaTasselliSbagliati(stato) {
    var dim = stato.dimensione;
    var i = 0;
    var numero = 0;

    for(var r = 0; r < dim; r++) {
        for( var c = 0; c < dim; c++) {
            if(stato.tasselli[i].posizione[0] != r) {
                numero++;
            }
            else {
                if(stato.tasselli[i].posizione[1] != c) {
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
    var dim = stato.dimensione;
    var distanza = 0;
    var i = 0;

    for(var r = 0; r < dim; r++) {
        for(var c = 0; c < dim; c++) {
            distanza = calcolaDistanzaManhattan(stato.tasselli[i], [r,c]);
            i++;
        }
    }
    return distanza;
}
