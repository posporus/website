var keystone = require('keystone');
var Types = keystone.Field.Types;

var Accesskeys = new keystone.List('Accesskeys');

Accesskeys.add({
  key: { type: Types.Key },
  published: {type: Boolean, default: false},
  timeCreated: { type:Types.Datetime, default: Date.now },
  //used: { type: Boolean, default: false },
  timeUsed: { type: Types.Datetime, required: true, default: 0 },
  //long: { type: Types.Number, default: 0 },
  //lat: { type: Types.Number, default: 0}
});

Accesskeys.schema.pre('save', function (next) {
    if (this.isNew) {
        this.key = Math.random().toString(36).slice(-5)
        console.log(this.key);
    }
    next();
});

Accesskeys.register();
