function getTipClicked() {
    let tip = document.getElementsByClassName('ci-tip')[0].querySelectorAll('input');
    tip.forEach(function(check) {
        check.addEventListener('click', function(event) {
            alert(Array.from(check).indexOf(event.target));
        });
    });
}

function getFromCalc() {
    let bill = document.getElementsByClassName('ci-bill')[0].querySelector('input').value;
}