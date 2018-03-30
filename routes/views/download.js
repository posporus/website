var keystone = require('keystone');
var Files = keystone.list('Files');
var Accesskeys = keystone.list('Accesskeys');



exports = module.exports = function (req, res) {
  console.log(req.query.key,req.query.id);
  var keyValid = false;

  Accesskeys.model.find()
    .where('key',req.query.key)
    .where({'timeUsed': { $gt: Date.now()-86400000}})
    .exec(function(err, keys) {
      if(keys.length != 0) {
        keyValid = true;
        //console.log("keyValid");
        console.log(Files);
      }
      else {
        res.status(403).end();
      }
  });

  Files.model.find()
    .where('_id',req.query.id)
    .exec(function(err, files) {
      console.log(files);
      if(files.length != 0/* && keyValid*/) {
        console.log(files);
        var file = __dirname + './../../files/' + files[0].file.filename;
        res.download(file,files[0].name);

      }
      else {
        res.status(404).end();
      }

  });
  //var file = __dirname + './../../files/test.txt';
  //res.download(file);
};
