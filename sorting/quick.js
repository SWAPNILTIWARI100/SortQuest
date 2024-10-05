// Quick Sort

async function quickSort(low, high) {
  
     disableSortingButtons();
     const s = performance.now();
     
     if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1); 
        await quickSort(pi + 1, high);
     }
     if (low == high){
        let Bars = document.querySelectorAll(".bar");
        Bars[low].style.background = "linear-gradient(#087ee1, #05e8ba)"; // sorted
     }
     enableSortingButtons();
     const end = performance.now();
     const timeTaken = end - s; // Time in milliseconds
     
     // Add data to graph
     addDataToGraph(arraySize, timeTaken,"Quick Sort");
  }
  
  
  async function partition(low, high) {
     let Bars = document.querySelectorAll(".bar");
     let pivot = Number(Bars[high].style.height.slice(0, -2));
  
     Bars[high].style.background = "linear-gradient(#6c33a3, #8241b8)"; //  pivot
  
     let i = low;
  
     for (let j = low; j < high; j++) {
  
        Bars[i].style.background = "yellow"; // active
        Bars[j].style.background = "yellow"; // active
        await timePLs();
  
        if (Number(Bars[j].style.height.slice(0, -2)) < pivot) {
           await swap(i, j);
           await timePLs();
           Bars[i].style.background = "linear-gradient(#ee0979, #ff6a00)"; // unsorted
           i++;
           Bars[i].style.background = "yellow"; // active
        }
  
        if (i != j)
           Bars[j].style.background = "linear-gradient(#ee0979, #ff6a00)"; // unsorted
     }
  
  
     await swap(i, high);
     Bars[i].style.background = "linear-gradient(#087ee1, #05e8ba)"; // sorted
     Bars[high].style.background = "linear-gradient(#ee0979, #ff6a00)"; // unsorted
  
     if (high == i)
        Bars[high].style.background = "linear-gradient(#087ee1, #05e8ba)"; // sorted
  
     await timePLs();
  
     return i;
 
  }
  