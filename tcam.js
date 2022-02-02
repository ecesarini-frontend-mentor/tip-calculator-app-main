function tipClicked(e) {
    e.forEach(function(item) {
        item.addEventListener('click', getTipClicked);
    });   
    function getTipClicked(event) {
        //console.log(e);
        var ev = Array.from(e).indexOf(event.target);
        //console.log(ev);
        switch(ev) {
            var frac;
            case 0:
                frac = .5;
                break;
                        
        }

    }
    //console.log(this.cellClicked.bind(this));
    //console.log(this.ev);
    //console.log(ev);
}

function getFromCalc() {
    let bill = document.getElementsByClassName('ci-bill')[0].querySelector('input').value;
    let tip = document.getElementsByClassName('ci-tip-grid')[0].querySelectorAll('button');
    tipClicked(tip);
}
getFromCalc();

// Turn clicked event into object by Class and use inheriting in the constructor to get something from method or simply get a return from function calling eventhandler merging into call 
