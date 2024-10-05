// Quick Sort

async function quickSorti(low, high) {
   disableSortingButtons();
   const s = performance.now();
   let Bars = document.querySelectorAll(".bar");
   const arraySize = Bars.length;

   // Update the resultMessage with the size of the array
   const resultMessage = document.getElementById('resultMessage');
   resultMessage.textContent = `Quick Sort is called. The size of the array is ${arraySize}.`;

   // Display the warning message box
   const warningMessage = document.getElementById('warningMessage');
   warningMessage.style.display = 'block';

   // Initialize counters in an object
   let counters = {
       comparisons: 0,
       swaps: 0
   };

   await quickSort(low, high, counters);
   
   enableSortingButtons();
   const end = performance.now();
   const timeTaken = end - s; // Time in milliseconds
   
   // Add data to graph
   addDataToGraph(arraySize, timeTaken, "Quick Sort");

   // Check if Game Mode is on
   if (gameModeOn) {
       checkGameResult(counters.comparisons, counters.swaps);
   }
}

async function quickSort(low, high, counters) {
   if (low < high) {
       let pi = await partition(low, high, counters);
       await quickSort(low, pi - 1, counters); 
       await quickSort(pi + 1, high, counters);
   }
   if (low === high) {
       let Bars = document.querySelectorAll(".bar");
       Bars[low].style.background = "linear-gradient(#087ee1, #05e8ba)"; // sorted
   }
}

async function partition(low, high, counters) {
   let Bars = document.querySelectorAll(".bar");
   let pivot = Number(Bars[high].style.height.slice(0, -2));

   Bars[high].style.background = "linear-gradient(#6c33a3, #8241b8)"; // pivot

   let i = low;

   for (let j = low; j < high; j++) {
       Bars[i].style.background = "yellow"; // active
       Bars[j].style.background = "yellow"; // active
       await timePLs();

       counters.comparisons++; // Increment comparisons count

       if (Number(Bars[j].style.height.slice(0, -2)) < pivot) {
           await swap(i, j);
           await timePLs();
           Bars[i].style.background = "linear-gradient(#ee0979, #ff6a00)"; // unsorted
           i++;
           counters.swaps++; // Increment swaps count
           Bars[i].style.background = "yellow"; // active
       }

       if (i !== j) {
           Bars[j].style.background = "linear-gradient(#ee0979, #ff6a00)"; // unsorted
       }
   }

   await swap(i, high);
   Bars[i].style.background = "linear-gradient(#087ee1, #05e8ba)"; // sorted
   Bars[high].style.background = "linear-gradient(#ee0979, #ff6a00)"; // unsorted

   if (high === i) {
       Bars[high].style.background = "linear-gradient(#087ee1, #05e8ba)"; // sorted
   }

   await timePLs();

   return i;
}
