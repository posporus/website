var keystone = require('keystone');
var Types = keystone.Field.Types;

var Files = new keystone.List('Files');

var filesStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./files'),
    publicPath: '/files',
  },
});

Files.add({
  name: { type: String },
  type: { type: Types.Select, options: 'WAV, MP3, ZIP, STEMS'},
  file: { type: Types.File, storage: filesStorage }
});

Files.register();
