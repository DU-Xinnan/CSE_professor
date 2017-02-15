var result = require('./get_data.js');
function convert_string(str){
  return str.split('-')[0].trim();
}

Universities = new Map();
for(let i = 0;i<result.length;i++){
  if(result[i].Bachelor != ''){
  if(Universities.has(result[i].Bachelor)){
    var old_values = Universities.get(result[i].Bachelor);
    Universities.set(result[i].Bachelor,{'Bachelor':old_values.Bachelor+1, 'Masters':old_values.Masters, 'Doctorate':old_values.Doctorate, 'PostDoc':old_values.PostDoc})
  }
  else{
    Universities.set(result[i].Bachelor,{'Bachelor':1, 'Masters':0, 'Doctorate':0, 'PostDoc':0});
  }
}

  if(result[i].Masters != ''){
  if(Universities.has(result[i].Masters)){
    var old_values = Universities.get(result[i].Masters);
    Universities.set(result[i].Masters,{'Bachelor':old_values.Bachelor, 'Masters':old_values.Masters+1, 'Doctorate':old_values.Doctorate, 'PostDoc':old_values.PostDoc})
  }
  else{
    Universities.set(result[i].Masters,{'Bachelor':0, 'Masters':1, 'Doctorate':0, 'PostDoc':0});
  }
}

  if(result[i].Doctorate != ''){
  if(Universities.has(result[i].Doctorate)){
    var old_values = Universities.get(result[i].Doctorate);
    Universities.set(result[i].Doctorate,{'Bachelor':old_values.Bachelor, 'Masters':old_values.Masters, 'Doctorate':old_values.Doctorate+1, 'PostDoc':old_values.PostDoc})
  }
  else{
    Universities.set(result[i].Doctorate,{'Bachelor':0, 'Masters':0, 'Doctorate':1, 'PostDoc':0});
  }
}


if(result[i].PostDoc != ''){
  if(Universities.has(result[i].PostDoc)){
    var old_values = Universities.get(result[i].PostDoc);
    Universities.set(result[i].PostDoc,{'Bachelor':old_values.Bachelor, 'Masters':old_values.Masters, 'Doctorate':old_values.Doctorate, 'PostDoc':old_values.PostDoc+1})
  }
  else{
    Universities.set(result[i].PostDoc,{'Bachelor':0, 'Masters':0, 'Doctorate':0, 'PostDoc':1});
  }
}
}
var Bachelor = [], Masters = [], Doctorate = [], PostDoc = [];
for(var key of Universities.keys()){
  var temp = Universities.get(key);
  if(temp.Bachelor+ temp.Masters + temp.Doctorate + temp.PostDoc != 0){
    Bachelor.push({'University':key, 'count':Universities.get(key).Bachelor});
    Masters.push({'University':key, 'count':Universities.get(key).Masters});
    Doctorate.push({'University':key, 'count':Universities.get(key).Doctorate});
    PostDoc.push({'University':key, 'count':Universities.get(key).PostDoc});
  }
}
var dataset = [{'data':Bachelor, 'name':'Bachelor'},{'data':Masters, 'name':'Masters'},{'data':Doctorate, 'name':'Doctorate'},{'data':PostDoc, 'name':'PostDoc'}]
module.exports = dataset;
