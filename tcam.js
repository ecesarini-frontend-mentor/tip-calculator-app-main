class ManageTips {
    constructor(tip, c1, c2) {
        this.tip = tip;
        this.c1 = c1;
        this.c2 = c2;
    }
    handleEvent(event) {
        let etvNotEmpty = () => { 
            if(event.target.value != '') return true; 
            else return false;
        }
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


/*function calculate(bill, tip, people) {
    console.log(bill.value, this);
    var billC = bill;
    this.addEventListener('click', (function(b) {  
        return function() { 
            console.log(b.value); 
        }
    })(billC));
}*/


function tcamValue() {
    let bill = document.getElementsByClassName("ci-bill-amount")[0];
    let tip = document.querySelectorAll(".ci-tg-input");
    let people = document.getElementsByClassName("ci-people-amount")[0];
    let c1 = 'hsl(172, 67%, 45%)';
    let c2 = 'hsl(183, 100%, 15%)';
    //let manageTips = new ManageTips(tip, c1, c2);
    
    window.addEventListener('input', (function(b) { 
        return function() { 
                console.log(b.value); 
        }})(bill)
    );    


    tip.forEach((item) => {
        //console.log("manageTips:\n" + "\nthis: " + this + "item: " + item);  // TODO: test _closure_ learning :|
        item.addEventListener('click', manageTips);
        item.addEventListener('focus', manageTips);
        //item.addEventListener('focus', calcAmounts);
        //item.addEventListener('input', manageTips);
        item.addEventListener('blur', manageTips);
    });
    
    //calculate(bill, tip, people);
}
tcamValue();