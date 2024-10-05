// Selection sort 

async function selectionSort() {
  
   
     Bars = document.querySelectorAll(".bar");
     let minimum;
    
    
  
     for (let i = 0; i < Bars.length - 1; i++) {
        minimum = i;
        Bars[i].style.background = "yellow"; // active
  
        for (let j = i + 1; j < Bars.length; j++) {
  
           Bars[j].style.background = "yellow"; // active
  
           const minVal = Number(Bars[minimum].style.height.slice(0, -2));
           const val = Number(Bars[j].style.height.slice(0, -2));
  
           if (val < minVal) {
              Bars[minimum].style.background = "linear-gradient(#ee0979, #ff6a00)"; // unsorted
              minimum = j;
              Bars[minimum].style.background = "yellow"; // active
           }
  
           await timePLs();
  
           if (j != minimum)
              Bars[j].style.background = "linear-gradient(#ee0979, #ff6a00)"; // unsorted
        }
  
        await swap(i, minimum);
        Bars[minimum].style.background = "linear-gradient(#ee0979, #ff6a00)"; // unsorted
        Bars[i].style.background = "linear-gradient(#087ee1, #05e8ba)"; // sorted
     }
  
     Bars[Bars.length - 1].style.background = "linear-gradient(#087ee1, #05e8ba)"; // sorted
    
  }
  