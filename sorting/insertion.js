// Insertion sort

async function insertionSort() {
  

     let Bars = document.querySelectorAll(".bar");
  
     Bars[0].style.background = "linear-gradient(#087ee1, #05e8ba)"; // sorted
  
     for (let i = 1; i < Bars.length; i++) {
        let j = i;
  
        await timePLs();
  
        while (j > 0 && Number(Bars[j].style.height.slice(0, -2)) < Number(Bars[j - 1].style.height.slice(0, -2))) {
           Bars[j].style.background = "yellow"; // active
           Bars[j-1].style.background = "yellow"; // active
           await swap(j, j - 1);
  
           await timePLs();
           
           Bars[j-1].style.background = "linear-gradient(#087ee1, #05e8ba)"; // sorted
           Bars[j].style.background = "linear-gradient(#087ee1, #05e8ba)"; // sorted
           j--;
        }
  
        Bars[i].style.background = "linear-gradient(#087ee1, #05e8ba)"; // sorted
     }
    
  
  }
  