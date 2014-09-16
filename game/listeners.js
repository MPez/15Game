$('body').on('click', '#8gameButton', function() {
    $('#mainContent').show();
    nascondiAlert();
    pulisciTavola();
    adattaAltezzaTavola();
    creaTavola(3,0,0);
    disegnaTavola();
});

$('body').on('click', '#15gameButton', function() {
    $('#mainContent').show();
    nascondiAlert();
    pulisciTavola();
    adattaAltezzaTavola();
    creaTavola(4,0,0);
    disegnaTavola();
});

$('body').on('click', '#24gameButton', function() {
    $('#mainContent').show();
    nascondiAlert();
    pulisciTavola();
    adattaAltezzaTavola();
    creaTavola(5,0,0);
    disegnaTavola();
});

$('body').on('click', '#mescolaButton', function() {
    mescolaTavola();
});

$('body').on('click', '#riordinaButton', function() {
    riordinaTavola();
});

$(window).resize(adattaTavola);

$('#cutoff-slider').change(function () {
    var value = $(this).attr('data-slider');
    $('#cutoff-value').text(value);
});

$('select').change(function () {
    var value = $( 'select option:selected' ).attr('value');
    if(value == 'greedy' || 'A' || 'RBFS') {
        $('#euristica').show();
        $('#opzioniIDA').hide();
    }
    else {
        if(value == 'IDA') {
            $('#euristica').show();
            $('#opzioniIDA').show();
            $('#opzioniIDA').foundation('slider', 'set_value', 0);
        }
        else {
            $('#opzioniIDA').hide();
            $('#euristica').hide();
        }
    }
});
