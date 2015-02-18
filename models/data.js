var Data = function(symbol, type){
    this.symbol = symbol;
    this.type   = type;
    this.data   = this.load;
}

Data.prototype = {
    load: function(){

    }
}