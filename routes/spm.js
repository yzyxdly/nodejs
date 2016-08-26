var express = require('express');
var router = express.Router();

var tree = {
    nodes: {
        253: {
            path: 'appdemo',
            isModule: 'false',
            isSecret: false
        },
        9885: {
            path: 'appdemo/qa-code',
            isModule: 'false',
            isSecret: true
        },
        22778: {
            path: 'appdemo/qa-code/lcmoon',
            isModule: 'true',
            isSecret: false
        },
        32456: {
            path: 'appdemo/agile',
            isModule: 'false',
            isSecret: false
        },
        32485: {
            path: 'appdemo/agile/zhiding',
            isModule: 'true',
            isSecret: false
        }
    },
    init: function () {
        for (var id in tree.nodes) {
            tree.nodes[id].id = id;
        }
    },
    getInheritableAncestorByPath: function (path) {
        var paths = [];
        var secretLevel = 0;
        for (var id in tree.nodes) {
            var node = tree.nodes[id];
            if ((path.startsWith(node.path + '/') || path === node.path) && node.isSecret) {
                secretLevel = node.path.split('/').length;
            }
        }
        for (var id in tree.nodes) {
            var node = tree.nodes[id];
            if (path.startsWith(node.path + '/') && node.path.split('/').length >= secretLevel) {
                paths.push(node.path);
            }
        }
        return paths;
    },
    getWriteSubNodeById: function (id) {
        var nodes = [];
        if (id === '1') {
            for (var id in tree.nodes) {
                if (tree.nodes[id].path.indexOf('/') === -1) {
                    nodes.push(tree.nodes[id]);
                }
            }
            return nodes;
        }
        var node = tree.nodes[id];
        if (node) {
            var path = node.path;
            for (var id in tree.nodes) {
                var node = tree.nodes[id];
                if (node.path.startsWith(path + '/') && node.path.split('/').length === path.split('/').length + 1) {
                    nodes.push(node);
                }
            }
        }
        return nodes;
    },
    getNodeFeatureById: function (id) {
        return tree.nodes[id];
    }
};
tree.init();

var logAccessDetail = function(req, res, next) {
    console.log('query:');
    console.log(req.query);
    console.log('params:');
    console.log(req.params);
    console.log('body:');
    console.log(req.body);
    next();
};

router.get('/', function(req, res, next) {
  res.send('Mocked endpoint for spm!');
});

router.get(
    '/getInheritableAncestorByPath',
    logAccessDetail,
    function(req, res, next) {
      res.send(tree.getInheritableAncestorByPath(req.param('path')));
    });

router.get(
    '/getWriteSubNodeById',
    logAccessDetail,
    function(req, res, next) {
        res.send(tree.getWriteSubNodeById(req.param('id')));
    });

router.get(
    '/getNodeFeatureById',
    logAccessDetail,
    function(req, res, next) {
        res.send(tree.getNodeFeatureById(req.param('id')));
    });

module.exports = router;
