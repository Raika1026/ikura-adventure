export let courageGauge = 0;
const courageGaugeMax = 3;

export function addCourage(){
    if(courageGauge >= courageGaugeMax){
        return;
    }
    courageGauge ++;
}

export function consumeCourage(){
    courageGauge = 0;
}

export function resetCourage(){
    courageGauge = 0;
}