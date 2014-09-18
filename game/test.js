var numeroNodiStat = [];
var durataStat = [];
var lunghezzaStat = [];
var profonditàStat = [];

function eseguiMultiplo(numero, strategia, euristica, dimensione) {
    $('#mainContent').show();

    pulisciTavola();
    adattaAltezzaTavola();
    creaTavola(3,0,0);
    disegnaTavola();

    for(var i = 0; i < numero; i++) {
        riordinaTavola();
        tavola.tasselli = shuffle(tavola.tasselli);
        aggiornaTavola();
        while(verificaTavola() == 0) {
            tavola.tasselli = shuffle(tavola.tasselli);
            aggiornaTavola();
        }
        soluzione = ricercaGrafo(tavola.tasselli.slice(), strategia, euristica);

        numeroNodiStat.push(nodiVisitati);
        durataStat.push(durata);
        lunghezzaStat.push(soluzione.length);
        profonditàStat.push(soluzione[0].profondità);
    }
}
