var Historical = function(symbol, date, open, close, high, low, volume){
    this.symbol = symbol;
    this.date   = date;
    this.open   = open;
    this.close  = close;
    this.high   = high;
    this.low    = low;
    this.volume = volume;
}

$.getJSON('../data/yahoo_historical.json', function(data) {
    var quoteObjects = [];
    var quotes = data.results.quote
    quotes.forEach(function(quote){
        quoteObjects.push(new Historical(
            quote.Symbol,
            quote.Date,
            quote.Open,
            quote.Close,
            quote.High,
            quote.Low,
            quote.Volume
        ));
    });
    quoteObjects.sort(function(x,y){
        return x.date < y.date
    });
    return quoteObjects
});