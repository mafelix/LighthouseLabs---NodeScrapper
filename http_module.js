
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var url = "http://substack.net/images/"
//wrong for permits
request(url, function (error, response, body) {
  var codeArr = [];
  var hrefArr = [];
  var extArr = [];

  if (!error && response.statusCode == 200) {
    // console.log(body) // Show the HTML for the Google homepage.
    $ = cheerio.load(body)
    var test = $('tr').find('code').first().text();
    $('tr').map(function(index, ele){
        codeArr.push(($(this).find('code').first().text()));
        //write to CSV file
        // console.log(codeArr);
    });
    var a = $('a');
    // console.log(a.attr('href'));
    a.map(function(index, ele){
      hrefArr.push(($(this).attr('href')));
      extArr.push(($(this).attr('href').match(/\.[a-zA-Z]+/)));
      // need to add to csv file
      // console.log(hrefArr, extArr);
      //join it put commas inbetween, CSV files only take strings
      //everything at lighthouse is supposed to be easy, IF YOU FIND YOURSELF DOING SOMETHING FOR A LONG TIME YOU ARE DOING IT IN A NOT EFFICENT WAY -  JEFFFFFFFFFFF
    });
    var finalArray = codeArr.concat(hrefArr, extArr);
    fs.writeFile('images.csv',finalArray, 'utf8');


  }
});


  // http.get(url, function (response) {
  //   response.setEncoding('utf8')
  //   response.on('data', console.log)
  //   response.on('error', console.error)
  // });
  //
  //
  //
  //
  //
  //
  //
  // module.exports = function gethtml(url, callback){
  //   http.get(url, function(response){
  //     response.setEncoding('utf8');
  //     response.on('data', callback);
  //     response.on('error', errorcallback);
  //   })
  // }
