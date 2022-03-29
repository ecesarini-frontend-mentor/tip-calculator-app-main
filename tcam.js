//TODO: 'bill' & 'people' event are handled depending on spot you click (error referring to the edges of the box, because of addEventListener call); checkClass() handles the thing.
// look at new project web_design_01 to understand 'bubbling' events' handling
//DEBUG: take a look into //:desktop/tcam_debug.jpg about clicking outside eventListener target (the second one);
class Calc {
    constructor(c1, c2) {
        this.c1 = c1;
        this.c2 = c2;
    }
    checkClass(et, chk) { 
        let cl;
        if(et.className.indexOf(chk) !== -1) { 
            cl = et.className;
        }
        return (cl && cl.includes(chk))? chk : false;
    }
    setStyle(elEv, et, cl) {
        if(elEv) elEv.classList.remove(cl);
        et.classList.add(cl);
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
    handleEvent(event) {
        if(this.checkClass(event.target, 'ci-tg-input')) this.handleTips(event);
        if(this.checkClass(event.target, 'bill')) this.handleBillPeople(event, 'bill');
        if(this.checkClass(event.target, 'people')) this.handleBillPeople(event, 'people');
    }

    handleBillPeople(e, t) {
        let et = e.target;  // event.target is an object so you are referring to it by reference; //let etv = et.value; // event.target.value is a property of an object (event.target). You can't modify its value through a new variable
        console.log(et); //

        switch(e.type) {
            case 'click':
                et.style.caretColor = 'auto';
                if( sessionStorage[t] ) {
                    if( sessionStorage[t].length === 1 || et.value !== '' || et.value !== 0 ) {
                        const pos = et.value.length;
                        et.setSelectionRange(pos, pos);
                    } else {
                        et.value = '';
                    }
                } else {
                    et.value = '';
                }
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
                if( !sessionStorage[t] && et.value === '') {
                    et.value = '0';
                }
                else if(sessionStorage[t]) {
                    et.value = sessionStorage[t].toString();
                }
                et.style.caretColor = 'transparent'; // it vanishes control over cursor
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
                        break;
                }
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
                    case 'focusin':
                        lc.style = '';
                        lc.value = 'Custom';
                        this.setStyle(tipClicked, et, customClass);
                        sessionStorage['tip'] = Number.parseInt(et.value.slice(0, -1)); 
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
                            //et.style.caretColor = 'transparent';
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
        let billInserted, tipInserted, peopleInserted;
        let tipResult = document.querySelector('.crg-tip-result');
        let totalResult = document.querySelector('.crg-total-result');
        let allProp = this.checkAllProp(['bill', 'tip', 'people'], sessionStorage);
        
        if(allProp) { //'sessionStorage' just stores strings. You need JSON.parse to extract type https://www.javascripttutorial.net/web-apis/javascript-localstorage/#:~:text=The%20sessionStorage%20can%20store%20only,the%20sessionStorage%20using%20the%20JSON.
            billInserted = JSON.parse(sessionStorage.bill);
            tipInserted = JSON.parse(sessionStorage.tip) * 0.01;
            peopleInserted = JSON.parse(sessionStorage.people);

            if(peopleInserted !== 0) {
                let tipPerPerson = billInserted * tipInserted  / peopleInserted;
                let totalPerPerson = billInserted / peopleInserted + tipPerPerson;
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
        let classTip = 'ci-tg-input';
        let classRemove = 'ci-tg-input-clicked';
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
    //let bill = document.querySelector('.ci-bill-amount').closest('input');
    let bill = document.querySelector('.ci-bill');
    let tip = document.querySelector('.ci-tip-grid');
    //let people = document.querySelector('.ci-people-amount').closest('input');
    let people = document.querySelector('.ci-people');

    let c1 = 'hsl(172, 67%, 45%)';
    let c2 = 'hsl(183, 100%, 15%)';
    
    let calc = new Calc(c1, c2);

    let resButton = document.querySelector('.cr-button-reset');
    new ResetValue(resButton, c1, c2);
    
    ['click', 'input', 'focusout', 'keyup', 'keydown'].forEach((ev) => {
        bill.addEventListener(ev, calc);
        people.addEventListener(ev, calc);
    });
    ['click', 'mouseup', 'input', 'focus', 'focusin', 'focusout', 'keyup', 'keydown'].forEach((ev) => {
        tip.addEventListener(ev, calc);
    });
}

tcamValue();