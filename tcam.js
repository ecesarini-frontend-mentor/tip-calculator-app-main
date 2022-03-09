// TODO: a look on https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener to understand scope about event

/*const ManageBill = function(element) {
    if
}*/

class ManageTips {
    constructor(c1, c2) {
        //this.tip = tip;
        this.c1 = c1;
        this.c2 = c2;
        console.log('ciao');
        this.tipClicked = undefined;
    }

    checkClass(et, targetClass) {
        let cn = et.closest('.' + `${targetClass}`).className.split(' ').indexOf(targetClass); // check from here
        if(cn) return true;
        else return false;
    }

    handleTips(e) {
        let et = e.target;
        console.log(et);
        switch(et.type) {
            case 'button':
                switch(e.type) {
                    case 'click':
                }
            break;
            case 'text':
                switch(e.type) {
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
                    case 'blur':
                        if(et.value != '') {
                            et.value = et.value + '%';
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
        console.log(event);
        if(this.checkClass(event.target, 'ci-tg-input')) this.handleTips(event);
    }
} 


function tcamValue() {
    //let bill = document.getElementsByClassName("ci-bill-input")[0];
    let tip = document.getElementsByClassName("ci-tip-grid")[0];
    //let people = document.getElementsByClassName("ci-people-input")[0];

    let c1 = 'hsl(172, 67%, 45%)';
    let c2 = 'hsl(183, 100%, 15%)';

    document.addEventListener('DOMContentLoaded', function() { 
        localStorage.clear();
        //localStorage['tipClicked'] = null;
    });

    //bill.addEventListener('input', manageBill); 
    //people.addEventListener('input', peopleCls);
    let tipsCls = new ManageTips(c1, c2);
    ['click', 'input', 'focus', 'blur'].forEach((ev) => {tip.addEventListener(ev, tipsCls)});
}

tcamValue();