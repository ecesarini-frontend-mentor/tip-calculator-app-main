class ManageTips {
    constructor(tip, c1, c2) {
        this.tip = tip;
        this.c1 = c1;
        this.c2 = c2;
    }
    handleEvent(event) {
        let etvNotEmpty = () => { 
            if(event.target.value != '') return true; 
            else return false;
        }
        if(event.target.type === 'button') { 
            event.target.parentNode.lastElementChild.style = '';
            event.target.parentNode.lastElementChild.value = 'Custom';
        }
        else if(event.target.type === 'text') {
            switch(event.type) {
                case 'focus':
                    event.target.style.borderColor = this.c1;
                    if(etvNotEmpty() || !isNaN(event.target.value)) event.target.value = '';
                    break;
                case 'input':
                    event.target.style.borderColor = this.c1;
                    if(isNaN(event.target.value)) event.target.value = event.target.value.slice(0,-1);
                    if(event.target.value < 0) event.target.value = 0;
                    else if(event.target.value > 100) event.target.value = 100;
                    break;
                case 'blur':
                    if(etvNotEmpty()) { 
                        event.target.value = event.target.value + '%';
                        event.target.style.color = this.c2;
                        event.target.style.backgroundColor = this.c1;
                    } else { 
                        event.target.value = 'Custom'; 
                        event.target.backgroundColor = '';
                    }
                    break;
            }
        }   
    }
}

// ref https://stackoverflow.com/questions/16053866/javascript-pass-multiple-arguments-to-eventlistener-and-the-event
var calcAmount = function(b, st, p) {  // calcAmount is a function that accepts 4 arguments and return the listener
    return function curriedFunction(e) {  // 'addEventListener' 2nd argument 'callback listener' accepts one argument (event)
        //calcAmount();  <--- perche' e' stata chiamata questa funzione nella ref?
        //let et = e.type;
        let billVal = b.value;
        let tipVal;
        let peopleVal = p.value;
        let etcn = e.target.className.split(" "); // is "let" right?
        //console.log(etcn);
        var etcnCheck = (etcn, name) => {
            let chk; 
            if(etcn.indexOf(name) != -1) chk = true;
            else chk = false;
            return chk;
        }; 
        console.log(etcn, etcnCheck(etcn,"ci-tg-input"), etcnCheck(etcn, "ci-tg-input-custom"));
        if(etcnCheck(etcn, "ci-tg-input") && !etcnCheck(etcn, "ci-tg-input-custom")) {
            if(e.type == 'input') {
                //console.log("input");
                if(st) {st = null;}
                st = e.target.value;
            }
        }
        else if(etcnCheck(etcn, "ci-tg-input")) {
            if(e.type == 'click') {
                //co
                if(st) {st = null;}
                st = e.target.value.slice(0,-1);
            }
        }
        //console.log(billVal,peopleVal,st);
        /*if(etcn.indexOf("ci-tg-input-custom")  != -1) {
            if(e.target.className.split(" ").length > 1) {
                tipVal = e.target.value 
            }
        }*/
        /*let etcn = e.target.className.split(" ").indexOf("ci-tg-input"); // TODO: try here, to understand the catch about listener
        if(etcn != -1) {
            if(etcn.indexOf("ci-tg-input-custom") != -1 && et == "input") tipVal = e.target.value;
            else tipVal = e.target.value.slice(0,-1);
        }*/
    }
}


function tcamValue() {
    let bill = document.getElementsByClassName("ci-bill-input")[0];
    let tip = document.querySelectorAll(".ci-tg-input");
    let selectTip;
    let people = document.getElementsByClassName("ci-people-input")[0];
    let c1 = 'hsl(172, 67%, 45%)';
    let c2 = 'hsl(183, 100%, 15%)';
    let manageTips = new ManageTips(tip, c1, c2);
    let evtArray = ['input', 'click', 'blur'];
    let cA = calcAmount(bill, selectTip, people);

    tip.forEach((item) => {
        item.addEventListener('click', manageTips);
        item.removeEventListener('click', manageTips);
        item.addEventListener('focus', manageTips);
        //item.removeEventListener('focus', manageTips);
        item.addEventListener('input', manageTips);
        item.addEventListener('blur', manageTips);
    });
    ['input', 'click', ].forEach((ev) =>  {document.addEventListener(ev, cA) });
}

tcamValue();


//TODO: trying new approach about tip event triggered