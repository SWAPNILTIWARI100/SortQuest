async function insertionSort() {
   disableSortingButtons();
   let Bars = document.querySelectorAll(".bar");
   const arraySize = Bars.length;

   // Update the resultMessage with the size of the array
   const resultMessage = document.getElementById('resultMessage');
   resultMessage.textContent = `Insertion Sort is called. The size of the array is ${arraySize}.`;

   // Display the warning message box (optional)
   const warningMessage = document.getElementById('warningMessage');
   warningMessage.style.display = 'block';

   let comparisons = 0;
   let swaps = 0;

   const start = performance.now();

   Bars[0].style.background = "linear-gradient(#087ee1, #05e8ba)"; // First element is sorted

   for (let i = 1; i < Bars.length; i++) {
       let j = i;
      comparisons++; 
       await timePLs();

       while (j > 0 && Number(Bars[j].style.height.slice(0, -2)) < Number(Bars[j - 1].style.height.slice(0, -2))) {
           Bars[j].style.background = "yellow"; // Active
           Bars[j-1].style.background = "yellow"; // Active

           comparisons++; // Increment comparison counter

           await swap(j, j - 1);
           swaps++; // Increment swap counter

           await timePLs();

           Bars[j-1].style.background = "linear-gradient(#087ee1, #05e8ba)"; // Sorted
           Bars[j].style.background = "linear-gradient(#087ee1, #05e8ba)"; // Sorted
           j--;
       }

       Bars[i].style.background = "linear-gradient(#087ee1, #05e8ba)"; // Sorted
   }

   enableSortingButtons();

   const end = performance.now();
   const timeTaken = end - start; // Time in milliseconds

   // Add data to graph
   addDataToGraph(arraySize, timeTaken, "Insertion Sort");

   // Check if Game Mode is on
   if (gameModeOn) {
       checkGameResult(comparisons, swaps);
   }
}
