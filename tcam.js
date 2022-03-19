//TODO: reset 'style' and value using class and clicking on "RESET", validate input on 'bill' and 'people' by keyboard
//FIXED: show integer values (e.g //desktop/tcam_display_int.jpg) as integer

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
        this.getResults();
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
                }
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
            billInserted = parseFloat(localStorage.bill);
            tipInserted = parseInt(localStorage.tip) * 0.01;
            peopleInserted = parseInt(localStorage.people);

            if(peopleInserted !== 0) {
                let tipPerPerson = billInserted * tipInserted  / peopleInserted;
                let totalPerPerson = billInserted / peopleInserted + tipPerPerson;
                if(Number.isInteger(tipPerPerson)) tipResult.innerText = tipPerPerson;
                else tipResult.innerText = Number.parseFloat(tipPerPerson).toFixed(2);
                if(Number.isInteger(totalPerPerson)) totalResult.innerText = totalPerPerson;
                else totalResult.innerText = Number.parseFloat(totalPerPerson).toFixed(2);
            }
        }
    }
    handleEvent(event) {
        //console.log(event.target);
        if(this.checkClass(event.target, 'ci-tg-input')) this.handleTips(event);
        if(this.checkClass(event.target, 'ci-bill-input')) this.handleBillPeople(event, 'bill');
        if(this.checkClass(event.target, 'ci-people-input')) this.handleBillPeople(event, 'people');
    }
} 

class ResetValue {
    constructor(container, c1, c2) {
        this.container = container;
        this.inputElements = document.querySelectorAll('input');
        this.billElement = undefined;
        this.tipElement = undefined;
        this.peopleElement = undefined;
        this.resultValue = document.querySelectorAll('.ci-grid-result');
        this.c1 = c1;
        this.c2 = c2;
        this.init();
    }

    checkClass(el, cl) {
        for(let i = 0; i < el.length; i++)
            if(el[i].className.split(' ').indexOf(cl) !== -1) return el[i];        
    }
    findElementsToClear() {
        this.billElement = this.checkClass(this.inputElements, 'ci-bill-input');
        this.tipElement = this.checkClass(this.inputElements, 'ci-tg-input');
        this.peopleElement = this.checkClass(this.inputElements, 'ci-people-input');
    }
    /*styleClick(e) {
        let et = e.target;
        if(e.type === 'mousedown') {
                et.style.color = this.c1;
                et.style.backgroundColor = this.c2;
        }
    }*/
    clearValue() {
            [this.billElement, this.tipElement, this.peopleElement].forEach( item => {
                item.style = '';
                if(item.className.split(' ').indexOf('ci-tg-input-custom') !== -1) item.innerText = 'Custom';
            });
            this.resultValue.forEach( item => {
                item.innerText = '0';
            });
    }
    init() {
        for(let key in localStorage) { //Inspect about 'for in, ...'
            if(Object.hasOwnProperty(key)) delete localStorage[key];         
        }
        this.findElementsToClear();
        //this.container.addEventListener('click', this.clearValue.bind(this)());
        this.container.addEventListener('click', this.clearValue());
        //this.container.addEventListener('mousedown', e => this.styleClick(e));
    }
    /*handleEvent(e) {
        switch(e.type) {
            case 'click':
                this.container.addEventListener
        }
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
    
    let calc = new Calc(c1, c2);

    let resButton = document.querySelector('.cr-button-reset');
    //let resetValue = new ResetValue(resButton, c1, c2);
    new ResetValue(resButton, c1, c2);
    
    ['click', 'input', 'focusout'].forEach((ev) => {
        bill.addEventListener(ev, calc);
        people.addEventListener(ev, calc);
    });
    ['click', 'mouseup', 'input', 'focus', 'focusout', 'keyup', 'keydown'].forEach((ev) => {
        tip.addEventListener(ev, calc);
    });
}

tcamValue();