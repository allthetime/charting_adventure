metal_list = require('./xignite_available_metals.json')


metal_list = metal_list.MetalList

symbols = metal_list.map(function(item){
    return item.Symbol
})

console.log(symbols)

symbols.forEach(function(item){
    console.log(item);
});

