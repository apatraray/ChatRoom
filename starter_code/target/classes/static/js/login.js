var username = null;

function login(e){
    username = $("#usernamelog").val();
    location.href= "/index?username="+username;
}
/**
 * Enter to login.
 */
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    e.keyCode === 13 && login();
};

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#login" ).on("click", login);
});