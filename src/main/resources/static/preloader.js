const spinnerWrapperEl = document.querySelector('.spinner-wrapper');


window.addEventListener('load', function () {
    spinnerWrapperEl.style.opacity = 0;
    setTimeout(() => {
        spinnerWrapperEl.style.display = 'none';
    }, 3000);

});

