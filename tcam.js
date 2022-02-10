class GetValue {
    constructor(bill, tip, tipPerc) {
        this.bill = bill;
        this.tip = tip;
        this.tipPerc = tipPerc;
    }
    handleEvent(event) {
        //console.log(event.target);
        let tipClkIndex = Array.from(this.tip).indexOf(event.target);
        //console.log(tipClkIndex);
        if(tipClkIndex < 5) { 
            switch(event.type) {
                case 'click':
                    let perc = this.tipPerc[tipClkIndex];
                }
        } else if(tipClkIndex === 5) {
            switch(event.type) {
                case 'click':
                    if(event.target.value != '') event.target.value = '';
                    break;
                case 'blur':
                    event.target.value = event.target.value + '%';
                    break;
                case 'input':
                    event.target.style.textAlign = 'center';
                    if(event.target.value < 0) event.target.value = 0;
                    else if (event.target.value > 100) event.target.value = 100;
                    break;
            }
        }
    }
}

function tcamValue() {
    let bill = document.getElementsByClassName("ci-bill-input")[0].value;
    let tip = document.querySelectorAll(".ctp-action");
    //console.log(tip);
    let tipPerc = [0.05, 0.1, 0.15, 0.25, 0.5];

    let getValue = new GetValue(bill, tip, tipPerc);
    tip.forEach((item) => {
        item.addEventListener('click', getValue);
        item.addEventListener('input', getValue);
        item.addEventListener('blur', getValue);
    }) 
    // TODO: fetch data inside DOM input: 
}
tcamValue();