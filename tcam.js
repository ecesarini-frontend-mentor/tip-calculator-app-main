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
            //document.getElementsByClassName('ci-tg-span')[0].style.backgroundColor = '';
            //document.getElementsByClassName('ci-tg-span')[0].innerText;            
            switch(event.type) {
                case 'click':
                    let perc = this.tipPerc[tipClkIndex];
                    console.log(this.tipPerc[tipClkIndex]);
                }
        } else if(tipClkIndex === 5) {
            console.log(event.target.value);
            let etvNotEmpty = () => { if(event.target.value != '') return true; }
            switch(event.type) {
                //case 'click':
                    //if(etvNotEmpty() || !isNaN(event.target.value)) event.target.value = 'Custom';
                    //if(event.target.value == 'Custom') event.target.value = '';
                    //break;
                case 'focus':
                    event.target.value = '';
                    break;
                case 'blur':
                    if(etvNotEmpty()) { 
                        event.target.value = event.target.value + '%';
                        event.target.style.color = 'hsl(183, 100%, 15%)';
                    } 
                    break;
                case 'input':
                    //event.target.style.textAlign = 'center';
                    //event.target.value = '';
                    if(isNaN(event.target.value)) event.target.value = event.target.value.slice(0,-1);
                    if(event.target.value < 0) event.target.value = 0;
                    else if (event.target.value > 100) event.target.value = 100;
                    //if(etvNotEmpty()) event.target.value += event.target.value;
                    //if(etvNotEmpty()) event.target.parentElement.style.backgroundColor = 'hsl(172, 67%, 45%)';
                    break;
            }
        }
    }
}
class DisplayResult {
    constructor() {}


}
function tcamValue() {
    let bill = document.getElementsByClassName("ci-bill-input")[0].value;
    let tip = document.querySelectorAll(".ci-tg-perc");
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