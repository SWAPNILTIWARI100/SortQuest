async function bubbleSort() {
   disableSortingButtons();
   let Bars = document.querySelectorAll(".bar");
   const arraySize = Bars.length; 

   // Update the resultMessage with the size of the array
   const resultMessage = document.getElementById('resultMessage');
   resultMessage.textContent = `Bubble Sort is called. The size of the array is ${arraySize}.`;

   // Display the warning message box (optional)
   const warningMessage = document.getElementById('warningMessage');
   warningMessage.style.display = 'block';
  

   let comparisons = 0;
   let swaps = 0;

   const start = performance.now();


   for (let i = 0; i < Bars.length - 1; i++) {
       for (let j = 0; j < Bars.length - i - 1; j++) {
           Bars[j].style.background = "yellow"; // active
           Bars[j + 1].style.background = "yellow"; // active

           await timePLs();

           const val1 = Number(Bars[j].style.height.slice(0, -2));
           const val2 = Number(Bars[j + 1].style.height.slice(0, -2));

           comparisons++; // Increment comparison counter

           if (val1 > val2) {
               await swap(j, j + 1);
               swaps++; // Increment swap counter
               Bars = document.querySelectorAll(".bar");
           }

           Bars[j].style.background = "linear-gradient(#ee0979, #ff6a00)"; // unsorted
           Bars[j + 1].style.background = "linear-gradient(#ee0979, #ff6a00)"; // unsorted
       }

       Bars[Bars.length - i - 1].style.background = "linear-gradient(#087ee1, #05e8ba)"; // sorted
   }
   Bars[0].style.background = "linear-gradient(#087ee1, #05e8ba)"; // sorted

   const end = performance.now();
   const timeTaken = end - start; // Time in milliseconds

   // Add data to graph
   addDataToGraph(arraySize, timeTaken, "Bubble Sort");

   // Check if Game Mode is on
   if (gameModeOn) {
     
       checkGameResult(comparisons, swaps);
   }

   enableSortingButtons();
}

// Swap function (in case you need it)
async function swap(index1, index2) {
   let Bars = document.querySelectorAll(".bar");

   let tempHeight = Bars[index1].style.height;
   Bars[index1].style.height = Bars[index2].style.height;
   Bars[index2].style.height = tempHeight;

   await timePLs();
}
