let barContainer = document.getElementById("bars");
let gameModeOn = false;

var delay = 300;
let bars = [];
let marginSize = 0.1;
let arraySize = 40;
let width = 100 / arraySize - (2 * marginSize);

document.getElementById("newArray").addEventListener("click", newArray);

// Generating a new array

function newArray() {
   barContainer.innerHTML = "";
   for (let i = 0; i < arraySize; i++) {
      let val = Math.floor(Math.random() * 50) + 4;

      bars[i] = document.createElement("div");
      bars[i].classList.add("bar");
      bars[i].style.height = (8 * val) + "px";
      bars[i].style.width = width + "%";

      barContainer.appendChild(bars[i]);
   }
}

window.onload = newArray();

// Getting size input from slider range

function sizeInput(x) {
   arraySize = x;
   width = 100 / arraySize - (2 * marginSize);
   newArray();
}

// Getting size input from slider range

function speedInput(x) {
   delay = 800 - x;
}

// Adding event listner to the buttons

let buttons = document.getElementsByClassName("btn");

for (let i = 1; i < buttons.length; i++) {
   buttons[i].addEventListener("click", (button) => {
      switch (button.target.innerHTML) {
         case "Bubble Sort": bubbleSort();
            break;
         case "Selection Sort": selectionSort();
            break;
         case "Insertion Sort": insertionSort();
            break;
         case "Quick Sort": quickSorti(0, document.querySelectorAll(".bar").length - 1);
            break;
         case "Merge Sort": mergeSort(0, document.querySelectorAll(".bar").length - 1);
            break;
         case "heap sort":  heapSort(document.querySelectorAll(".bar").length - 1);
            break;
         default:
            console.log("default");
            break;
      }
   });
}

// Swap function

function swap(i, j) {
   return new Promise(resolve => {
      setTimeout(() => {
         let Bars = document.querySelectorAll(".bar");

         const transform1 = Bars[i].style.height;
         const transform2 = Bars[j].style.height;

         Bars[i].style.height = transform2;
         Bars[j].style.height = transform1;
         resolve();
      }, delay);
   });
}


function disableSortingButtons() {
   document.getElementById("size").disabled = true;
   document.getElementById("speed").disabled = true;
   document.getElementById("stop1").disabled = true;
   document.getElementById("stop2").disabled = true;
   document.getElementById("stop3").disabled = true;
   document.getElementById("stop4").disabled = true;
   document.getElementById("stop5").disabled = true;
   document.getElementById("newArray").disabled = true;
 }
 function enableSortingButtons() {
   document.getElementById("size").disabled = false;
   document.getElementById("speed").disabled = false;
   document.getElementById("stop1").disabled = false;
   document.getElementById("stop2").disabled = false;
   document.getElementById("stop3").disabled = false;
   document.getElementById("stop4").disabled = false;
   document.getElementById("stop5").disabled = false;
   document.getElementById("newArray").disabled = false;
 }


// Delay function

async function timePLs() {
   await new Promise(resolve =>
      setTimeout(() => {
         resolve();
      }, delay)
   );
}


// Add event listener to handle form submission
document.getElementById('gameModeForm').addEventListener('submit', function(event) {
   event.preventDefault(); 
   
   // Get the guesses from the user
   const comparisonGuess = document.getElementById('comparisonGuess').value;
   const swapGuess = document.getElementById('swapGuess').value;

   // Validate that the user has entered valid numbers
   if (comparisonGuess > -1 && swapGuess > -1) {
       // Store the guesses temporarily for checking after the sorting is done
       const resultMessage = document.getElementById('resultMessage');
       resultMessage.textContent = `You selected ${comparisonGuess} comparisons and ${swapGuess} swaps.`;

       // Display the warning message block
       const warningMessage = document.getElementById('warningMessage');
       warningMessage.style.display = 'block';

       // Store the guesses temporarily for checking after the sorting is done
       localStorage.setItem('comparisonGuess', comparisonGuess);
       localStorage.setItem('swapGuess', swapGuess);

       // Reset the form inputs to 0 after submit
       document.getElementById('comparisonGuess').value = 0;
       document.getElementById('swapGuess').value = 0;
   

       
   } else {
       // Show an error message if inputs are invalid
       const resultMessage = document.getElementById('resultMessage');
       resultMessage.textContent = `Please enter valid guesses for comparisons and swaps.`;
       const warningMessage = document.getElementById('warningMessage');
       warningMessage.style.display = 'block';
   }
});

// Set initial values when the page loads
window.onload = function() {
   document.getElementById('comparisonGuess').value = 0;
   document.getElementById('swapGuess').value = 0;
   
};



function toggleGameMode() {
    gameModeOn = !gameModeOn;
    const gameModeBtn = document.getElementById('gameModeBtn');
    const gameModeSection = document.getElementById('gameModeSection');

    if (gameModeOn) {
       
        gameModeBtn.textContent = "Game Mode: On";
        gameModeSection.style.display = 'block';
    } else {
      gameModeBtn.style.backgroundColor = 'red';
        gameModeBtn.textContent = "Game Mode: Off";
        gameModeSection.style.display = 'none';
    }
}

function checkGameResult(comparisons, swaps) {

   const comparisonGuess = localStorage.getItem('comparisonGuess');
    const swapGuess = localStorage.getItem('swapGuess');

    const resultMessage = document.getElementById('resultMessage');
  
   const warningMessage = document.getElementById('warningMessage');

   if (comparisonGuess == comparisons && swapGuess == swaps) {
       resultMessage.textContent = `You are correct! There were ${comparisons} comparisons and ${swaps} swaps.`;
   } else {
       resultMessage.textContent = `You are wrong! The correct answer is ${comparisons} comparisons and ${swaps} swaps.`;
      
   }
   warningMessage.style.display = 'block'; // Display the message
}
