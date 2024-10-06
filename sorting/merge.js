async function mergeSort(left, right) {
   disableSortingButtons();
   const Bars = document.querySelectorAll(".bar");
   const arraySize = Bars.length;

   // Update the resultMessage with the size of the array
   const resultMessage = document.getElementById('resultMessage');
   resultMessage.textContent = `Merge Sort is called. The size of the array is ${arraySize}.`;

   // Display the warning message box (optional)
   const warningMessage = document.getElementById('warningMessage');
   warningMessage.style.display = 'block';

   // Initialize counters in an object
   let counters = {
       comparisons: 0,
       swaps: 0
   };

   const start = performance.now();

   await mergeSorti(left, right, counters);

   const end = performance.now();
   const timeTaken = end - start; // Time in milliseconds

   // Add data to graph
   addDataToGraph(arraySize, timeTaken, "Merge Sort");

   // Check if Game Mode is on
   if (gameModeOn) {
       checkGameResult(counters.comparisons, counters.swaps);
   }

   enableSortingButtons();
}

async function mergeSorti(left, right, counters) {
   if (left < right) {
       let mid = Math.floor(left + (right - left) / 2);

       await mergeSorti(left, mid, counters);
       await mergeSorti(mid + 1, right, counters);
       await merge(left, right, counters);
   }
}

async function merge(left, right, counters) {
   let Bars = document.querySelectorAll(".bar");
   let i, j, k = left;
   let mid = Math.floor(left + (right - left) / 2);
   let n1 = mid - left + 1;
   let n2 = right - mid;
   let L = new Array();
   let R = new Array();

   for (i = 0; i < n1; i++) {
       await timePLs();
       L[i] = Number(Bars[left + i].style.height.slice(0, -2));
       Bars[left + i].style.background = "yellow"; // active
   }
   for (j = 0; j < n2; j++) {
       await timePLs();
       R[j] = Number(Bars[mid + 1 + j].style.height.slice(0, -2));
       Bars[mid + 1 + j].style.background = "yellow"; // active
   }

   i = 0;
   j = 0;

   while (i < n1 && j < n2) {
       await timePLs();
       counters.comparisons++; // Increment comparison counter

       if (L[i] <= R[j]) {
           Bars[k].style.height = `${L[i]}px`;
           i++;
       } else {
           Bars[k].style.height = `${R[j]}px`;
           j++;
           counters.swaps++; // Increment swap counter (element moved)
       }
       Bars[k].style.background = "linear-gradient(#087ee1, #05e8ba)"; // sorted
       k++;
   }
   while (i < n1) {
       await timePLs();
       Bars[k].style.height = `${L[i]}px`;
       Bars[k].style.background = "linear-gradient(#087ee1, #05e8ba)"; // sorted
       i++;
       k++;
   }
   while (j < n2) {
       await timePLs();
       Bars[k].style.height = `${R[j]}px`;
       Bars[k].style.background = "linear-gradient(#087ee1, #05e8ba)"; // sorted
       j++;
       k++;
   }
}
 