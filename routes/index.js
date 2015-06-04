var hero = require("superagent");
var URL = require("url");

exports.index = function(req, res){
  res.render('index', {title: 'Express'});
};

exports.ajax = function(req, res) {
	var method = req.body.method;
	var body = req.body.body;
	var url = URL.parse(req.body.url);
	var headers = buildHeaders(req.body.key, req.body.val);
  var mapping = {"GET":"get", "POST":"post","PUT":"put","HEAD":"head","DELETE":"del"};

	var request = hero[mapping[method]](url);
  headers.Host = url.host;
  
	if (['POST', 'PUT'].indexOf(method) > -1) {
		request.send(body);
	}
	
	if (Object.keys(headers).length > 0) {
		request.set(headers);
	}
	
	request.end(function(data) {
		if (data.ok) {
			if (data.type.indexOf("html") != -1 || data.type.indexOf("text") != -1) {
				res.send("HTML: "+data.text);
			} else {
				res.send("JSON/Form: "+JSON.stringify(data.body));
			}
		} else {
			res.send("Error: "+data.text);
		}
	});
};

function buildHeaders(keys, vals) {
	var headers = {};
	
	for (var h in keys) {
		headers[keys[h]] = vals[h];
	}
	
	return headers;
}