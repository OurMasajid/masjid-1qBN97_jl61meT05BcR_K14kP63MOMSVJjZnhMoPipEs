// $(function() {
//     $('.nav a').on('click', function(){ 
//         if($('.navbar-toggler').css('display') !='none'){
//             $('.navbar-toggler').trigger( "click" );
//         }
//     });
// });
$(function() {
    $('.navbar-collapse a').on('click', function(){ 
        if($('.navbar-toggler').css('display') !='none'){
            $('.navbar-toggler').trigger( "click" );
        }
    });
});
window.onscroll = function() {
    if (document.body.scrollTop >60 || document.documentElement.scrollTop > 20) {
        document.getElementsByClassName("btn-scroll-top")[0].style.display = "block";
    } else {
        document.getElementsByClassName("btn-scroll-top")[0].style.display = "none";
    }
}