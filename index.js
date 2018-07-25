$(function () {

    // $("#submitBtn").click(function () {
    //     var radioBtn = $('input[name=radioBtn]:checked').val();

    //     getData(radioBtn);

    // });


    function getData(symbol) {
        $.ajax({

            type: 'GET',
            url: 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=5min&apikey=40EG681TIY1NSO94',
            //testUrl
            //url: 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo',
            success: function (data) {
                var tempdata = [
                    []
                ];
                var xaxis = [
                    []
                ];

                if (Object.keys(data)[1] == undefined) {
                    alert("線路繁忙請重新整理");
                    temp = 1;
                    console.log(temp);
                    return;
                }

                var dataLength = Object.keys(data['Time Series (5min)']).length;

                var i = 0;
                for (var j = (dataLength - 1); j >= 0; j--) {
                    var time = Object.keys(data['Time Series (5min)'])[j];
                    if (time.substr(0, 10) != Object.keys(data['Time Series (5min)'])[0].substr(0, 10)) {
                        continue;
                    }
                    if (i % 6 == 0) {
                        xaxis[i] = [i, time.substr(11, 5)];
                    }
                    tempdata[i] = [i, data['Time Series (5min)'][time]['4. close']];
                    i++;
                }

                makeFlot(tempdata, xaxis, symbol);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.responseText);
            }
        });
    }

    function makeFlot(data, xaxis, symbol) {
        // console.log(data);

        var dataset = [{
            label: symbol,
            color: "#FF0000",
            data: data
        }];

        var options = {
            series: {
                lines: {
                    show: true
                },
                points: {
                    radius: 3,
                    show: true
                },
            },

            xaxis: {
                ticks: xaxis,
                axisLabelPadding: 20
            },

            yaxes: [{
                position: "left",
                color: "black",
                axisLabel: "USD",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 3
            }]

        };
        //$("#flot-placeholder-" + symbol).css("background-color", "white");
        $.plot($("#flot-placeholder-" + symbol), dataset, options);

    }

    function getDaliyData(symbol) {
        $.ajax({

            type: 'GET',
            url: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&apikey=40EG681TIY1NSO94',
            //testUrl
            //url: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo',
            success: function (data) {
                if (Object.keys(data)[1] == undefined) {
                    alert("線路繁忙請重新整理");
                    temp = 1;
                    console.log(temp);
                    return;
                }

                var time = Object.keys(data['Time Series (Daily)'])[0];

                var html = `<td>${data['Time Series (Daily)'][time]['1. open']}</td>
                            <td>${data['Time Series (Daily)'][time]['2. high']}</td>
                            <td>${data['Time Series (Daily)'][time]['3. low']}</td>`;

                $("#contentTr-" + symbol).append(html);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.responseText);
            }
        });
    }
    var temp = 0;
    getData("msft");
    getDaliyData("msft");
    getData("dis");
    getDaliyData("dis");
});