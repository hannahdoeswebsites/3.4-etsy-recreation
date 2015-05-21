(function(){
  'use strict';

  var url = 'https://api.etsy.com/v2/listings/active.js?api_key=smwj0zbdutofwc3mo9ptjui8&keywords=curiosities+and+oddities&includes=Images,Shop&limit=24&sort_on=score';
  fetchJSONP(url, app);

  /*
    Call this function with the URL where the JSON lives.
    We will pass a function as the second argument.
    That function will be called when the request finished.
    The argument to that function will be the JSON data.
    You will need to change the values for url.
  */

  var ulElement = document.querySelector('.itemsForSale');

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

  /*
    Etsy's API return data in a slightly different format.
    Extract the data accordingly
  */

  function app(response) {

    var items = response.url_fullxfull;
    console.log(images);
    displayImages(images);
  }


  function displayImages(images) {
    var source = document.querySelector("#itemsForSale-Template").innerHTML;
    var template = Handlebars.compile(source);
    items.forEach(function(image){
      var output = template(image);
      ulElement.insertAdjacentHTML('beforeend', output);
    });
  }


  function app(response) {

    var items = response.results;
    console.log(items);
    displayItemsForSale(items);
  }


  function displayItemsForSale(items) {
    var source = document.querySelector("#itemsForSale-Template").innerHTML;
    var template = Handlebars.compile(source);
    items.forEach(function(item){
      var output = template(item);
      ulElement.insertAdjacentHTML('beforeend', output);
    });
  }
})();
