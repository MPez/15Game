$('body').on('click', '#8gameButton', function() {
    alert( $( this ).text() );
})

$('body').on('click', '#15gameButton', function() {
    alert( $( this ).text() );
})

$('body').on('click', '#24gameButton', function() {
    alert( $( this ).text() );
})

$('document').foundation({
    slider: {
        on_change: function(){

        }
    }
});

$('#cutoff-slider').change(function () {
    var value = $(this).attr('data-slider');
    $('#cutoff-value').text(value);
})

$('select').change(function () {
    var value = $( "select option:selected" ).attr('value');
    if(value == 'A') {
        $('#opzioniA').show();
        $('#opzioniIDA').hide();
    }
    else {
        if(value == 'IDA') {
            $('#opzioniIDA').show();
            $('#opzioniA').hide();
        }
        else {
            $('#opzioniIDA').hide();
            $('#opzioniA').hide();
        }
    }
});
