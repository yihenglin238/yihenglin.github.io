const compContainer = document.getElementById("comp-container")
const stockContainer = document.getElementById("stock-container")
const recContainer = document.getElementById("rec-container")
const recTrend = document.getElementById("trend")
const newsContainer = document.getElementById("news-container")
const chartsContainer = document.getElementById("charts-container")

const notfoundContainer = document.getElementById("result-notfound")

var tabrow = document.getElementById("result-found-tabrow");
var btns = tabrow.getElementsByClassName("tabBtns");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}


document.getElementById("searchBtn").onclick = function(event){
  document.getElementById("stock-container").style.visibility = "hidden";
  document.getElementById("rec-container").style.visibility = "hidden";
  document.getElementById("trend").style.visibility = "hidden";
  document.getElementById("charts-container").style.visibility = "hidden";
  document.getElementById("news-container").style.visibility = "hidden";
  document.getElementById("comp-container").style.visibility = "visible";
  document.getElementById("result-notfound").style.visibility = "hidden";

  const input = document.getElementById("userInput").value.toUpperCase();
  const url = '/comp_data?userInput='+input
  let company = ""

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.name == null) {
        notfoundContainer.innerHTML = 'Error: No record has been found, please enter a valid symbol';
        document.getElementById("result-notfound").style.visibility = "visible";
      }
      else{
      company += '<div class=\"inline\"><img src='+ data.logo +' width=80px height=80px></div>';
      company += '<div class="underline"></div>'
      company += '<div class=\"inline\"><b>Company Name</b>' + data.name + '</div>'
      company += '<div class="underline"></div>'
      company += '<div class=\"inline\"><b>Stock Ticker Symbol</b>'+ data.ticker + '</div>'
      company += '<div class="underline"></div>'
      company += '<div class=\"inline\"><b>Stock Exchange Code</b>' + data.exchange + '</div>'
      company += '<div class="underline"></div>'
      company += '<div class=\"inline\"><b>Company IPO Date</b>' + data.ipo + '</div>'
      company += '<div class="underline"></div>'
      company += '<div class=\"inline\"><b>Category</b>' +  data.finnhubIndustry + '</div>'
      company += '<div class="underline"></div>'
      compContainer.innerHTML = company;
    }
  })
    event.preventDefault();
}




document.getElementById("compBtn").onclick = function(event){
  document.getElementById("stock-container").style.visibility = "hidden";
  document.getElementById("rec-container").style.visibility = "hidden";
  document.getElementById("trend").style.visibility = "hidden";
  document.getElementById("charts-container").style.visibility = "hidden";
  document.getElementById("news-container").style.visibility = "hidden";
  document.getElementById("comp-container").style.visibility = "visible";


  const input = document.getElementById("userInput").value.toUpperCase();
  const url = '/comp_data?userInput='+input
  let company = ""

  fetch(url)
    .then(res => res.json())
    .then(data => {
      company += '<div class=\"inline\"><img src='+ data.logo +' width=80px height=80px></div>';
      company += '<div class="underline"></div>'
      company += '<div class=\"inline\"><b>Company Name</b>' + data.name + '</div>'
      company += '<div class="underline"></div>'
      company += '<div class=\"inline\"><b>Stock Ticker Symbol</b>'+ data.ticker + '</div>'
      company += '<div class="underline"></div>'
      company += '<div class=\"inline\"><b>Stock Exchange Code</b>' + data.exchange + '</div>'
      company += '<div class="underline"></div>'
      company += '<div class=\"inline\"><b>Company IPO Date</b>' + data.ipo + '</div>'
      company += '<div class="underline"></div>'
      company += '<div class=\"inline\"><b>Category</b>' +  data.finnhubIndustry + '</div>'
      company += '<div class="underline"></div>'
      compContainer.innerHTML = company;
  })
    event.preventDefault();
}






document.getElementById("ssBtn").onclick = function(event){
  document.getElementById("stock-container").style.visibility = "visible";
  document.getElementById("rec-container").style.visibility = "visible";
  document.getElementById("trend").style.visibility = "visible";
  document.getElementById("charts-container").style.visibility = "hidden";
  document.getElementById("news-container").style.visibility = "hidden";
  document.getElementById("comp-container").style.visibility = "hidden";


  const input = document.getElementById("userInput").value.toUpperCase();
  const url = '/comp_dataS?userInput='+input
  let stock = ""

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let timestamp = new Date(data.t);
      let date = new Date(timestamp);
      //let dateout = date.getMonth() + '-' +  date.getDate() + '-' + date.getFullYear();
      let dateout = date.toLocaleDateString('en-US')

      stock += '<div class=\"inline\"><b>Stock Ticker Symbol</b>' + input + '</div>'
      stock += '<div class="underline"></div>'
      stock += '<div class=\"inline\"><b>Trading Day</b>' + dateout + '</div>'
      stock += '<div class="underline"></div>'
      stock += '<div class=\"inline\"><b>Previous Closing Price</b>' + data.pc + '</div>'
      stock += '<div class="underline"></div>'
      stock += '<div class=\"inline\"><b>Open Price</b>'  + data.o + '</div>'
      stock += '<div class="underline"></div>'
      stock += '<div class=\"inline\"><b>High Price</b>' + data.h + '</div>'
      stock += '<div class="underline"></div>'
      stock += '<div class=\"inline\"><b>Low Price</b>'  + data.l + '</div>'
      stock += '<div class="underline"></div>'

      if (data.d > 0) {
      stock += '<div class=\"inline\"><b>Change</b>' + data.d
      stock += '<img src=\"static\/img\/GreenArrowUp.png\" width=18px></div>'
      stock += '<div class="underline"></div>'
      }
      else {
      stock += '<div class=\"inline\"><b>Change</b>' + data.d
      stock += '<img src=\"static\/img\/RedArrowDown.png\" width=18px></div>'
      stock += '<div class="underline"></div>'
      }

      if (data.dp > 0) {
      stock += '<div class=\"inline\"><b>Change Percent</b>' + data.dp
      stock += '<img src=\"static\/img\/GreenArrowUp.png\" width=18px></div>'
      stock += '<div class="underline"></div>'
      }
      else {
      stock += '<div class=\"inline\"><b>Change Percent</b>' + data.dp
      stock += '<img src=\"static\/img\/RedArrowDown.png\" width=18px></div>'
      stock += '<div class="underline"></div>'
      }
      
      stockContainer.innerHTML = stock;
  })

  const urlrec = '/comp_dataR?userInput='+input
  recommendation = ""
  fetch(urlrec)
    .then(res => res.json())
    .then(data => {
      recommendation += '<div class = \"strong-sell\">Strong Sell</div>'
      recommendation += '<div class = \"block1\">' + data[0].strongSell + '</div>'
      recommendation += '<div class = \"block2\">' + data[0].sell + '</div>'
      recommendation += '<div class = \"block3\">' + data[0].hold + '</div>'
      recommendation += '<div class = \"block4\">' + data[0].buy + '</div>'
      recommendation += '<div class = \"block5\">' + data[0].strongBuy + '</div>'
      recommendation += '<div class = \"strong-buy\">Strong Buy</div>'
      recContainer.innerHTML = recommendation;
    })

    trends = ""
    trends += '<div class=\"inline\">Recommendation Trends</div>'
    recTrend.innerHTML = trends
    event.preventDefault();
}


document.getElementById("chartsBtn").onclick = function(event){
  document.getElementById("stock-container").style.visibility = "hidden";
  document.getElementById("rec-container").style.visibility = "hidden";
  document.getElementById("trend").style.visibility = "hidden";
  document.getElementById("charts-container").style.visibility = "visible";
  document.getElementById("news-container").style.visibility = "hidden";
  document.getElementById("comp-container").style.visibility = "hidden";


  const input = document.getElementById("userInput").value.toUpperCase();
  const urlcharts = '/comp_dataC?userInput='+input
  const currentDate = new Date().toLocaleDateString('en-US');//.toDateString();

  let chart1 = []
  fetch(urlcharts)
    .then(res => res.json())
    .then(data => {
      const priceData = data.results.map(item => {
        return [
          new Date(item.t).getTime(),
          item.c
        ];
        });
      const volumeData = data.results.map(item => {
        return [
          new Date(item.t).getTime(),
          item.v
        ];
        });
      
    Highcharts.stockChart('charts-container', {

            title: {
                text: 'Stock Price ' + input + ' ' + currentDate
            },

            subtitle: {
                useHTML: true,
                text: '<a href="https://polygon.io">Source: Polygon.io</a>'
            },

            xAxis: {
                gapGridLineWidth: 0
            },

            rangeSelector: {
                buttons: [{
                    type: 'day',
                    count: 7,
                    text: '7d'
                }, {
                    type: 'day',
                    count: 15,
                    text: '15d'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }],
                selected: 1,
                inputEnabled: false
            },

            yAxis: [{
                labels: {
                    align: 'left',
                    x: 3
                },
                title: {
                    text: 'Stock Price'
                },
                height: '60%',
                lineWidth: 2,
                resize: {
                    enabled: true
                }
                
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume'
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2

            }],

            series: [{
                name: input,
                type: 'area',
                data: priceData,
                yAxis: 0,
                zIndex: 1,
                gapSize: 5,
                tooltip: {
                    valueDecimals: 2
                },
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                threshold: null
            }, {
                type: 'column',
                name: 'Volume',
                data: volumeData,
                zIndex: 0,
                yAxis: 1,
                color: '#000000',
                pointWidth: 5,
                tooltip: {
                    valueDecimals: 0
                }
            }]
        });
  })

  
 

    event.preventDefault();
}


document.getElementById("newsBtn").onclick = function(event){
  document.getElementById("stock-container").style.visibility = "hidden";
  document.getElementById("rec-container").style.visibility = "hidden";
  document.getElementById("trend").style.visibility = "hidden";
  document.getElementById("charts-container").style.visibility = "hidden";
  document.getElementById("news-container").style.visibility = "visible";
  document.getElementById("comp-container").style.visibility = "hidden";


  const input = document.getElementById("userInput").value.toUpperCase();
  //document.getElementById("testinput").textContent = `${input}`
  const urlnews = '/comp_dataN?userInput='+input
  let news = ""
  fetch(urlnews)
    .then(res => res.json())
    .then(data => {
      for (i = 0; i < data.length; i++){
        let timestamp = new Date(data[i].datetime);
        let date = new Date(timestamp);
        //let dateout = date.getMonth() + '-' +  date.getDate() + '-' + date.getFullYear();
        let dateout = date.toLocaleDateString('en-US')
        news += '<div class=\"newsinline\">'
        news += '<div class=\"newsPic\" id=\"newsPic\">';
        news += '<img src='+ data[i].image +' width=120px height=120px>';
        news += '</div>';
        news += '<div class=\"newsText\" id=\"newsText\">';
        news += '<div class=\"newstitle\">' + data[i].headline + '</div>';
        news += '<div class="date">' + dateout + '</div>';
        news += '<div class="link"><li><a href=\"' + data[i].url + '\">See Original Post</a></li></div>';
        news += '</div>';
        news += '</div>';
        news += '<div class="space"></div>'
      }
      newsContainer.innerHTML = news;
  })
    event.preventDefault();
}
