class ManageTips {
    constructor(tip, c1, c2) {
        this.tip = tip;
        this.c1 = c1;
        this.c2 = c2;
        //this.fo = fo;
    }
    handleEvent(event) {
        //console.log(event.target.className.split(" "));
        //console.log(typeof(event.target.className));
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
}

function calcAmounts(e) {
    var focused;
    let evSpl = e.target.className.split(" ");
    /*let etvFilled = () => { 
        if(event.target.value != '' && isNaN(event.target.value.slice(0,-1))) return true; 
        else return false;
    }*/
    //if(evSpl.includes("ci-bill-input") || evSpl.includes("ci-people-input") || evSpl.includes("ci-"))
    //if(!evSpl.includes("ci-tg-input-custom")) 
    focused = document.activeElement.value;
    if(e.type === 'focus' && e.target.type === 'button') focused = document.activeElement.value.slice(0,-1)*0.01;
    //else focused = document.activeElement.value;

    //else if(evSpl.includes("ci-tg-input"))
    //    focused = document.activeElement.value;
    console.log(focused);
}

function tcamValue() {
    let bill = document.getElementsByClassName("ci-bill-amount")[0];
    let tip = document.querySelectorAll(".ci-tg-input");
    let people = document.getElementsByClassName("ci-people-amount")[0];
    let c1 = 'hsl(172, 67%, 45%)';
    let c2 = 'hsl(183, 100%, 15%)';
    var selected;

    //console.log(tip);
    let manageTips = new ManageTips(tip, c1, c2);
    tip.forEach((item) => {
        console.log("manageTips:\n" + "\nthis: " + this+ "item: " + item);  // TODO: test _closure_ learning :|
        //item.addEventListener('click', manageTips);
        //tip.addEventListener('focus', clearTipBg);
        item.addEventListener('click', manageTips);
        item.addEventListener('focus', manageTips);
        item.addEventListener('focus', calcAmounts);
        item.addEventListener('input', manageTips);
        item.addEventListener('blur', manageTips);
    });

    bill.addEventListener('input', calcAmounts);
    document.getElementsByClassName("ci-tip-grid")[0].addEventListener('input', calcAmounts);
    //document.getElementsByClassName("ci-tip-grid")[0].addEventListener('focus', calcAmounts);
    people.addEventListener('input', calcAmounts);
}
tcamValue();