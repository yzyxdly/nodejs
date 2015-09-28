console.log('begin...');
var fs = require('fs');
var q = require('q');
fs.readFile('user_parent_rel', 'utf-8', function (err, data) {
    if (err) {
        throw err;
    };
    var userParentMap = {};
    var lines = data.split('\r\n');
    for (var i in lines) {
        var line = lines[i];
        if (line) {
            var columns = line.split(',');
            userParentMap[columns[0]] = columns[1];
        }
    }
    var moduleUserPathMap = {};
    for (var user in userParentMap) {
        var start = user;
        var parents = [];
        parents.push(user);
        var parent = userParentMap[user];
        while(parent && !(parent === user) && !(parent === '"yli"')) {
            parents.push(parent);
            user = parent;
            parent = userParentMap[user];
        }
        moduleUserPathMap[start] = parents.join(',');
    }
    fs.readFile('module_user_rel', 'utf-8', function (err, data) {
        if (err) {
            throw err;
        };
        var moduleUserPaths = [];
        var lines = data.split('\r\n');
        for (var i in lines) {
            var line = lines[i];
            if (line) {
                var columns = line.split(',');
                var module = columns[0];
                if (module) {
                    moduleUserPaths.push([module, moduleUserPathMap[columns[1]]].join(','));
                }
            }
        }
        fs.writeFile('module_user_path.csv', moduleUserPaths.join('\n'), function (err) {
            if (err) {
                throw err;
            }
            console.log('saved');
            console.log('end...');
        });
    });
});
