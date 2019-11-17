$('#show-ok').click(function() {
    showAlert(1)
});
$('#show-warning').click(function() {
    showAlert(2)
});
$('#show-error').click(function() {
    showAlert(3)
});
$('#show-custom1').click(function() {
    showAlert(4)
});
$('#show-custom2').click(function() {
    showAlert(5)
});
var globalAlertNum;
function showAlert(alertNum) {
    $('.alert-cover1, .alert-cover2, .alert-cover3, .alert-cover4, .alert-cover5').hide();
    $('.alert-wrapper1, .alert-wrapper2, .alert-wrapper3, .alert-wrapper4, .alert-wrapper5').css('top', '-100%');
    globalAlertNum = alertNum;
    $(".alert-cover" + alertNum).fadeIn("fast",
    function() {
        $(".alert-wrapper" + alertNum).animate({
            top: '50%'
        },
        200, 'swing')
    })
}
$(".alert-button").click(function() {
    $(".alert-wrapper" + globalAlertNum).animate({
        top: '-100%'
    },
    {
        queue: false,
        duration: 200,
        easing: 'swing',
        complete: function() {
            $(".alert-cover" + globalAlertNum).fadeOut("fast")
        }
    })
})