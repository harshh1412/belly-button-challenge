// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let fmd = metadata.filter(object_row => object_row.id == sample);
    
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
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let fsd = samples.filter(object_row => object_row.id == sample);

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


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
 
  // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown_menu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (name of names) {
      dropdown_menu.append("option").text(name);
    }

    // Get the first sample from the list
    default_sample = names[0];

    // Build charts and metadata panel with the first sample
    buildMetadata(default_sample);
    buildCharts(default_sample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Initialize the dashboard
init();