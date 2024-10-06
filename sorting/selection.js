async function selectionSort() {
   disableSortingButtons();
   let Bars = document.querySelectorAll(".bar");
   const arraySize = Bars.length;

   // Update the resultMessage with the size of the array
   const resultMessage = document.getElementById('resultMessage');
   resultMessage.textContent = `Selection Sort is called. The size of the array is ${arraySize}.`;

   // Display the warning message box
   const warningMessage = document.getElementById('warningMessage');
   warningMessage.style.display = 'block';

   let comparisons = 0;
   let swaps = 0;

   const start = performance.now(); 

   for (let i = 0; i < Bars.length - 1; i++) {
       let minimum = i;
       Bars[i].style.background = "yellow"; // Active bar

       for (let j = i + 1; j < Bars.length; j++) {
           Bars[j].style.background = "yellow"; // Active bar

           const minVal = Number(Bars[minimum].style.height.slice(0, -2));
           const val = Number(Bars[j].style.height.slice(0, -2));

           comparisons++; // Increment comparison counter

           if (val < minVal) {
               Bars[minimum].style.background = "linear-gradient(#ee0979, #ff6a00)"; // Unsorted
               minimum = j;
               Bars[minimum].style.background = "yellow"; // New minimum
           }

           await timePLs();

           if (j !== minimum) {
               Bars[j].style.background = "linear-gradient(#ee0979, #ff6a00)"; // Unsorted
           }
       }

       if (i !== minimum) {
           await swap(i, minimum);
           swaps++; // Increment swap counter
           Bars = document.querySelectorAll(".bar"); // Refresh Bars
       }

       Bars[i].style.background = "linear-gradient(#087ee1, #05e8ba)"; // Sorted
   }

   Bars[Bars.length - 1].style.background = "linear-gradient(#087ee1, #05e8ba)"; // Sorted

   const end = performance.now();
   const timeTaken = end - start; // Time in milliseconds

   // Add data to graph
   addDataToGraph(arraySize, timeTaken, "Selection Sort");

   // Check if Game Mode is on
   if (gameModeOn) {
       checkGameResult(comparisons, swaps);
   }

   enableSortingButtons();
}

// Swap function (reused from your earlier code)
async function swap(index1, index2) {
   let Bars = document.querySelectorAll(".bar");

   let tempHeight = Bars[index1].style.height;
   Bars[index1].style.height = Bars[index2].style.height;
   Bars[index2].style.height = tempHeight;

   await timePLs();
}
