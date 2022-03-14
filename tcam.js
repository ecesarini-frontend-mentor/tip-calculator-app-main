// TODO: a look on https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener to understand scope about event

// TODO: handle localStorage values and manage the result by these
class ManageTips {
    constructor(c1, c2) {
        this.c1 = c1;
        this.c2 = c2;
        this.tipClicked = undefined;
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

    handleEvent(event) {
        //console.log(event.target);
        if(this.checkClass(event.target, 'ci-tg-input')) this.handleTips(event);
        if(this.checkClass(event.target, 'ci-bill-input')) this.handleBillPeople(event, 'bill');
        if(this.checkClass(event.target, 'ci-people-input')) this.handleBillPeople(event, 'people');
        //if(this.checkClass(event.target, 'ci-tg-input-custom')) this.handleTipsCustom(event);
    }
} 


function tcamValue() {
    let bill = document.getElementsByClassName("ci-bill")[0];
    let tip = document.getElementsByClassName("ci-tip-grid")[0];
    let people = document.getElementsByClassName("ci-people")[0];

    let c1 = 'hsl(172, 67%, 45%)';
    let c2 = 'hsl(183, 100%, 15%)';

    document.addEventListener('DOMContentLoaded', function() { 
        localStorage.clear();
        //localStorage['tipClicked'] = null;
    });

    //bill.addEventListener('input', manageBill); 
    //people.addEventListener('input', peopleCls);
    let tipsCls = new ManageTips(c1, c2);
    //tip.addEventListener('focusout', tipsCls);
    
    ['click', 'input', 'focusout'].forEach((ev) => {
        bill.addEventListener(ev, tipsCls);
        people.addEventListener(ev, tipsCls);
    });
    ['click', 'mouseup', 'input', 'focus', 'focusout', 'keyup', 'keydown'].forEach((ev) => {
        tip.addEventListener(ev, tipsCls);
    });
    /*['click', 'input', 'focusout'].forEach((ev) => {
        people.addEventListener(ev, tipsCls);
    });*/
    
    /*['click', 'mouseup', 'input', 'focus', 'focusout', 'keyup', 'keydown'].forEach((ev) => {
        bill.addEventListener(ev, tipsCls);
    //    bill.removeEventListener(ev, tipsCls);
        tip.addEventListener(ev, tipsCls);
    //    tip.removeEventListener(ev, tipsCls);
        people.addEventListener(ev, tipsCls);
    //    people.removeEventListener(ev, tipsCls);
    });*/
}

tcamValue();