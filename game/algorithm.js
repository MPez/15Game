//funzione che implementa l'algoritmo Fisher–Yates shuffle (Donald E. Knuth)
//applicato non agli elementi dell'array ma alla loro posizione
function shuffle(array) {
    var n = array.length;
    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i);

        var x = array[i].posizione;
        array[i].posizione = array[j].posizione;
        array[j].posizione = x;

        array[i].modificato = 1;
        array[j].modificato = 1;
    }
    return array;
}
