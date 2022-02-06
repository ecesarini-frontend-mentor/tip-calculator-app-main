class GetValue {
    constructor(bill, tip, tipPerc) {
        this.bill = bill;
        this.tip = tip;
        this.tipPerc = tipPerc;
    }
    handleEvent(event) {
        switch(event.type) {
            case 'click':
                let perc;
                let tipClkIndex = Array.from(this.tip).indexOf(event.target);
                if(tipClkIndex < 5) {
                    perc = this.tipPerc[tipClkIndex];
                }
                else {
                    //console.log(event.dataset);
                    event.target.placeholder = "%";
                } 
                console.log(perc);
                break;
            case 'input':
                event.target.placeholder = "%";
                let percCustom;
                percCustom = event.target.value / 100 + "%";
                console.log(percCustom);
                break;
        }
    }
}

function tcamValue() {
    let bill = document.getElementsByClassName("ci-bill-input")[0].value;
    let tip = document.querySelectorAll(".ci-tg-perc");
    let tipPerc = [0.05, 0.1, 0.15, 0.25, 0.5];

    let getValue = new GetValue(bill, tip, tipPerc);
    tip.forEach((item) => {
        item.addEventListener('click', getValue);
        item.addEventListener('input', getValue);
    })  
}
tcamValue();


/*function calcValue() {
    let bill = document.getElementsByClassName("ci-bill-input")[0].value;
    var tip = document.querySelectorAll(".ci-tg-perc");
    var tipPerc = [0.05, 0.1, 0.15, 0.25, 0.5];


    for(let i=0; i<tip.length; i++) {
        if(i<=4) {
            tip[i].addEventListener('click', function(event) {
                let clk = Array.from(tip).indexOf(event.target);
                let perc;
                if(clk < 5) { perc = tipPerc[clk];}
                else { 
                    perc = event.target.value / 100;
                    event.target.value = 
                }
                console.log(perc);
            });
        } else {
            tip[i].addEventListener('input', function(event) {
                event.target.value = "%";
                let perc = event.target.value / 100;
                console.log(perc); 
            });
        }
    }
}
calcValue();*/




/*function checkInputSelected(arr) {
    //var chkFlag = true;
    arr.forEach((item) => { 
        item.addEventListener(item, function(event) {
            if( event.target.value == "") {return false;}
            else {return true;}
        })
    });        
    //return chkFlag;
}

function check() {
    var ciInp = [];
    ciInp.push(document.getElementsByClassName("ci-bill-input")[0]);
    ciInp.push(document.getElementsByClassName("ci-tg-perc-custom")[0]);
    ciInp.push(document.getElementsByClassName("ci-people-input")[0]);
    //console.log(ciInp);
    //console.log(checkInputSelected(ciInp));
    checkInputSelected(ciInp);
}
check();*/


/*for(let i=0; i<5; i++) {
    $(".ci-tg-perc").eq(i).on("click", function(event) {
        switch(i) {
            case 0:
                $(this).data("perc", 0.5) ;
                break;
            case 1:
                $(this).data("perc", 0.1);
                break;
            case 2:
                $(this).data("perc", 0.15);
                break;
            case 3:
                $(this).data("perc", 0.25);
                break;
            case 4:
                $(this).data("perc", 0.5);
                break;
        }
    var ctp = $(".ci-tg-perc").eq(2).data("perc");
    console.log(ctp);
    });
}

var ctp = $(".ci-tg-perc").eq(2).data("perc");
console.log(ctp);*/


/*class TipClicked {
    constructor(e) {
        this.e = e;
    }
    handleEvent(event) {
        switch(event.type) {
            case 'click':
                var clk = Array.from(this.e).indexOf(event.target);
                var frac;
                switch(clk) {
                    case 0:
                        frac = 0.05;
                        break;
                    case 1:
                        frac = 0.1;
                        break;
                    case 2:
                        frac = 0.15;
                        break;
                    case 3:
                        frac = 0.25;
                    case 4:
                        frac = 0.5;
                    case 5:
                        //frac = //get something
                    break;
                }
            //console.log(frac);
            break;
        }
    }
}

function getFromCalc() {
    let bill = document.getElementsByClassName('ci-bill')[0].querySelector('input').value;
    let tip = document.getElementsByClassName('ci-tip-grid')[0].querySelectorAll('button');
    let tipClicked = new TipClicked(tip);
    tip.forEach((item) => {
        item.addEventListener('click', tipClicked);
    });
    let people = document.getElementsByClassName('ci-people')[0].querySelector('input').value;
}
getFromCalc();

// Turn clicked event into object by Class and use inheriting in the constructor to get something from method or simply get a return from function calling eventhandler merging into call 
*/