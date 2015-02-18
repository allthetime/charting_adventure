$(document).ready(function() {



  // Get context with jQuery - using jQuery's .get() method.
  var ctx = $("#CHART").get(0).getContext("2d");
  // This will get the first returned node in the jQuery collection.

  var chartOptions = {

    showScale: true,

    responsive: false,

 animationSteps: 5,
    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,

    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth: 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve: false,

    //Number - Tension of the bezier curve between points
    bezierCurveTension: 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot: true,

    //Number - Radius of each point dot in pixels
    pointDotRadius: 0,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth: 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius: 2,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke: true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth: 1,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill: true,
    showTooltips: true,
    multiTooltipTemplate: "<%= datasetLabel %>:<%= value %>",

    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",



  };

  $.getJSON('./xignite_historical_one_year.json', function(data) {


    PRICES = data.data.map(function(day) {
      return day.Average
    });

    HIGHS = data.data.map(function(day) {
      return day.High
    });

    LOWS = data.data.map(function(day) {
      return day.Low
    });

    MONTHS = data.data.map(function(day, index) {
      if (index == 0 || index % 30 == 0) {
        return day.StartDate
      } else {
        return ""
      }
    })

    chartData = createDataSets(PRICES, null, null, MONTHS);

    window.myChart = new Chart(ctx).Line(chartData, chartOptions);

    yearly_data = { PRICES: PRICES, HIGHS:HIGHS, LOWS: LOWS, MONTHS: MONTHS, CHART: myChart }


    $('#month').on('click', function() {
        
      // yearly_data["CHART"].destroy();
      window.myChart.destroy();

      var PRICES = oneMonth(yearly_data["PRICES"])
      var HIGHS = oneMonth(yearly_data["HIGHS"])
      var LOWS = oneMonth(yearly_data["LOWS"])

      var MONTHS = data.data.map(function(day, index) {
        if (index == 0 || index % 5 == 0) {
          return day.StartDate
        } else {
          return ""
        }
      })
      MONTHS = oneMonth(MONTHS)

      var chartData = createDataSets(PRICES, HIGHS, LOWS, MONTHS);
      window.myChart = new Chart(ctx).Line(chartData, chartOptions);
    });

    $('#year').on('click', function() {
        
      window.myChart.destroy();

      var PRICES = yearly_data["PRICES"]
      var HIGHS = yearly_data["HIGHS"]
      var LOWS = yearly_data["LOWS"]

      MONTHS = yearly_data["MONTHS"]

      var chartData = createDataSets(PRICES, null, null, MONTHS);
      window.myChart = new Chart(ctx).Line(chartData, chartOptions);
    });

    $('#day').on('click', function() {
      
        $.getJSON('./xignite_real_time_all_metals.json', function(dataNew){

            price_data = []

            for (moment in dataNew.data){
                console.log(dataNew.data)
                dataNew.data[moment].forEach(function(stock){
                    if (stock.Symbol == "XAU"){
                        price_data.push({
                          "Bid": stock.Bid,
                          "Mid": stock.Mid,
                          "Ask": stock.Ask,
                          "Time": stock.Time,
                        });
                    }
                })
            }

            console.log(price_data);

            var PRICES = []
            var HIGHS = []
            var LOWS = []
            var TIMES = []

            price_data.forEach(function(item){
                PRICES.push(item.Mid)
                HIGHS.push(item.Ask)
                LOWS.push(item.Bid)
                TIMES.push(item.Time)
            });

            window.myChart.destroy();

            var chartData = createDataSets(PRICES, HIGHS, LOWS, TIMES);
            window.myChart = new Chart(ctx).Line(chartData, chartOptions);

        })

    });

  });

  function oneMonth(LIST) {
    return LIST.slice(LIST.length - 30, LIST.length)
  }

  function createDataSets(AVGS, HIGHS, LOWS, LABELS) {
    return {
      labels: LABELS,
      datasets: [{
        label: "AVG ",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(0,220,0,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: AVGS,
      }, {
        label: "HIGH",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,0,0,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(0,220,0,1)",
        data: HIGHS,
      }, {
        label: "LOW ",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(0,0,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(0,0,220,1)",
        data: LOWS,
      }, ]
    }
  }


});