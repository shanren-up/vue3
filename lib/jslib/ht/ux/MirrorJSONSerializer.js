var MirrorJSONSerializer = function(dataModel) {
    MirrorJSONSerializer.superClass.constructor.call(this, dataModel);
};
ht.Default.def(MirrorJSONSerializer, ht.JSONSerializer, {
    serialize: function(data, space, num) {
        this._data = data;
        if(space == null) space = 2;
        if(num == null) num = 2;
        return JSON.stringify(this.toJSON(data), function(key, value){
                    if(typeof value === 'number'){
                        return parseFloat(value.toFixed(2));
                    }
                    return value;
                }, space);        
    },
    toJSON: function(data){
        var json = this.json = {
                v: ht.Default.getVersion(),
                d: []
            };         
        this.serializeData(data);
        return json;
    },
    isSerializable: function(data) {
        return data === this._data;
    },
    deserializeData: function(data, json) {
        MirrorJSONSerializer.superClass.deserializeData.call(this, data, json);
    }
});