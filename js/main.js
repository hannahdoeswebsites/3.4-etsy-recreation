

    (function(){
        var $productElement = document.querySelector(".itemsForSale");
        var url = "https://api.etsy.com/v2/listings/active.js?api_key=smwj0zbdutofwc3mo9ptjui8&keywords=curiosities+and+oddities&includes=Images,Shop&limit=24&sort_on=score";
        fetchJSONP(url, app);

        function app(httpReturn){
            var products = httpReturn.results;

            displayProducts(products);
        }


        function displayProducts(products){
            console.log(products);
            var shopname   = document.querySelector("#itemsForSale-Template").innerHTML;
            var template = Handlebars.compile(shopname);
            Handlebars.registerHelper('productImage', function(){
                return this.Images[0].url_170x135;
            } );

            Handlebars.registerHelper('shopLink', function(){
                return this.url;
            } );

            Handlebars.registerHelper('ownerLink', function(){
                return this.Shop.url;
            } );

            Handlebars.registerHelper('checkTitle', function(string){
                //console.log(string);
                if(string.length > 30){
                    var s = string.slice(0,30);
                    return s + "...";
                }else return string;
            });

            //console.log(html);
            products.forEach(function(info){
                var html = template(info);

                $productElement.insertAdjacentHTML('beforeend',html);

            });
        }

        function HBreturnImag(hello){



        }

        function fetchJSONP(url, callback) {
            var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
            var script = document.createElement('script');

            window[callbackName] = function(data) {
                delete window[callbackName];
                document.body.removeChild(script);
                callback(data);
            };

            script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
            document.body.appendChild(script);
        }

    })();
