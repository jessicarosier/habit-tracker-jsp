// This is the preloader script that will be used to show a loading spinner while the page is loading


// Vanilla JS way of doing it
// const spinnerWrapperEl = document.querySelector('.spinner-wrapper');
// window.addEventListener('load', function () {
//     spinnerWrapperEl.style.opacity = 0;
//     setTimeout(() => {
//         spinnerWrapperEl.style.display = 'none';
//     }, 3000);
//
// });

// Jquery way of doing it
$(window).on('load', function () {
    setTimeout(function () {
        $('.spinner-wrapper').fadeOut();
    }, 1000);
});

