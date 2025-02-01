document.addEventListener("DOMContentLoaded", function() {
    const salaryInput = document.getElementById("salaryInput");
    const stateInput = document.getElementById("stateInput");
    const calculateBtn = document.getElementById("calculateBtn");

    const taxSlabsOld = [
        { limit: 250000, rate: 0 },
        { limit: 500000, rate: 5 },
        { limit: 1000000, rate: 20 },
        { limit: Infinity, rate: 30 }
    ];

    const taxSlabsNew = [
        { limit: 600000, rate: 0 },
        { limit: 900000, rate: 10 },
        { limit: 1200000, rate: 15 },
        { limit: Infinity, rate: 20 }
    ];

    const professionalTax = {
        "Maharashtra": 2500,
        "Karnataka": 2400,
        "West Bengal": 2500,
        "Tamil Nadu": 2500,
        "Delhi": 0,
        "Other": 2000
    };

    function calculateTax(salary, slabs) {
        let tax = 0;
        let previousLimit = 0;

        for (let slab of slabs) {
            if (salary > previousLimit) {
                let taxableIncome = Math.min(salary, slab.limit) - previousLimit;
                tax += (taxableIncome * slab.rate) / 100;
                previousLimit = slab.limit;
            } else {
                break;
            }
        }

        return Math.round(tax);
    }

    calculateBtn.addEventListener("click", function() {
        let salary = parseFloat(salaryInput.value) || 0;
        let state = stateInput.value;

        let taxOld = calculateTax(salary, taxSlabsOld);
        let taxNew = calculateTax(salary, taxSlabsNew);

        let pfOld = Math.round(salary * 0.12);
        let pfNew = Math.round(salary * 0.10);

        let ptOld = professionalTax[state] || professionalTax["Other"];
        let ptNew = professionalTax[state] || professionalTax["Other"];

        let monthlyEarningsOld = Math.round((salary - taxOld - pfOld - ptOld) / 12);
        let monthlyEarningsNew = Math.round((salary - taxNew - pfNew - ptNew) / 12);

        document.getElementById("oldTax").innerText = taxOld;
        document.getElementById("newTax").innerText = taxNew;

        document.getElementById("pfOld").innerText = pfOld;
        document.getElementById("pfNew").innerText = pfNew;

        document.getElementById("ptOld").innerText = ptOld;
        document.getElementById("ptNew").innerText = ptNew;

        document.getElementById("monthlyEarningsOld").innerText = monthlyEarningsOld;
        document.getElementById("monthlyEarningsNew").innerText = monthlyEarningsNew;
    });

    // Populate states
    const states = Object.keys(professionalTax);
    states.forEach(state => {
        let option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateInput.appendChild(option);
    });

   
    
});
