// Initialize Chart.js
const ctx = document.getElementById('sortingChart').getContext('2d');
let sortingChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Array size
        datasets: [
            {
                label: 'Bubble Sort',
                data: [], // Time data in seconds
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false
            },
            {
                label: 'Selection Sort',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: false
            },
            {
                label: 'Insertion Sort',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            },
            {
                label: 'Quick Sort',
                data: [],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                fill: false
            },
            {
                label: 'Merge Sort',
                data: [],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
                fill: false
            }
        ]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Array Size'
                },
                ticks: {
                    beginAtZero: true
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Time (Seconds)'
                },
                ticks: {
                    beginAtZero: true
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#000'
                }
            },
            tooltip: {
                backgroundColor: 'white',
                bodyColor: '#000'
            }
        },
        layout: { 
            padding: {
                top: 10,
                left: 10,
                right: 10,
                bottom: 10
            }
        }
    }
});

// Function to add data to the chart for a specific sorting algorithm
function addDataToGraph(size, time, algorithm) {
    // Convert time from ms to seconds
    const timeInSeconds = time / 1000;

    // Find the dataset index based on the sorting algorithm
    const datasetIndex = sortingChart.data.datasets.findIndex(dataset => dataset.label === algorithm);

    if (datasetIndex !== -1) {
        const dataset = sortingChart.data.datasets[datasetIndex];

        // Check if the size already exists in the labels
        const sizeIndex = sortingChart.data.labels.indexOf(size);
        
        if (sizeIndex === -1) {
            // Size does not exist, add new data for all algorithms at the same size
            sortingChart.data.labels.push(size);

            // Fill data for other datasets with `null` for the new size
            sortingChart.data.datasets.forEach(ds => {
                if (ds !== dataset) {
                    ds.data.push(null);
                }
            });
            
            dataset.data.push(timeInSeconds); // Add new time data for the current algorithm
        } else {
            // Size already exists, update the corresponding time value
            dataset.data[sizeIndex] = timeInSeconds;
        }

        // Sort the labels and data together
        let combined = sortingChart.data.labels.map((label, idx) => {
            return {
                size: label,
                times: sortingChart.data.datasets.map(ds => ds.data[idx])
            };
        });

        // Sort based on array size (x-axis)
        combined.sort((a, b) => a.size - b.size);

        // Update labels and data after sorting
        sortingChart.data.labels = combined.map(item => item.size);
        sortingChart.data.datasets.forEach((ds, idx) => {
            ds.data = combined.map(item => item.times[idx]);
        });

        // Update the chart
        sortingChart.update();
    }
}

// Reset the chart
document.getElementById('resetGraph').addEventListener('click', () => {
    sortingChart.data.labels = [];
    sortingChart.data.datasets.forEach(dataset => {
        dataset.data = [];
    });
    sortingChart.update();
});
