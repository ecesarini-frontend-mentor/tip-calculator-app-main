class ManageTips {
    constructor(tip, c1, c2) {
        this.tip = tip;
        this.c1 = c1;
        this.c2 = c2;
        //this.fo = fo;
    }
    handleEvent(event) {
        let etvNotEmpty = () => { 
            if(event.target.value != '') return true; 
            else return false;
        }
        //console.log(event.target, event.currentTarget);
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
    /*setFocus(fo, event) {
        if(event.type === 'focusout') {
            fo = event.target.value;
            return fo;
        }
    }*/
}

/*class CalcValues {
    /*constructor(bill, tip, people, bgColor) {
        this.bill = bill;
        this.tip = tip;
        this.people = people;
        this.bgColor = bgColor;
    }
    calcTip() {
        let tipValue = Array.from(this.tip);
        tipValue.forEach((item) => {
            if(item.style.backgroundColor == this.bgColor) 
        });
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
}*/


function tcamValue() {
    let bill = document.getElementsByClassName("ci-bill-input")[0];
    let tip = document.querySelectorAll(".ci-tg-perc");
    let people = document.getElementsByClassName("ci-people-input")[0];
    let c1 = 'hsl(172, 67%, 45%)';
    let c2 = 'hsl(183, 100%, 15%)';
    var selected;

    console.log(tip);
    let manageTips = new ManageTips(tip, c1, c2);
    tip.forEach((item) => {
        //item.addEventListener('click', manageTips);
        //tip.addEventListener('focus', clearTipBg);
        item.addEventListener('click', manageTips);
        item.addEventListener('focus', manageTips);
        item.addEventListener('input', manageTips);
        item.addEventListener('blur', manageTips);
    });
}
tcamValue();
//TODO: try create a class (or function) that manages addEventListener hanndling DOM events as document.*bill, document.*tip, document.*people