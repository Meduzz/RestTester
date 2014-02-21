var hero = require("superagent");

exports.index = function(req, res){
  res.render('index', {title: 'Express'});
};

exports.ajax = function(req, res) {
	var method = req.body.method;
	var body = req.body.body;
	var url = req.body.url;
	var headers = buildHeaders(req.body.key, req.body.val);

	var request = hero[method.toLowerCase()](url);
	
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