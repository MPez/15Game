//funzione che implementa l'algoritmo Fisher–Yates shuffle (Donald E. Knuth)
//applicato non agli elementi dell'array ma agli attributi di posizione
function shuffle(array) {
    var n = array.length;
    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i);
        var x = array[i].x;
        var y = array[i].y;
        array[i].x = array[j].x;
        array[i].y = array[j].y;
        array[j].x = x;
        array[j].y = y;
    }
    return array;
}
