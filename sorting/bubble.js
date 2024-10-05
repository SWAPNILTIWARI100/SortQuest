// Bubble Sort

async function bubbleSort() {
   disableSortingButtons();

   const start = performance.now();
 
     
     
 
     let Bars = document.querySelectorAll(".bar");
  
     for (let i = 0; i < Bars.length - 1; i++) {
        for (let j = 0; j < Bars.length - i - 1; j++) {
  
           Bars[j].style.background = "yellow"; // active
           Bars[j + 1].style.background = "yellow"; // active
  
           await timePLs();
  
           const val1 = Number(Bars[j].style.height.slice(0, -2));
           const val2 = Number(Bars[j + 1].style.height.slice(0, -2));
  
           if (val1 > val2) {
              await swap(j, j + 1);
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
    addDataToGraph(arraySize, timeTaken,"Bubble Sort");
    enableSortingButtons();
     
     
  }
  