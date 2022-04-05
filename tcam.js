class Calc {
    constructor(bill, tip, people, c1, c2) {
        this.bill = bill;
        this.tip = tip;
        this.people = people;
        this.peopleBillEvents = ['click', 'input', 'focusout', 'keyup', 'keydown'];
        this.tipEvents = ['click', 'mouseup', 'input', 'focus', 'focusin', 'focusout', 'keyup', 'keydown'];
        this.c1 = c1;
        this.c2 = c2;
        this.init(); //REMEMBER :)
    }

    init() {
        this.peopleBillEvents.forEach(ev => {
            this.bill.addEventListener(ev, this);
            this.people.addEventListener(ev, this);
        });
        this.tipEvents.forEach(ev => this.tip.addEventListener(ev, this));
    }
    handleEvent(event) {
        if(this.checkClass(event.currentTarget, 'ci-bill-amount')) this.handleBillPeople(event, 'bill');
        if(this.checkClass(event.target, 'ci-tg-input')) this.handleTips(event);
        if(this.checkClass(event.currentTarget, 'ci-people-amount')) this.handleBillPeople(event, 'people');
    }

    checkClass(target, chk) { 
        let cl;
        if(target.className.indexOf(chk) !== -1) { 
            cl = target.className;
        }
        return (cl && cl.includes(chk))? chk : false;
    }
    setTipOnClickStyle(elEv, et, cl) {
        if(elEv) elEv.classList.remove(cl);
        et.classList.add(cl);
    }
    setInputOnFocusoutStyle(et, color, fWeight) {
        if(et.value === '0' || et.value === '') {
            et.style.color = '';
            et.style.fontWeight = '';
        }else{
            et.style.color = color;
            et.style.fontWeight = fWeight;
        }
    }
    checkAllProp(a, o) {
        let all = a.every(k => o.hasOwnProperty(k));
        if(all && Object.values(o).every(v => v !== '')) { 
            return all;   
        }
        else {
            return false;
        }         
    }

    handleBillPeople(e, t) {
        let et = (e.target.tagName === 'INPUT')? e.target : e.currentTarget.querySelector('input'); // : this.querySelector('input'); 'this' doesn't match event.currentTarget: it's class 'Calc';

        switch(e.type) {
            case 'click':
                et.style.caretColor = 'auto';
                if(et !== e.target) et.focus();
                if( et.value === '0' || sessionStorage[t] === '0') et.value = '';
                break;
            case 'input':
                if(et.value && this.checkClass(et, t) === 'bill') { 
                    sessionStorage[t] = Number.parseFloat(et.value);
                }
                else if(et.value && this.checkClass(et, t) === 'people') {
                    sessionStorage[t] = Number.parseInt(et.value);
                }
                if(sessionStorage[t] < 0) {
                    et.value = '';
                }
                break;
            case 'focusout':
                if(!sessionStorage[t] && (et.value === '')) {
                    et.value = '0';
                }
                else if(sessionStorage[t]) {
                    et.value = sessionStorage[t].toString();
                }
                et.style.caretColor = 'transparent'; // it vanishes control over cursor
                this.setInputOnFocusoutStyle(et, this.c2, '600');
                break;
            case 'keyup':
                if(t === 'bill') {
                    et.value = et.value.replace(/[^0-9.]+/, '');  // String.prototype.replace has a return, so you need to overwrite et.value
                }
                else if(t === 'people') {
                    et.value = et.value.replace(/[^0-9]+/, '');
                }
                break;
            case 'keydown': 
                let keyC = e.keyCode;
                switch(keyC) {
                    case 8:
                        if(sessionStorage[t].length === 0) sessionStorage.removeItem(t);
                        if(this.checkClass(et, 'ci-bill-input')) { 
                            sessionStorage[t] = et.value.slice(0,-1);
                        }
                        else if(this.checkClass(et, 'ci-people-input')) {
                            sessionStorage[t] = et.value.slice(0,-1);
                        }
                        break;
                    case 13:
                        et.style.caretColor = 'transparent';
                        this.setInputOnFocusoutStyle(et, this.c2, '600');
                        break;
                }
                break;
        }
        this.getResults();
    }
    handleTips(e) {
        let et = e.target,
            ect = e.currentTarget,
            lc = ect.lastElementChild,
            customClass = 'ci-tg-input-clicked',
            tipClicked = ect.querySelector('.' + customClass);
        switch(et.type) {
            case 'button':
                switch(e.type) {                    
                    case 'click':
                    case 'focusin':
                        lc.style = '';
                        lc.value = 'Custom';
                        this.setTipOnClickStyle(tipClicked, et, customClass);
                        sessionStorage['tip'] = Number.parseInt(et.value.slice(0, -1)); 
                        break;
                }
            break;
            case 'text':
                switch(e.type) {
                    case 'click':
                        et.value = '';
                        this.setTipOnClickStyle(tipClicked, et, customClass);
                        break;
                    case 'focus':
                        et.style.borderColor = this.c1;
                        if(et.value != '' || !isNaN(et.value)) et.value = '';
                        break;
                    case 'input':
                        et.style.borderColor = this.c1;
                        if(isNaN(et.value)) et.value = et.value.slice(0,-1);
                        if(et.value < 0) {
                            et.value = '0';
                        }
                        else if(et.value > 100) {
                            et.value = '100';
                        }
                        sessionStorage['tip'] = Number.parseInt(et.value);
                        break;
                    case 'keydown':
                        if(e.keyCode === 13) {
                            et.style.color = this.c2;
                            et.style.backgroundColor = this.c1;
                        }
                        break;
                    case 'keyup':
                        if(e.keyCode === 13) {
                            sessionStorage['tip'] == Number.parseInt(et.value);
                            if(et.value.slice(-1) != '%') et.value = et.value + '%';
                            et.style.color = this.c2;
                            et.style.backgroundColor = this.c1;
                            et.style.caretColor = 'transparent';
                            et.preventDefault();
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
        let billInserted, tipInserted, peopleInserted,
            tipResult = document.querySelector('.crg-tip-result'),
            totalResult = document.querySelector('.crg-total-result'),
            allProp = this.checkAllProp(['bill', 'tip', 'people'], sessionStorage);
        
        if(allProp) { //'sessionStorage' just stores strings. You need JSON.parse to extract type https://www.javascripttutorial.net/web-apis/javascript-localstorage/#:~:text=The%20sessionStorage%20can%20store%20only,the%20sessionStorage%20using%20the%20JSON.
            billInserted = JSON.parse(sessionStorage.bill);
            tipInserted = JSON.parse(sessionStorage.tip) * 0.01;
            peopleInserted = JSON.parse(sessionStorage.people);

            if(peopleInserted !== 0) {
                let tipPerPerson = billInserted * tipInserted  / peopleInserted,
                    totalPerPerson = billInserted / peopleInserted + tipPerPerson;
                if(Number.isInteger(tipPerPerson)) tipResult.innerText = tipPerPerson;
                else tipResult.innerText = Number.parseFloat(tipPerPerson).toFixed(2);
                if(Number.isInteger(totalPerPerson)) totalResult.innerText = totalPerPerson;
                else totalResult.innerText = Number.parseFloat(totalPerPerson).toFixed(2);
            } else {
                tipResult.innerText = 0;
                totalResult.innerText = 0;
            }
        }
    }
} 

class ResetValue {
    constructor(container, c1, c2) {
        this.container = container;
        this.inputElements = document.querySelectorAll('input');
        this.resultValues = document.querySelectorAll('.cr-grid-result');
        this.c1 = c1;
        this.c2 = c2;
        this.init();
    }

    checkClass(el, cl) {
            if(el.className.split(' ').indexOf(cl) !== -1) return el;        
    }
    clearValues(ct, cr) {
        this.inputElements.forEach( ie => {
            switch(ie.type) {
                case 'text':
                    ie.value = (this.checkClass(ie, ct))? 'Custom' : '0';
                    break;
                case 'button':
                    ie.classList.remove(cr);
                    break;
            }
        });
        this.resultValues.forEach( rv => { 
            rv.innerText = '0'; 
        });
    }
    init() { //this is the object from 'resButton'
        sessionStorage.clear();
        this.container.addEventListener('click', this); //passing the object to handleEvent
    }

    handleEvent(e) {
        let classTip = 'ci-tg-input',
            classRemove = 'ci-tg-input-clicked';
        switch(e.type) {
            case 'click':
                this.clearValues(classTip, classRemove); //this is the event.currentTarget (RESET button)
                sessionStorage.clear();
            break;
        }
    }

}

function tcamValue() {
    document.addEventListener('DOMContentLoaded', function() { 
        sessionStorage.clear();
    });
    let bill = document.querySelector('.ci-bill-amount'),
        tip = document.querySelector('.ci-tip-grid'),
        people = document.querySelector('.ci-people-amount'),
        resButton = document.querySelector('.cr-button-reset');

    let c1 = 'hsl(172, 67%, 45%)';
    let c2 = 'hsl(183, 100%, 15%)';
    
    new Calc(bill, tip, people, c1, c2);
    new ResetValue(resButton, c1, c2); 
}

tcamValue();