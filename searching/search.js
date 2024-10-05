let barContainer = document.getElementById("bars");

var delay = 100;
let bars = [];
let marginSize = 0.1;
let arraySize = 40;
let width = 100 / arraySize - (2 * marginSize);
let selectedValue = null; // Store the selected bar value
let warningMessage = document.getElementById("warningMessage");

document.getElementById("newArray").addEventListener("click", newArray);

// Generating a new array
function newArray() {
    barContainer.innerHTML = "";
    const uniqueValues = new Set(); // Create a Set to store unique values

    // Generate unique values
    while (uniqueValues.size < arraySize) {
        let val = Math.floor(Math.random() * 80) + 4; // Generate value between 4 and 53
        uniqueValues.add(val); // Add value to the set (duplicates will be ignored)
    }

    // Convert the Set to an array
    const valuesArray = Array.from(uniqueValues);


    for (let i = 0; i < arraySize; i++) {
        let val = Math.floor(Math.random() * 80) + 4;

     
      bars[i] = document.createElement("div");
      bars[i].classList.add("bar");
      bars[i].style.height = (5 * valuesArray[i]) + "px";
      bars[i].style.width = width + "%";
      barContainer.appendChild(bars[i]);
      bars[i].dataset.value=valuesArray[i];
    
    
    }
}


window.onload = newArray();

// Getting size input from slider range
function sizeInput(x) {
    arraySize = x;
    width = 100 / arraySize - (2 * marginSize);
    newArray();
}

// Getting speed input from slider range
function speedInput(x) {
    delay = 800 - x;
    // Disable buttons when changing speed
   
}

// Adding event listener to the buttons
document.getElementById("linearSearch").addEventListener("click", async function () {
    let bars = document.querySelectorAll(".bar");
    for (let bar of bars) {
        bar.style.background = "";
    }

    await getSelectedValueFromUser();
    if (selectedValue === null) {
        warningMessage.innerText = "Please select a bar to search.";
        return;
    }
   // disableButtons();
    await linearSearch();
   // enableButtons();
});

document.getElementById("binarySearch").addEventListener("click", async function () {
    // First, check if a value is selected
    let bars = document.querySelectorAll(".bar");
    for (let bar of bars) {
        bar.style.background = "";
    }
   // disableButtons();
    await mergeSort(0, arraySize - 1); // Perform merge sort first
    
    await getSelectedValueFromUser();

    if (selectedValue === null) {
        warningMessage.innerText = "Please select a bar to search.";
        return;
    }
    
   
   
    await binarySearch(); // Then perform binary search
   // enableButtons();
});

// Function to get the selected value from a clicked bar
async function getSelectedValueFromUser() {
    return new Promise((resolve) => {
        selectedValue=0;
        warningMessage.innerText = "Please click on a bar to select a value."; // Prompt the user to click a bar
        const bars = document.querySelectorAll(".bar");
        
        // Set up a click event on all bars
        bars.forEach(bar => {
            bar.addEventListener("click", function onClick() {
                // Get value from the clicked bar
                selectedValue = parseInt(bar.dataset.value); // Update the selected value
                warningMessage.innerText = `Selected Value: ${selectedValue}`; // Show selected value
                
                // Remove event listeners to prevent further clicks
                bars.forEach(b => b.removeEventListener("click", onClick));
                
                resolve(); // Resolve the promise to continue the binary search
            }, { once: true }); // Make sure the event fires only once
        });
    });
}

// Disable and enable buttons
// function disableButtons() {
//     let buttons = document.getElementsByClassName("btn");
//     for (let button of buttons) {
//         button.disabled = true;
//     }
//     document.getElementById("newArray").disabled = true;
//     document.getElementById("speed").disabled = true; // Disable speed slider
//     document.getElementById("size").disabled = true;
// }

// function enableButtons() {
//     let buttons = document.getElementsByClassName("btn");
//     for (let button of buttons) {
//         button.disabled = false;
//     }
//     document.getElementById("newArray").disabled = false;
//     document.getElementById("speed").disabled = false; // Enable speed slider
//     document.getElementById("size").disabled =false;
// }

// Delay function
async function timePLs() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, delay);
    });
}

// Linear Search Implementation
async function linearSearch() {
    let found = false; // Flag to check if value is found
    let bars = document.querySelectorAll(".bar");

    for (let i = 0; i < bars.length; i++) {
        bars[i].style.background = "yellow"; // Mark the current bar
       
        await timePLs(); // Delay for visualization

        // Check if the current bar value matches the selected value
        if (parseInt(bars[i].dataset.value) === selectedValue) {
            found = true;
            bars[i].style.backgroundColor = "green"; // Highlight found bar
            warningMessage.innerText = `Value ${selectedValue} found!`; // Show found message
            break;
        } else {
            bars[i].style.backgroundColor = "red"; // Mark as not found
        }
    }

    // Display the result
    if (!found) {
        warningMessage.innerText = `Value ${selectedValue} not found.`; // Show not found message
    }
    
    // Reset bar colors after the search
   
}

// Binary Search Implementation
async function binarySearch() {
    let bars = document.querySelectorAll(".bar");
    let left = 0;
    let right = bars.length - 1;
    let found = false; // Flag to check if value is found

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        bars[mid].style.background = "yellow"; // Mark the current mid bar

        await timePLs(); // Delay for visualization

        // Check if the mid bar value matches the selected value
        if (parseInt(bars[mid].dataset.value) === selectedValue) {
            found = true;
            bars[mid].style.backgroundColor = "green"; // Highlight found bar
            warningMessage.innerText = `Value ${selectedValue} found!`; // Show found message
            break;
        } else if (parseInt(bars[mid].dataset.value) < selectedValue) {
            bars[mid].style.backgroundColor = "red"; // Mark as not found
            left = mid + 1; // Move to the right half
        } else {
            bars[mid].style.backgroundColor = "red"; // Mark as not found
            right = mid - 1; // Move to the left half
        }
    }

    // Display the result
    if (!found) {
        warningMessage.innerText = `Value ${selectedValue} not found.`; // Show not found message
    }

    // Reset bar colors after the search
   
}

// Merge Sort Implementation
async function mergeSort(start, end) {
    if (start < end) {
        let mid = Math.floor((start + end) / 2);

        // Recursively sort the left and right halves
        await mergeSort(start, mid);
        await mergeSort(mid + 1, end);

        // Merge the sorted halves
        await merge(start, mid, end);
    }
}

async function merge(start, mid, end) {
    let left = start;
    let right = mid + 1;
    let temp = [];

    // Merge the arrays
    while (left <= mid && right <= end) {
        if (parseInt(bars[left].dataset.value) <= parseInt(bars[right].dataset.value)) {
            temp.push(bars[left].dataset.value);
            left++;
        } else {
            temp.push(bars[right].dataset.value);
            right++;
        }
    }

    while (left <= mid) {
        temp.push(bars[left].dataset.value);
        left++;
    }

    while (right <= end) {
        temp.push(bars[right].dataset.value);
        right++;
    }

    // Place the sorted values back into the bars
    for (let i = start; i <= end; i++) {
        bars[i].dataset.value = temp[i - start];
        bars[i].style.height = (5 * temp[i - start]) + "px"; // Update bar height

        // Color coding during merging
        if (i < mid + 1) {
            bars[i].style.backgroundColor = "lightgreen"; // Highlight left half
        } else {
            bars[i].style.backgroundColor = "lightblue"; // Highlight right half
        }

        
    }

    // Reset colors after merging
    
}
