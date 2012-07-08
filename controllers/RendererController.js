var RendererService = require('../services/RendererService');

var RendererController = module.exports = {
    clientRenderer: function(req, res) {
        var path = req.params[0];
        RendererService.getClientRenderer(path, function(err, render) {
            res.send(render, { 'Content-Type' : 'text/javascript' });
        });
    }
};
