class GetTipValue {
    constructor(tip, c1, c2) {
        this.tip = tip;
        this.c1 = c1;
        this.c2 = c2;
    }
    handleEvent(event) {
        event.preventDefault();
        let tipClkIndex = Array.from(this.tip).indexOf(event.currentTarget);
        console.log(tipClkIndex);
        if(tipClkIndex < 5) { 
            var lc = event.target.parentNode.lastElementChild;
            switch(event.type) {
                case 'click':
                    event.preventDefault();
                    //let perc = this.tipPerc[tipClkIndex];
                    lc.style.backgroundColor = '';
                    lc.value = 'Custom';
                    break;
                }
        } else if(tipClkIndex === 5) {
            event.preventDefault();
            let etvNotEmpty = () => { 
                if(event.target.value != '') return true; 
                else return false;
            }
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

class CalcValues {
    constructor(bill, tip, people, bgColor) {
        this.bill = bill;
        this.tip = tip;
        this.people = people;
        this.bgColor = bgColor;
    }
    handleEvent(event) {
        if(event.type === 'click' || event.type === 'input') {
            let billValue = this.bill.value;
            let peopleValue = this.people.value;
            let tipValue;
            this.tip.forEach((item) => {
                if(item.style.backgroundColor == this.bgColor) tipValue = item.value.slice(0,-1)*0.01;
            });
            let tipAmount = billValue*tipValue/peopleValue;
            let total = billValue/peopleValue + tipAmount;
            document.getElementsByClassName("crg-tip-result")[0].value = '$' + tipAmount;
            document.getElementsByClassName("crg-total-result")[0].value = '$' + total;
        }   

    }
}

function tcamValue() {
    let bill = document.getElementsByClassName("ci-bill-input")[0];
    let tip = document.querySelectorAll(".ci-tg-perc");
    //let tip = document.getElementsByClassName("ci-tg-perc");
    let people = document.getElementsByClassName("ci-people-input")[0];
    let c1 = 'hsl(172, 67%, 45%)';
    let c2 = 'hsl(183, 100%, 15%)';
    //let tipPerc = [0.05, 0.1, 0.15, 0.25, 0.5];

    let getTipValue = new GetTipValue(tip, c1, c2);
    //let calcValues = new CalcValues(bill, tip, people, c1);
    tip.forEach((item) => {
        item.addEventListener('click', getTipValue);
        item.addEventListener('input', getTipValue);
        item.addEventListener('blur', getTipValue);
    }) 
    //document.getElementsByClassName("calc-insert")[0].addEventListener('click', calcValues);
    //document.getElementsByClassName("calc-insert")[0].addEventListener('input', calcValues);
    //console.log(getTipClicked(tip, c1));
    // TODO: 
    // why vanish clicked tip event when you click outside the element?
    // fetch data inside DOM input: 
}
tcamValue();