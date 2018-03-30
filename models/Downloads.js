var keystone = require('keystone');
var Types = keystone.Field.Types;

var Downloads = new keystone.List('Downloads');

Downloads.add({
  name: { type: String },
  description: { type: Types.Html },
  category: {type: Types.Select, options: 'exclusive'},
  type: {type: Types.Select, options: 'Track, Album'},
  file: { type: Types.Relationship, ref:'Files', many: true }
});

Downloads.register();
