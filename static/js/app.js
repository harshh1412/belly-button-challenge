// Build the metadata panel
function buildMetadata(id_number) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
  
    // get the metadata field
    let metadata = data.metadata;
    
    // Filter the metadata for the object with the desired sample number
    let fmd = metadata.filter(object_row => object_row.id == id_number);
        
    // Use d3 to select the panel with id of `#sample-metadata`
    let metadata_panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metadata_panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (i in fmd[0]) {
      metadata_panel.append("p").text(`${i.toUpperCase()}: ${fmd[0][i]}`);
    }
  });
}


// function to build both charts
function buildCharts(id_number) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let fsd = samples.filter(object_row => object_row.id == id_number);
    
    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = fsd[0].otu_ids;
    let otu_labels = fsd[0].otu_labels;
    let sample_values = fsd[0].sample_values;

    // Build a Bubble Chart
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: "markers",
      marker: {size: sample_values, color: otu_ids},
      text: otu_labels,
    };

    let layout1 = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Number of Bacteria"},
    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", [trace1], layout1);



    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let y_ticks = otu_ids.slice(0, 10).map(o => `OTU ${o}`).reverse();

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let SlicedData = sample_values.slice(0, 10).reverse();
    
    let trace2 = {
      x: SlicedData,
      y: y_ticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    };

    let layout2 = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {title: "Number of Bacteria"},
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", [trace2], layout2);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
 
  // Get the names field
    let id_numbers = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown_menu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (id of id_numbers) {
      dropdown_menu.append("option").text(id);
    }

    // Get the first sample from the list
    default_id_number = id_numbers[0];

    // Build charts and metadata panel with the first sample
    buildMetadata(default_id_number);
    buildCharts(default_id_number);
  });
}

// Function for event listener
function optionChanged(new_id_number) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(new_id_number);
  buildCharts(new_id_number);
}

// Initialize the dashboard
init();