(function(global){

    var loadedCache = {};
    
    function require(dependency) {

        if(dependency.constructor.name == "Function") {            
            return require.load(dependency);
        }
        if(loadedCache[dependency]) return loadedCache[dependency];

        var hasExtension = /^(.*)\.jsx(bin)?$/i.test(dependency);
        var sourcePath = new File($.fileName).path + "/" + dependency;        
        if(!hasExtension){
            
            if(new File(sourcePath + ".jsx").exists) {
                sourcePath = sourcePath + ".jsx";
            } else if(new File(sourcePath + ".jsxbin").exists) {
                sourcePath = sourcePath + ".jsxbin";
            } else {
                loadedCache[dependency] = null;
                return null;
            }
            
        }
        
        return require.load(function(){ return $.evalFile(sourcePath);  }, dependency);
        
    }

    require.load = function(loader, dependency) {
                                   
        var result = loader(global);
        loadedCache[dependency ? dependency : result.name] = result;        
        return result;
    }

    global.require = require;
    
})(this);

