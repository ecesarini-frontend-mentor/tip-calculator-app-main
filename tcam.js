class getTipClicked {
    constructor(el) {
        this.el = el;
    }
    handleEvent(event) {
        switch(event.target) {
            case '0': 

        }
    }
}

/*function getTipClicked() {
    let tip = document.getElementsByClassName('ci-tip-grid')[0].querySelectorAll('button');
    tip.forEach(function(check) {
        check.addEventListener('click', function(event) {
           var y = Array.from(tip).indexOf(event.target);
           //console.log(y);
        });
    });
}*/

function getFromCalc() {
    let bill = document.getElementsByClassName('ci-bill')[0].querySelector('input').value;
    getTipClicked();
    console.log(y);
}


// Turn clicked event into object by Class and use inheriting in the constructor to get something from method or simply get a return from function calling eventhandler merging into call 
