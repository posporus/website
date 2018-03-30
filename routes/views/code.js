var keystone = require('keystone');
var Accesskeys = keystone.list('Accesskeys');
var Downloads = keystone.list('Downloads');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'code';
  locals.formData = req.body || {};
  locals.keyValid = false;
  locals.keySubmitted = false;
  locals.remainingTime = 0;
  locals.key = 00000;
  locals.downloads = [];

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'code' }, function (next) {
    //console.log(Date.now());
    locals.keySubmitted = true;
    var submittedCode = req.body.code;

    Accesskeys.model.find()
      .where('key',submittedCode.toLowerCase())
      .or([{'timeUsed': { $gt: Date.now()-86400000}},{'timeUsed': 0}])
      .exec(function(err, keys) {
        if(keys.length != 0) {
          locals.keyValid = true;
          locals.key = keys[0].key;
          var timeUsedMilliseconds = Date.parse(keys[0].timeUsed);
          locals.remainingTime = Date.now() - timeUsedMilliseconds;
          console.log(locals.remainingTime);
          if(timeUsedMilliseconds == 0){
            console.log("first time used!")
            keys[0].timeUsed = Date.now();
            keys[0].save();
          }
        }
        next();
    });

    Downloads.model.find()
      .where('category','exclusive')
      .exec(function(err, downloads) {

        locals.downloads.append(downloads);
        console.log(locals.downloads);

      });

	});

	view.render('code');
};
