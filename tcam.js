class ManageCalc {
    constructor(bill, tip, people, c1, c2, billClassName, tipClassName, tipCustomClassName, peopleClassName) {
        this.bill = bill;
        this.tip = tip;
        this.people = people;
        this.c1 = c1;
        this.c2 = c2;
        this.billClassName = billClassName;
        this.tipClassName = tipClassName;
        this.tipCustomClassName = tipCustomClassName;
        this.peopleClassName = peopleClassName;
    }
    
    handleEvent(event) {
        //let selectedClassName = event.target.className.split(" ");
        let checkSelectedClassName = (cn) => { 
            if(event.target.className.split(" ").indexOf(cn) != -1) return true;
            else return false;
        };

        if(checkSelectedClassName(this.billClassName)) {
            if(event.type === 'input') localStorage['bill'] = event.target.value;
        }
        else if(checkSelectedClassName(this.tipClassName)) {
            let etvTipNotEmpty = () => { 
                if(event.target.value != '') return true; 
                else return false;
            }            
            switch(event.type) { // TODO: check the event call
                case 'button':
                    event.target.parentNode.lastElementChild.style = '';
                    event.target.parentNode.lastElementChild.value = 'Custom';
                    //if(event.target.type === 'click' || event.type === 'blur') event.target.style.backgroundColor = this.c1;
                    //if(event.target.type === 'click') 
                    event.target.style.backgroundColor = this.c1; // TODO: check here, update handler because not-custom field of tips doesn't update style
                    localStorage['tip'] = event.target.value.slice(0,-1);
                    break;
                case 'text':
                    switch(event.target.type) { //TODO: 
                        case 'focus':
                            event.target.style.borderColor = this.c1;
                            if(etvTipNotEmpty() || !isNaN(event.target.value)) event.target.value = '';
                            break;
                        case 'input':
                            event.target.style.borderColor = this.c1;
                            if(isNaN(event.target.value)) event.target.value = event.target.value.slice(0,-1);
                            if(event.target.value < 0) event.target.value = 0;
                            else if(event.target.value > 100) event.target.value = 100;
                            localStorage['tip'] = event.target.value;
                            break;
                        case 'blur':
                            if(etvTipNotEmpty()) { 
                                event.target.value = event.target.value + '%';
                                event.target.style.color = this.c2;
                                event.target.style.backgroundColor = this.c1;
                            } else { 
                                event.target.value = 'Custom'; 
                                event.target.backgroundColor = '';
                            }
                            break;
                    }
                    break;    
            }
        }
        else if(checkSelectedClassName(this.peopleClassName)) {
            if(event.type === 'input') localStorage['people'] = event.target.value;
        }
    }
}

function tcamValue() {
    let bill = document.getElementsByClassName("ci-bill-input")[0];
    let tip = document.querySelectorAll(".ci-tg-input");
    let people = document.getElementsByClassName("ci-people-input")[0];
    let c1 = 'hsl(172, 67%, 45%)';
    let c2 = 'hsl(183, 100%, 15%)';
    let manageCalc = new ManageCalc(bill, tip, people, c1, c2, 'ci-bill-input', 'ci-tg-input', 'ci-people-input');

    bill.addEventListener('input', manageCalc);
    tip.forEach((item) => {
        item.addEventListener('click', manageCalc);
        item.addEventListener('click', manageCalc);
        item.addEventListener('focus', manageCalc);
        item.addEventListener('input', manageCalc);
        item.addEventListener('blur', manageCalc);
    });
    people.addEventListener('input', manageCalc);
}

tcamValue();


//TODO: trying new approach about tip event triggered