//TODO:
// It looks like '.ci-tip-grid' needs triggered before others elements involved.  Clicking on '.tip-grid' works if it's latest event on tip.
// Click on 'tip' glitch: event doesn't override cursor behaviour inside the '.ci-bill-input', 'ci-people-input' eventCurrentTarget.
// Cursor on the lef clicking 'Bill', 'People' field input.

class Calc {
    constructor(c1, c2) {
        this.c1 = c1;
        this.c2 = c2;
    }
    checkClass(et, targetClass) {
        let cn = et.className.split(' ').indexOf(targetClass);
        if(cn !== -1) return true;
        else return false;
    }
    handleBillPeople(e, t) {
        let et = e.target;
        switch(e.type) {
            case 'click':
                if(localStorage[t] === null) localStorage[t] = null;
                if(et.value === 0 || et.value !== '') et.value = '';
                break;
            case 'input':
                localStorage[t] = et.value;
                break;
            case 'focusout':
                if( !localStorage[t] && et.value === '') et.value = 0;
                else if(localStorage[t]) et.value = localStorage[t];
                //else et.value =
                et.style.caretColour = 'transparent';
                break;
        }
    }
    handleTips(e) {
        let et = e.target;
        let ect = e.currentTarget;
        switch(et.type) {
            case 'button':
                switch(e.type) {                    
                    case 'click':
                        let lc = ect.lastElementChild;
                        lc.style = '';
                        lc.value = 'Custom';
                       break;
                    case 'mouseup':
                        localStorage['tip'] = et.value.slice(0, -1); 
                       break;
                }
            break;
            case 'text':
                switch(e.type) {
                    case 'click':
                        et.value = '';
                        break;
                    case 'focus':
                        et.style.borderColor = this.c1;
                        if(et.value != '' || !isNaN(et.value)) et.value = '';
                       break;
                    case 'input':
                        et.style.borderColor = this.c1;
                        if(isNaN(et.value)) et.value = et.value.slice(0,-1);
                        if(et.value < 0) et.value = 0;
                        else if(et.value > 100) et.value = 100;
                        localStorage['tip'] = et.value;
                       break;
                    case 'keydown':
                        if(e.keyCode === 13) {
                            et.style.color = this.c2;
                            et.style.backgroundColor = this.c1;
                        }
                        break;
                    case 'keyup':
                        if(e.keyCode === 13) {
                            localStorage['tip'] == et.value;
                            if(et.value.slice(-1) != '%') et.value = et.value + '%';
                            et.style.color = this.c2;
                            et.style.backgroundColor = this.c1;
                        }
                        break;
                    case 'focusout':
                        if(et.value != '') { 
                            if(et.value.slice(-1) != '%') et.value = et.value + '%';                    
                            et.style.color = this.c2
                            et.style.backgroundColor = this.c1;
                        } else {
                            et.value = 'Custom';
                            et.style = '';
                        }
                        break;
                }
                break;
        }
    }
    getResults() {
        let billInserted, tipInserted, peopleInserted;
        if(localStorage.length === 3) {
            billInserted = parseInt(localStorage.bill);
            tipInserted = parseInt(localStorage.tip) * 0.01;
            peopleInserted = parseInt(localStorage.people);

            if(peopleInserted !== 0) {
                let tipPerPerson = billInserted * tipInserted  / peopleInserted;
                let totalPerPerson = billInserted / peopleInserted + tipPerPerson;
                document.querySelector('.crg-tip-result').innerText = Number.parseFloat(tipPerPerson).toFixed(2);
                document.querySelector('.crg-total-result').innerText = Number.parseFloat(totalPerPerson).toFixed(2);
            }
        }
    }
    handleEvent(event) {
        //console.log(event.target);
        if(this.checkClass(event.target, 'ci-tg-input')) this.handleTips(event);
        if(this.checkClass(event.target, 'ci-bill-input')) this.handleBillPeople(event, 'bill');
        if(this.checkClass(event.target, 'ci-people-input')) this.handleBillPeople(event, 'people');
        //if(this.checkClass(event.target, 'ci-tg-input-custom')) this.handleTipsCustom(event);
        if(event.currentTarget.tagName === 'BODY') this.getResults();
    }
} 


function tcamValue() {
    document.addEventListener('DOMContentLoaded', function() { 
        localStorage.clear();
    });
    let bill = document.querySelector('.ci-bill');
    let tip = document.querySelector('.ci-tip-grid');
    let people = document.querySelector('.ci-people');

    let c1 = 'hsl(172, 67%, 45%)';
    let c2 = 'hsl(183, 100%, 15%)';
    
    let body = document.querySelector('body');
    let calc = new Calc(c1, c2);
    
    ['click', 'input', 'focusout'].forEach((ev) => {
        bill.addEventListener(ev, calc);
        people.addEventListener(ev, calc);
    });
    ['click', 'mouseup', 'input', 'focus', 'focusout', 'keyup', 'keydown'].forEach((ev) => {
        tip.addEventListener(ev, calc);
    });
    body.addEventListener('click', calc);
}

tcamValue();