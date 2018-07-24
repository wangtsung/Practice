$(function () {

    $("#submitBtn").click(function () {
        var radioBtn = $('input[name=radioBtn]:checked').val();

        getData(radioBtn);

    });

    function getData(symbol) {
        $.ajax({

            type: 'GET',
            url: 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=5min&apikey=40EG681TIY1NSO94',
            success: function (data) {
                var temp = [
                    []
                ];
                var xaxis = [
                    []
                ];
                var dataLength = Object.keys(data['Time Series (5min)']).length;

                var i = 0;
                for (var j = (dataLength - 1); j >= 0; j--) {
                    var time = Object.keys(data['Time Series (5min)'])[j];
                    if (time.substr(0, 10) != Object.keys(data['Time Series (5min)'])[0].substr(0, 10)) {
                        continue;
                    }
                    xaxis[i] = [i, time.substr(11, 5)];
                    temp[i] = [i, data['Time Series (5min)'][time]['4. close']];
                    i++;
                }

                makeFlot(temp, xaxis);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.responseText);
            }
        });
    }

    function makeFlot(data, xaxis) {
        // console.log(data);

        var dataset = [{
            label: "line1",
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
                ticks: xaxis
            }
        };

        $.plot($("#flot-placeholder"), dataset, options);

    }
});