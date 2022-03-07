// TODO: a look on https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener to understand scope about event

/*const ManageBill = function(element) {
    if
}*/ 


function tcamValue() {
    let bill = document.getElementsByClassName("ci-bill-input")[0];
    let tip = document.getElementsByClassName(".ci-tip-grid")[0];
    let people = document.getElementsByClassName("ci-people-input")[0];
    let c1 = 'hsl(172, 67%, 45%)';
    let c2 = 'hsl(183, 100%, 15%)';

    document.addEventListener('DOMContentLoaded', function() { 
        localStorage.clear();
        //localStorage['tipClicked'] = null;
    });

    bill.addEventListener('input', manageBill); 
    //people.addEventListener('input', peopleCls);
    //['click', 'input', 'focus'].forEach((ev) => {tip.addEventListener(ev, tipsClS)});
}

tcamValue();