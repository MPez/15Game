$('body').on('click', '#8gameButton', function() {
    $('#mainContent').show();
    nascondiAlert('risolvibile');
    nascondiAlert('risolto');
    window.clearInterval(intervallo);
    pulisciTavola();
    adattaAltezzaTavola();
    creaTavola(3,0,0);
    disegnaTavola();
});

$('body').on('click', '#15gameButton', function() {
    $('#mainContent').show();
    nascondiAlert('risolvibile');
    nascondiAlert('risolto');
    window.clearInterval(intervallo);
    pulisciTavola();
    adattaAltezzaTavola();
    creaTavola(4,0,0);
    disegnaTavola();
});

$('body').on('click', '#24gameButton', function() {
    $('#mainContent').show();
    nascondiAlert('risolvibile');
    nascondiAlert('risolto');
    window.clearInterval(intervallo);
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

$('body').on('click', '#avviaButton', function() {
    $('#risolviModal').foundation('reveal', 'open');

    var strategia = $('select option:selected').attr('value');
    var euristica = $('input[name="euristica"]:checked').val();
    var cutoff = $('#cutoff-slider').attr('data-slider');

    var risolvibile = $('#risolvibile').hasClass('success');

    window.setTimeout(function() {
        if(risolvibile) {
            risolviTavola(strategia, euristica, cutoff)
        }
    } , 500);
});

$('body').on('click', '#mostraButton', function() {
    mostraSoluzione();
});

$(window).resize(adattaTavola);

$('#cutoff-slider').change(function () {
    var value = $(this).attr('data-slider');
    $('#cutoff-value').text(value);
});

$('select').change(function () {
    var value = $('select option:selected').attr('value');

    switch(value) {
        case 'greedy':
            $('#euristica').show();
            $('#opzioniIDA').hide();
            break;
        case 'A':
            $('#euristica').show();
            $('#opzioniIDA').hide();
            break;
        case 'IDA':
            $('#euristica').show();
            $('#opzioniIDA').show();
            $('#opzioniIDA').foundation('slider', 'set_value', 0);
            $('#nonImplementatoModal').foundation('reveal', 'open');
            break;
        case 'RBFS':
            $('#euristica').show();
            $('#opzioniIDA').hide();
            $('#nonImplementatoModal').foundation('reveal', 'open');
            break;
        default:
            $('#opzioniIDA').hide();
            $('#euristica').hide();
    }
});

