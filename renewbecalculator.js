

const stepCount = 10;

const steps = Array.from({ length: stepCount }, (_, index) => document.getElementById(`step${index + 1}`));
const backs = Array.from({ length: stepCount - 1 }, (_, index) => document.getElementById(`back${index + 2}`));
const nextButtons = Array.from({ length: stepCount - 1 }, (_, index) => document.getElementById(`next${index + 1}`));

// Define a named function for the next button click event
function handleNextClick(stepIndex) {
  steps[stepIndex].classList.add('more_left');
  steps[stepIndex + 1].classList.remove('more_right');
}

// Add click event listeners for next buttons
for (let stepIndex = 0; stepIndex < stepCount - 1; stepIndex++) {
  nextButtons[stepIndex].addEventListener('click', () => {
    if (!rentRadio.checked && !otherSlopeRadio.checked && !caneRadio.checked) {
      handleNextClick(stepIndex);
    }
  });

  backs[stepIndex].addEventListener('click', () => {
    steps[stepIndex].classList.remove('more_left');
    steps[stepIndex + 1].classList.add('more_right');
  });
}

// Step1 warning text
const propertyRadioGroup = document.getElementsByName('property');
const warningTextStep1 = document.getElementById('w_step1');

const rentRadio = document.getElementById('rent');
const ownerRadio = document.getElementById('owner-2');

propertyRadioGroup.forEach(radio => {
  radio.addEventListener("change", () => {
    if (rentRadio.checked) {
      warningTextStep1.style.display = "block";
      nextButtons[0].classList.add("disabled");
      nextButtons[0].removeEventListener('click', handleNextClick);
    } else {
      warningTextStep1.style.display = "none";
      nextButtons[0].classList.remove("disabled");
      nextButtons[0].addEventListener('click', () => {
        if (!rentRadio.checked) {
          handleNextClick(0);
        }
      });
    }
  });
});

// Step2 warning text
const slopeRadioGroup = document.getElementsByName('slope');
const flatRoofText = document.getElementById('flat_roof-text');
const otherRoofText = document.getElementById('other_roof-text');

const flatRadio = document.getElementById('flat');
const weakSlopeRadio = document.getElementById('weak_slope');
const strongSlopeRadio = document.getElementById('strong_slope');
const otherSlopeRadio = document.getElementById('other_slopes');

slopeRadioGroup.forEach(radio => {
  radio.addEventListener("change", () => {
    if (otherSlopeRadio.checked) {
      otherRoofText.style.display = "block";
      flatRoofText.style.display = "none";
      nextButtons[1].classList.add("disabled");
      nextButtons[1].removeEventListener('click', handleNextClick);
    } else if (flatRadio.checked) {
      flatRoofText.style.display = "block";
      otherRoofText.style.display = "none";
    } else {
      otherRoofText.style.display = "none";
      flatRoofText.style.display = "none";
      nextButtons[1].classList.remove("disabled");
      nextButtons[1].addEventListener('click', () => {
        if (!otherSlopeRadio.checked) {
          handleNextClick(1);
        }
      });
    }
  });
});

const materiialRadioGroup = document.getElementsByName('material');
const roofMaterialText = document.getElementById('roof_material-text');

const caneRadio = document.getElementById('cane');

materiialRadioGroup.forEach(radio => {
  radio.addEventListener("change", () => {
    if (caneRadio.checked) {
      roofMaterialText.style.display = "block";
      nextButtons[2].classList.add("disabled");
      nextButtons[2].removeEventListener('click', handleNextClick);
    } else {
      roofMaterialText.style.display = "none";
      nextButtons[2].classList.remove("disabled");
      nextButtons[2].addEventListener('click', () => {
        if (!caneRadio.checked) {
          handleNextClick(2);
        }
      });
    }
  });
});


const floorCountRadioGroup = document.getElementsByName('floorcount');
const floorCountText = document.getElementById('prop_count-text');

const count2MoreRadio = document.getElementById('count2more');

floorCountRadioGroup.forEach(radio => {
  radio.addEventListener("change", () => {
    if (count2MoreRadio.checked) {
      floorCountText.style.display = "block";
      
      
    } else {
      floorCountText.style.display = "none";
    }
  });
});

const usageCheckbox = document.getElementById('usage_checkbox');
const noOfUserCon = document.getElementById('noofuers_con');

usageCheckbox.addEventListener('change', function() {
  if (usageCheckbox.checked) {
    noOfUserCon.style.display = 'block';
  } else {
    noOfUserCon.style.display = 'none';
  }
});

// Orientation
let selectedOrientation = "";
let capacity = 0; // Initialize the capacity variable

const orientationRadioButtons = document.getElementsByName("orientation");
for (let i = 0; i < orientationRadioButtons.length; i++) {
    orientationRadioButtons[i].addEventListener("change", function() {
        selectedOrientation = orientationRadioButtons[i].value;
        capacity = getCapacityFromOrientation(selectedOrientation);
        console.log("Selected Orientation: " + selectedOrientation);
        console.log("Capacity: " + capacity);
    });
}
function getCapacityFromOrientation(orientation) {
    switch (orientation) {
        case "north":
            return 0.6;
        case "south":
            return 0.95;
        case "east":
            return 0.8;
        case "west":
            return 0.8;
        default:
            return 0; 
    }
}


// Installation Additional cost
let selectedFloorCount = "";
let arialPlatformCost = 0; // Initialize the arialPlatformCost variable

const floorCountRadioButtons = document.getElementsByName("floorcount");
for (let i = 0; i < floorCountRadioButtons.length; i++) {
    floorCountRadioButtons[i].addEventListener("change", function() {
        selectedFloorCount = floorCountRadioButtons[i].value;
        arialPlatformCost = getarielPlatformCostfromFloorCount(selectedFloorCount);
        console.log("Selected Floor Count: " + selectedFloorCount);
        console.log("Aerial Plaform Cost: " + arialPlatformCost);
    });
}
function getarielPlatformCostfromFloorCount(floorcount) {
    switch (floorcount) {
        case "count1":
            return 0;
        case "count2":
            return 0;
        case "count2more":
            return 500;
        default:
            return 0; 
    }
}

// Roof type selection
let selectedRoofType= "";

const roofTypeRadioButtons = document.getElementsByName("slope");
for (let i = 0; i < roofTypeRadioButtons.length; i++) {
    roofTypeRadioButtons[i].addEventListener("change", function() {
        selectedRoofType = roofTypeRadioButtons[i].value;
        
        console.log("Selected Floor Count: " + selectedRoofType);
        
    });
}

// Calculation of pannelcost using roof type and according to roof shade condition
function truePaannelCost(){
    // Roof type selection
   let selectedRoofType= "";
   let selectedshade = "";
   const roofTypeRadioButtons = document.getElementsByName("slope");
   const roofShadeRadioButtons = document.getElementsByName("shade");
   
   for (let i = 0; i < roofTypeRadioButtons.length; i++) {
        roofTypeRadioButtons[i].addEventListener("change", function() {
        selectedRoofType = roofTypeRadioButtons[i].value;
        
        console.log("Selected Floor Count: " + selectedRoofType);
        
    });
    }
    
      for (let i = 0; i < roofTypeRadioButtons.length; i++) {
        roofTypeRadioButtons[i].addEventListener("change", function() {
        selectedRoofType = roofTypeRadioButtons[i].value;
        
        console.log("Selected Floor Count: " + selectedRoofType);
        
    });
    }
}

const slider1 = document.getElementById('range1');
const slider1Ouput = document.getElementById('value1');

slider1.addEventListener('input', function(e) {
  slider1Ouput.textContent = e.target.value;
});

function calculateNoOfPanels() {
  const yearlyUsage = parseFloat(slider1.value); // Convert the input value to a number
  const capacity = getCapacityFromOrientation(selectedOrientation);
  const arialPlatformCost = getarielPlatformCostfromFloorCount(selectedFloorCount);

  
    const noOfPanels = yearlyUsage / (410 * capacity);
    const finalNoOfPannels = Math.round(noOfPanels);
    
    //Yearly electrycity price
    const yearlyElectricityCost = yearlyUsage * 0.31; 
    
    
    // Calculate Panel Cost
    const pannelCost = 4500;
    
    // Pannel installation price
    const installationCost = pannelCost + arialPlatformCost;
    
    //Payback period
    const payBackPeriod = installationCost/ yearlyElectricityCost;
    const payBackPeriodFinal = Math.round(payBackPeriod);
    const paybackWrapper = document.getElementById('payback_wrapper');
    paybackWrapper.textContent = payBackPeriodFinal;
    
    // Savings in 25 Years
    const savingin25Years = (25 - payBackPeriod)*yearlyElectricityCost;
    const savingin25YearsFinal = Math.round(savingin25Years);
    const savingIn25Years = document.getElementById('25year_saving');
     savingIn25Years.textContent = savingin25YearsFinal.toLocaleString();
     
    const savings = [];

    for (let i = 25; i >= 1; i--) {
     const savingsInYear = (i - payBackPeriod) * yearlyElectricityCost;
     const savingsInYearFinal = Math.round(savingsInYear);
        savings.push({ year: i, savings: savingsInYearFinal });
     }

    const ctx = document.getElementById('savingsChart');
    const config = {
      type: 'line',
      data: data,
      options: {
      responsive: true,
      plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart'
       }
      }
     },
    };

    console.log(savings);
   

    
    
    console.log("Number of Panels: " + finalNoOfPannels + "Yearly Electricity Cost: " + yearlyElectricityCost + "Pannel Installation Price: " + installationCost + " Payback Period:" + payBackPeriod+"Years" + " Savings in25 Yeays: " + savingin25YearsFinal);
  
    
  
}

const lasSubmit =  document.getElementById('next9');
lasSubmit.addEventListener("click", calculateNoOfPanels);


