var _ = require('underscore'),
    _s = require('underscore.string')
    program = require('commander'),
    fs = require('fs'),
    path = require('path');


program
    .version('0.0.1')
    .usage('[options] <inputfile> <deckname>')
    .option('-o, --out <filename>', 'Name of deck JSON output file.')
    .parse(process.argv);

// if (argv.length < 3) {
//     console.log('Usage: node list2deck.js list.json [-o deck.json]');
//     return;
// }

if (program.args.length < 2) {
    console.log("Usage: " + program.usage());
    return;
}

var listFilePath = program.args[0],
    deckName = program.args[1],
    outFilename = path.basename(program.out || (deckName.replace(' ','_').toLowerCase() + '_deck.json'));
    outFilePath = program.out || path.join(path.dirname(listFilePath), outFilename);
fs.readFile(listFilePath, 'utf8', function(err, data){
    if (err) throw err;
    var list = JSON.parse(data);
    list = _.map(list, function(item) {
        return {phrase:_s.trim(item)};
    });
    list = _.compact(list);
    deck = {
        name: deckName,
        cards: list
    };
    path.exists(outFilePath, function(exists){
        var saveDeck = function() {
            fs.writeFileSync(outFilePath, JSON.stringify(deck), 'utf8');
            console.log('Saved deck '+deckName+' to '+outFilePath);
        };
        if (!exists) {
            saveDeck();
            process.exit();
        }
        program.prompt(outFilePath+' already exists. overwrite? (y/n): ', function(overwrite){
            if (overwrite.toLowerCase()[0] == 'y') {
                saveDeck();
            }
            process.exit();
        });
    });
});