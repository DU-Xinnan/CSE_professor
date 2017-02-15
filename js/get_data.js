$.ajaxSetup( { "async": false } );
var result = $.getJSON('./data/professors.json').responseJSON;
result = result.filter(function(item){
  return item.University == "Georgia Institute of Technology - USA" || item.University == "Georgia Institute of Technology"
})

module.exports = result;
