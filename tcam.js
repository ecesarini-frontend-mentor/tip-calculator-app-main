class GetTipValue {
    constructor(tip, c1, c2) {
        this.tip = tip;
        this.c1 = c1;
        this.c2 = c2;
    }
    handleEvent(event) {
        //event.preventDefault();
        let et = event.target;
        let ett = event.target.type;
        //var lcCustom = event.target.lastElementChild;
        if(ett === 'text') {          // CHECK FROM HERE 
            let ettvNotEmpty = () => { 
                if(ett.value != '') return true; 
                else return false;
            }
            switch(event.type) {

            }
        }
        /*let customNotEmpty = () => { 
            if(lcCustom.value != '') return true; 
            else return false;
        }
        if(et === 'click' || et === 'focus'){
            if(customNotEmpty()) {
            }

        }*/
            switch(event.type) {
                case 'click':
                    //let perc = this.tipPerc[tipClkIndex];
                    //lcCustom.style.backgroundColor = '';
                    //lcCustom.value = 'Custom';
                    console.log(event.target, event.target.type);
                    break;
                /*case 'blur':
                    console.log(focused)
                    if(focused === null) {
                        event.currentTarget.style.backgroundColor = this.c1
                    }
                    else {
                        event.currentTarget.style.backgroundColor = 'green';
                     //   focused = null;
                    }
                    break;*/
        //        }
        /*} else if(tipClkIndex === 5) {
            event.preventDefault();
            let etvNotEmpty = () => { 
                if(event.currentTarget.value != '') return true; 
                else return false;
            }
            switch(event.type) {
                case 'focus':
                    event.currentTarget.style.borderColor = this.c1;
                    if(etvNotEmpty() || !isNaN(event.currentTarget.value)) event.currentTarget.value = '';
                    break;
                case 'input':
                    event.currentTarget.style.borderColor = this.c1;
                    if(isNaN(event.currentTarget.value)) event.currentTarget.value = event.currentTarget.value.slice(0,-1);
                    if(event.currentTarget.value < 0) event.currentTarget.value = 0;
                    else if (event.currentTarget.value > 100) event.currentTarget.value = 100;
                    break;
                case 'blur':
                    if(etvNotEmpty()) { 
                        event.currentTarget.value = event.currentTarget.value + '%';
                        event.currentTarget.style.color = this.c2;
                        event.currentTarget.style.backgroundColor = this.c1;
                    } else { 
                        event.currentTarget.value = 'Custom'; 
                        event.currentTarget.backgroundColor = '';
                    }
                    break;
            }*/
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

function clearTipBg() {

}

function tcamValue() {
    let bill = document.getElementsByClassName("ci-bill-input")[0];
    let tip = document.querySelector(".ci-tip-grid");
    let people = document.getElementsByClassName("ci-people-input")[0];
    let c1 = 'hsl(172, 67%, 45%)';
    let c2 = 'hsl(183, 100%, 15%)';

    //console.log(tip);
    let getTipValue = new GetTipValue(tip, c1, c2);
    //tip.forEach((item) => {
        //item.addEventListener('click', getTipValue);
        tip.addEventListener('focus', clearTipBg);
        tip.addEventListener('click', getTipValue);
        tip.addEventListener('focus', getTipValue);
        tip.addEventListener('input', getTipValue);
        tip.addEventListener('blur', getTipValue);
    //}) 
}
tcamValue();