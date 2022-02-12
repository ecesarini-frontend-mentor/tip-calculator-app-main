class GetTipValue {
    constructor(tip, c1, c2) {
        this.tip = tip;
        this.c1 = c1;
        this.c2 = c2;
    }
    handleEvent(event) {
        let tipClkIndex = Array.from(this.tip).indexOf(event.target);
        if(tipClkIndex < 5) { 
            let lc = event.target.parentNode.lastElementChild;
            switch(event.type) {
                case 'click':
                    //let perc = this.tipPerc[tipClkIndex];
                    lc.style.backgroundColor = '';
                    break;
                }
        } else if(tipClkIndex === 5) {
            let etvNotEmpty = () => { if(event.target.value != '') return true; }
            switch(event.type) {
                case 'click':
                    event.target.style.borderColor = this.c1;
                    if(etvNotEmpty() || !isNaN(event.target.value)) event.target.value = '';
                    break;
                case 'input':
                    event.target.style.borderColor = this.c1;
                    if(isNaN(event.target.value)) event.target.value = event.target.value.slice(0,-1);
                    if(event.target.value < 0) event.target.value = 0;
                    else if (event.target.value > 100) event.target.value = 100;
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

function getTipClicked(tip, c1) {
    tip.forEach((item) => {
        console.log(item.style);//.style.backgroundColor);
        //return item.style.backgroundColor;
        //if(item.style.backgroundColor == c1) return console.log(item);
    });
    //if(this.tip.style.backgroundColor == this.c1) {
        //return this.tip.value;
    //}
}

function tcamValue() {
    let bill = document.getElementsByClassName("ci-bill-input")[0].value;
    let tip = document.querySelectorAll(".ci-tg-perc");
    let c1 = 'hsl(172, 67%, 45%)';
    let c2 = 'hsl(183, 100%, 15%)';
    let tipPerc = [0.05, 0.1, 0.15, 0.25, 0.5];

    let getTipValue = new GetTipValue(tip, c1, c2);
    tip.forEach((item) => {
        item.addEventListener('click', getTipValue);
        item.addEventListener('input', getTipValue);
        item.addEventListener('blur', getTipValue);
    }) 
    console.log(getTipClicked(tip, c1));
    // TODO: fetch data inside DOM input: 
}
tcamValue();