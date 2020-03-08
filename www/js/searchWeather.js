

    // function jsonCallback(data){
    //     console.log("jsonCallback");
    //     console.log(data);

    // }
    
    var icons = {
        "clear-day":"B",
        "clear-night":"C",
        "rain":"R",
        "snow":"G",
        "sleet":"X",
        "wind":"S",
        "fog":"N",
        "cloudy":"Y",
        "partly-cloudy-day":"H",
        "partly-cloudy-night":"I"

    };

    var cities = {
        "oakville":{coords:{latitude:43.447436,longitude: -79.666672}},
        "toronto":{coords:{latitude:43.653963,longitude:-79.387207}},
        "vancouver" :{coords:{latitude:49.2608724,longitude: -123.1139529}},
        "montreal":{coords:{latitude:45.4972159,longitude:-73.6103642}},
        "ottawa" :{coords:{latitude:45.421106,longitude:-75.690308}},
        "miami":{coords:{latitude:25.7742658,longitude:-80.1936589}},
        "orlando" :{coords:{latitude:28.5421109,longitude:-81.3790304}},
        "new york":{coords:{latitude:40.7127281,longitude:-74.0060152}},
        "san francisco" :{coords:{latitude:37.8267,longitude:-122.4233}},
        "london":{coords:{latitude:51.5073219,longitude: -0.1276474}},
        "barcelona" :{coords:{latitude:47.2879608,longitude:28.5670941}},
        "beijing" :{coords:{latitude:37.57224279278,longitude:-78.5287106987263}},
        "current location":""
     };

    function loadWeather(cityCoords){
        var latlng = cityCoords.coords.latitude+","+cityCoords.coords.longitude;
        console.log(latlng+"444");
        var forcastURL="https://api.darksky.net/forecast/a39404a66e67fd7be1889227724585fe/"+latlng;
        console.log(forcastURL+"888");
        $.ajax({

            url:forcastURL,
            jsonpCallback:"jsonCallback",
            contentType:"application/json",
            dataType:'jsonp',
            success:function(json){

                console.log(json);
                $("#current_temp").html(Math.round(json.currently.temperature)+"&#176;F");
                $("#current_summary").html(json.currently.summary);
                $("#current_temp").attr("data-icon",icons[json.currently.icon]);
                

            },
            error:function(e){
                console.log("please select a city");
            }

        });

    }

    function loadCity(city){
        console.log(city);
        $("#location").html(city);
        if (city.toLowerCase() =="current location") {
            if (navigator.geolocation)
                navigator.geolocation.getCurrentPosition(loadWeather,loadDefaultCity);
            else {
                loadDefaultCity();
            }

        }else{
              loadWeather(cities[city.toLowerCase()]);
        }

    }   

    function loadDefaultCity(){
        loadCity("Oakville");
    }
   


    $(document).ready(function(){
        ///loadWeather("Oakville");
        //console.log("!---$$$"+$(this).html());
        loadCity("Oakville");
        $("a.city").bind("click",function(){
            console.log("!---"+$(this).html());
            loadCity($(this).html()); 
          
        });
    });




