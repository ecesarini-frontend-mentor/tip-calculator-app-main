class GetValue {
    constructor(bill, tip, tipPerc) {
        this.bill = bill;
        this.tip = tip;
        this.tipPerc = tipPerc;
    }
    handleEvent(event) {
        //console.log(event.target);
        let tipClkIndex = Array.from(this.tip).indexOf(event.target);
        console.log(tipClkIndex);
        if(tipClkIndex < 5) { 
            switch(event.type) {
                case 'click':
                    let perc = this.tipPerc[tipClkIndex];
                    //console.log(perc);
                }
        } else if(tipClkIndex === 5) {
            switch(event.type) {
                case 'keypress':
                    event.target.value += '%';
                    break;
                case 'input':
                    // TODO: the way to bound input (maybe by regex?) 
                    event.target.style.textAlign = 'center';
                    event.target.value = event.target.value.replace('%', '') + '%';
                    event.target.selectionEnd = event.target.value.length - 1;
                    break;
            }
        }
    }
}

function tcamValue() {
    let bill = document.getElementsByClassName("ci-bill-input")[0].value;
    let tip = document.querySelectorAll(".ctp-action");
    console.log(tip);
    let tipPerc = [0.05, 0.1, 0.15, 0.25, 0.5];

    let getValue = new GetValue(bill, tip, tipPerc);
    tip.forEach((item) => {
        item.addEventListener('click', getValue);
        item.addEventListener('input', getValue);
        item.addEventListener('blur', getValue);
    })  
}
tcamValue();

