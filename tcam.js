class TipClicked {
    constructor(el) {
        this.el = el;
    }
    handleEvent(event) {
        var ret;
        var y = Array.from(this.el).indexOf(event.target);
        switch (y) {
            case '0':
                ret = .05;
                break;
            case '1':
                ret = .1;
                break;
            case '2':
                ret = .15;
                break;  
            case '3':
                ret = .25;
                break;  
            case '4':
                ret = .5;
                break;  
            case '5':
                ret = .8;
                break;          
        }
    } 
}

function getTipClicked() {
    let tip = document.getElementsByClassName('ci-tip-grid')[0].querySelectorAll('button');
    let tipClicked = new TipClicked(tip);
    console.log(tipClicked);
    /*tip.forEach(function(check) {
        check.addEventListener('click', tipClicked.checkClicked);
           //var y = Array.from(tip).indexOf(event.target);
           //console.log(y);
        //);
    //console.log(y);
    });*/
}

function getFromCalc() {
    let bill = document.getElementsByClassName('ci-bill')[0].querySelector('input').value;
    getTipClicked();
    //console.log(y);
}
getFromCalc();

// Turn clicked event into object by Class and use inheriting in the constructor to get something from method or simply get a return from function calling eventhandler merging into call 
