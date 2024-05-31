$(document).ready(function() {
    $('.toggle-password').on('click', function() {
        var password = $('#password');
        var passwordType = password.attr('type');

        if (passwordType === 'password') {
            password.attr('type', 'text');
            $(this).removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            password.attr('type', 'password');
            $(this).removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });
});