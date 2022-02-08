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
                    console.log(perc);
                }
        } else {//if (tipClkIndex === 5) {
            switch(event.type) {
                case 'click':
                    //console.log(event.dataset);
                    //event.target.placeholder = "%";
                    //console.log(event.target, event.currentTarget);
                    break;
                case 'focus':
                    let percCustom = event.target.value / 100;
                    console.log(percCustom);
                    //event.target.value += "%";
                    break;
                case 'blur':
                    // TODO: manage custom event
                    event.target.value += "%";
                    //console.log(event.target, event.currentTarget);
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

