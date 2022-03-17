//TODO:
// Cursor on the left clicking 'Bill', 'People' field input.V
// Try to understand which event's happening onclick, 'cause clicking outside 'reset button' handling changes behaviour.
// @.151

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
    setStyle(elEv, et, cl) {
        if(elEv) elEv.classList.remove(cl);
        et.classList.add(cl);
    }
    handleBillPeople(e, t) {
        let et = e.target;
        switch(e.type) {
            case 'click':
                if(et.value === 0 || et.value !== '') et.value = '';
                break;
            case 'input':
                localStorage[t] = et.value;
                break;
            case 'focusout':
                if( !localStorage[t] && et.value === '') et.value = 0;
                else if(localStorage[t]) et.value = localStorage[t];
                et.style.caretColour = 'transparent';
                break;
        }
    }
    handleTips(e) {
        let et = e.target;
        let ect = e.currentTarget;
        let lc = ect.lastElementChild;
        let customClass = 'ci-tg-input-clicked';
        let tipClicked = ect.querySelector('.' + customClass);
        switch(et.type) {
            case 'button':
                switch(e.type) {                    
                    case 'click':
                        lc.style = '';
                        lc.value = 'Custom';
                        this.setStyle(tipClicked, et, customClass);
                        break;
                    case 'mouseup':
                        localStorage['tip'] = et.value.slice(0, -1); 
                        break;
                    case 'focusout':
                        //console.log(this);
                        break;
                }
            this.getResults();
            break;
            case 'text':
                switch(e.type) {
                    case 'click':
                        et.value = '';
                        this.setStyle(tipClicked, et, customClass);
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
        this.getResults();
    }
    getResults() {
        let billInserted, tipInserted, peopleInserted;
        let tipResult = document.querySelector('.crg-tip-result');
        let totalResult = document.querySelector('.crg-total-result');
        
        if(localStorage.length === 3) {
            billInserted = parseInt(localStorage.bill);
            tipInserted = parseInt(localStorage.tip) * 0.01;
            peopleInserted = parseInt(localStorage.people);

            if(peopleInserted !== 0) {
                let tipPerPerson = billInserted * tipInserted  / peopleInserted;
                let totalPerPerson = billInserted / peopleInserted + tipPerPerson;
                tipResult.innerText = Number.parseFloat(tipPerPerson).toFixed(2);
                totalResult.innerText = Number.parseFloat(totalPerPerson).toFixed(2);
            }
        }
    }
    handleEvent(event) {
        //console.log(event.target);
        if(this.checkClass(event.target, 'ci-tg-input')) this.handleTips(event);
        if(this.checkClass(event.target, 'ci-bill-input')) this.handleBillPeople(event, 'bill');
        if(this.checkClass(event.target, 'ci-people-input')) this.handleBillPeople(event, 'people');
        //if(event.currentTarget.tagName === 'BODY') this.getResults();
        //if(event.target)
    }
} 

class ResetValue {
    constructor(container, c1, c2) {
        this.container = container;
        this.c1 = c1;
        this.c2 = c2;
        this.init();
    }

    init() {
        for(let key in localStorage) delete localStorage[key]; //inspect about 'for in, ...'
        this.container.addEventListener('click', e => this.clearValue(e));
        this.container.addEventListener('mousedown', e => this.styleClick(e));
    }
    styleClick(e) {
        let et = e.target;
        if(e.type === 'mousedown') {
                et.style.color = this.c1;
                et.style.backgroundColor = this.c2;
        }
    }
    clearValue(e) {
        if(e.type === 'click') {
            let inputTg = document.querySelector('.calc-insert').querySelector('input');
            inputTg.style = '';
            if(inputTg.className.split(' ').indexof('ci-tg-input-custom') === -1) inputTg.value = 'Custom';
            else inputTg.value = '0';
        }
    }
    /*handleEvent(event) {
        
    }*/
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

//    let resButton = document.querySelector('.cr-button-reset');
//    new ResetValue(resButton, c1, c2);
    
    ['click', 'input', 'focusout'].forEach((ev) => {
        bill.addEventListener(ev, calc);
        people.addEventListener(ev, calc);
    });
    ['click', 'mouseup', 'input', 'focus', 'focusout', 'keyup', 'keydown'].forEach((ev) => {
        tip.addEventListener(ev, calc);
    });
//    body.addEventListener('click', calc);
}

tcamValue();