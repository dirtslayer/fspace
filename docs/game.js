
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

  var PACKAGE_PATH;
  if (typeof window === 'object') {
    PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
  } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'game.data';
    var REMOTE_PACKAGE_BASE = 'game.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
    Module['locateFile'](REMOTE_PACKAGE_BASE) :
    ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);

    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;

    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onerror = function(event) {
        throw new Error("NetworkError for: " + packageName);
      }
      xhr.onload = function(event) {
        if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
          var packageData = xhr.response;
          callback(packageData);
        } else {
          throw new Error(xhr.statusText + " : " + xhr.responseURL);
        }
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);
      Module['FS_createPath']('/', '', true, true);

      function DataRequest(start, end, crunched, audio) {
        this.start = start;
        this.end = end;
        this.crunched = crunched;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency']('fp ' + this.name);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

        },
        finish: function(byteArray) {
          var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      }
    };

    var files = metadata.files;
    for (i = 0; i < files.length; ++i) {
      new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
    }


    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    var IDB_RO = "readonly";
    var IDB_RW = "readwrite";
    var DB_NAME = "EM_PRELOAD_CACHE";
    var DB_VERSION = 1;
    var METADATA_STORE_NAME = 'METADATA';
    var PACKAGE_STORE_NAME = 'PACKAGES';
    function openDatabase(callback, errback) {
      try {
        var openRequest = indexedDB.open(DB_NAME, DB_VERSION);
      } catch (e) {
        return errback(e);
      }
      openRequest.onupgradeneeded = function(event) {
        var db = event.target.result;

        if(db.objectStoreNames.contains(PACKAGE_STORE_NAME)) {
          db.deleteObjectStore(PACKAGE_STORE_NAME);
        }
        var packages = db.createObjectStore(PACKAGE_STORE_NAME);

        if(db.objectStoreNames.contains(METADATA_STORE_NAME)) {
          db.deleteObjectStore(METADATA_STORE_NAME);
        }
        var metadata = db.createObjectStore(METADATA_STORE_NAME);
      };
      openRequest.onsuccess = function(event) {
        var db = event.target.result;
        callback(db);
      };
      openRequest.onerror = function(error) {
        errback(error);
      };
    };

    /* Check if there's a cached package, and if so whether it's the latest available */
    function checkCachedPackage(db, packageName, callback, errback) {
      var transaction = db.transaction([METADATA_STORE_NAME], IDB_RO);
      var metadata = transaction.objectStore(METADATA_STORE_NAME);

      var getRequest = metadata.get("metadata/" + packageName);
      getRequest.onsuccess = function(event) {
        var result = event.target.result;
        if (!result) {
          return callback(false);
        } else {
          return callback(PACKAGE_UUID === result.uuid);
        }
      };
      getRequest.onerror = function(error) {
        errback(error);
      };
    };

    function fetchCachedPackage(db, packageName, callback, errback) {
      var transaction = db.transaction([PACKAGE_STORE_NAME], IDB_RO);
      var packages = transaction.objectStore(PACKAGE_STORE_NAME);

      var getRequest = packages.get("package/" + packageName);
      getRequest.onsuccess = function(event) {
        var result = event.target.result;
        callback(result);
      };
      getRequest.onerror = function(error) {
        errback(error);
      };
    };

    function cacheRemotePackage(db, packageName, packageData, packageMeta, callback, errback) {
      var transaction_packages = db.transaction([PACKAGE_STORE_NAME], IDB_RW);
      var packages = transaction_packages.objectStore(PACKAGE_STORE_NAME);

      var putPackageRequest = packages.put(packageData, "package/" + packageName);
      putPackageRequest.onsuccess = function(event) {
        var transaction_metadata = db.transaction([METADATA_STORE_NAME], IDB_RW);
        var metadata = transaction_metadata.objectStore(METADATA_STORE_NAME);
        var putMetadataRequest = metadata.put(packageMeta, "metadata/" + packageName);
        putMetadataRequest.onsuccess = function(event) {
          callback(packageData);
        };
        putMetadataRequest.onerror = function(error) {
          errback(error);
        };
      };
      putPackageRequest.onerror = function(error) {
        errback(error);
      };
    };

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;

        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        if (Module['SPLIT_MEMORY']) Module.printErr('warning: you should run the file packager with --no-heap-copy when SPLIT_MEMORY is used, otherwise copying into the heap may fail due to the splitting');
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          DataRequest.prototype.requests[files[i].filename].onload();
        }
        Module['removeRunDependency']('datafile_game.data');

      };
      Module['addRunDependency']('datafile_game.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      function preloadFallback(error) {
        console.error(error);
        console.error('falling back to default preload behavior');
        fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, processPackageData, handleError);
      };

      openDatabase(
        function(db) {
          checkCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME,
            function(useCached) {
              Module.preloadResults[PACKAGE_NAME] = {fromCache: useCached};
              if (useCached) {
                console.info('loading ' + PACKAGE_NAME + ' from cache');
                fetchCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME, processPackageData, preloadFallback);
              } else {
                console.info('loading ' + PACKAGE_NAME + ' from remote');
                fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE,
                  function(packageData) {
                    cacheRemotePackage(db, PACKAGE_PATH + PACKAGE_NAME, packageData, {uuid:PACKAGE_UUID}, processPackageData,
                      function(error) {
                        console.error(error);
                        processPackageData(packageData);
                      });
                  }
                  , preloadFallback);
              }
            }
            , preloadFallback);
        }
        , preloadFallback);

      if (Module['setStatus']) Module['setStatus']('Downloading...');

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

  }
  loadPackage({"package_uuid":"71b5c8a2-3d4b-4688-973b-f2d6d9526ca6","remote_package_size":12450258,"files":[{"filename":"","crunched":0,"start":0,"end":279,"audio":false},{"filename":"","crunched":0,"start":279,"end":296,"audio":false},{"filename":"","crunched":0,"start":296,"end":612,"audio":false},{"filename":"","crunched":0,"start":612,"end":653,"audio":false},{"filename":"","crunched":0,"start":653,"end":694,"audio":false},{"filename":"","crunched":0,"start":694,"end":1120,"audio":false},{"filename":"","crunched":0,"start":1120,"end":1193,"audio":false},{"filename":"","crunched":0,"start":1193,"end":1671,"audio":false},{"filename":"","crunched":0,"start":1671,"end":2567,"audio":false},{"filename":"","crunched":0,"start":2567,"end":7293,"audio":false},{"filename":"","crunched":0,"start":7293,"end":7482,"audio":false},{"filename":"","crunched":0,"start":7482,"end":7906,"audio":false},{"filename":"","crunched":0,"start":7906,"end":9555,"audio":false},{"filename":"","crunched":0,"start":9555,"end":9971,"audio":false},{"filename":"","crunched":0,"start":9971,"end":11345,"audio":false},{"filename":"","crunched":0,"start":11345,"end":16243,"audio":false},{"filename":"","crunched":0,"start":16243,"end":16787,"audio":false},{"filename":"","crunched":0,"start":16787,"end":18279,"audio":false},{"filename":"","crunched":0,"start":18279,"end":21062,"audio":false},{"filename":"","crunched":0,"start":21062,"end":23370,"audio":false},{"filename":"","crunched":0,"start":23370,"end":27020,"audio":false},{"filename":"","crunched":0,"start":27020,"end":28988,"audio":false},{"filename":"","crunched":0,"start":28988,"end":29228,"audio":false},{"filename":"","crunched":0,"start":29228,"end":30592,"audio":false},{"filename":"","crunched":0,"start":30592,"end":30884,"audio":false},{"filename":"","crunched":0,"start":30884,"end":31216,"audio":false},{"filename":"","crunched":0,"start":31216,"end":31508,"audio":false},{"filename":"","crunched":0,"start":31508,"end":31677,"audio":false},{"filename":"","crunched":0,"start":31677,"end":31823,"audio":false},{"filename":"","crunched":0,"start":31823,"end":31962,"audio":false},{"filename":"","crunched":0,"start":31962,"end":32108,"audio":false},{"filename":"","crunched":0,"start":32108,"end":32149,"audio":false},{"filename":"","crunched":0,"start":32149,"end":32436,"audio":false},{"filename":"","crunched":0,"start":32436,"end":32509,"audio":false},{"filename":"","crunched":0,"start":32509,"end":32987,"audio":false},{"filename":"","crunched":0,"start":32987,"end":33883,"audio":false},{"filename":"","crunched":0,"start":33883,"end":38609,"audio":false},{"filename":"","crunched":0,"start":38609,"end":38798,"audio":false},{"filename":"","crunched":0,"start":38798,"end":39222,"audio":false},{"filename":"","crunched":0,"start":39222,"end":40871,"audio":false},{"filename":"","crunched":0,"start":40871,"end":41287,"audio":false},{"filename":"","crunched":0,"start":41287,"end":42661,"audio":false},{"filename":"","crunched":0,"start":42661,"end":47559,"audio":false},{"filename":"","crunched":0,"start":47559,"end":48103,"audio":false},{"filename":"","crunched":0,"start":48103,"end":49595,"audio":false},{"filename":"","crunched":0,"start":49595,"end":52378,"audio":false},{"filename":"","crunched":0,"start":52378,"end":54686,"audio":false},{"filename":"","crunched":0,"start":54686,"end":58336,"audio":false},{"filename":"","crunched":0,"start":58336,"end":58713,"audio":false},{"filename":"","crunched":0,"start":58713,"end":58953,"audio":false},{"filename":"","crunched":0,"start":58953,"end":59322,"audio":false},{"filename":"","crunched":0,"start":59322,"end":59496,"audio":false},{"filename":"","crunched":0,"start":59496,"end":59670,"audio":false},{"filename":"","crunched":0,"start":59670,"end":63430,"audio":false},{"filename":"","crunched":0,"start":63430,"end":84078,"audio":false},{"filename":"","crunched":0,"start":84078,"end":84514,"audio":false},{"filename":"","crunched":0,"start":84514,"end":84626,"audio":false},{"filename":"","crunched":0,"start":84626,"end":84667,"audio":false},{"filename":"","crunched":0,"start":84667,"end":84697,"audio":false},{"filename":"","crunched":0,"start":84697,"end":84936,"audio":false},{"filename":"","crunched":0,"start":84936,"end":85142,"audio":false},{"filename":"","crunched":0,"start":85142,"end":85732,"audio":false},{"filename":"","crunched":0,"start":85732,"end":86534,"audio":false},{"filename":"","crunched":0,"start":86534,"end":86751,"audio":false},{"filename":"","crunched":0,"start":86751,"end":86913,"audio":false},{"filename":"","crunched":0,"start":86913,"end":87151,"audio":false},{"filename":"","crunched":0,"start":87151,"end":97456,"audio":false},{"filename":"","crunched":0,"start":97456,"end":97665,"audio":false},{"filename":"","crunched":0,"start":97665,"end":98505,"audio":false},{"filename":"","crunched":0,"start":98505,"end":99307,"audio":false},{"filename":"","crunched":0,"start":99307,"end":99554,"audio":false},{"filename":"","crunched":0,"start":99554,"end":99795,"audio":false},{"filename":"","crunched":0,"start":99795,"end":100015,"audio":false},{"filename":"","crunched":0,"start":100015,"end":100711,"audio":false},{"filename":"","crunched":0,"start":100711,"end":100931,"audio":false},{"filename":"","crunched":0,"start":100931,"end":101151,"audio":false},{"filename":"","crunched":0,"start":101151,"end":102019,"audio":false},{"filename":"","crunched":0,"start":102019,"end":102179,"audio":false},{"filename":"","crunched":0,"start":102179,"end":102393,"audio":false},{"filename":"","crunched":0,"start":102393,"end":102629,"audio":false},{"filename":"","crunched":0,"start":102629,"end":102855,"audio":false},{"filename":"","crunched":0,"start":102855,"end":103091,"audio":false},{"filename":"","crunched":0,"start":103091,"end":103329,"audio":false},{"filename":"","crunched":0,"start":103329,"end":112153,"audio":false},{"filename":"","crunched":0,"start":112153,"end":122424,"audio":false},{"filename":"","crunched":0,"start":122424,"end":125454,"audio":false},{"filename":"","crunched":0,"start":125454,"end":126150,"audio":false},{"filename":"","crunched":0,"start":126150,"end":126638,"audio":false},{"filename":"","crunched":0,"start":126638,"end":127943,"audio":false},{"filename":"","crunched":0,"start":127943,"end":128178,"audio":false},{"filename":"","crunched":0,"start":128178,"end":128925,"audio":false},{"filename":"","crunched":0,"start":128925,"end":129529,"audio":false},{"filename":"","crunched":0,"start":129529,"end":129749,"audio":false},{"filename":"","crunched":0,"start":129749,"end":130358,"audio":false},{"filename":"","crunched":0,"start":130358,"end":131160,"audio":false},{"filename":"","crunched":0,"start":131160,"end":131420,"audio":false},{"filename":"","crunched":0,"start":131420,"end":131658,"audio":false},{"filename":"","crunched":0,"start":131658,"end":131878,"audio":false},{"filename":"","crunched":0,"start":131878,"end":132105,"audio":false},{"filename":"","crunched":0,"start":132105,"end":138428,"audio":false},{"filename":"","crunched":0,"start":138428,"end":230848,"audio":false},{"filename":"","crunched":0,"start":230848,"end":231068,"audio":false},{"filename":"","crunched":0,"start":231068,"end":231288,"audio":false},{"filename":"","crunched":0,"start":231288,"end":231344,"audio":false},{"filename":"","crunched":0,"start":231344,"end":231810,"audio":false},{"filename":"","crunched":0,"start":231810,"end":232497,"audio":false},{"filename":"","crunched":0,"start":232497,"end":242799,"audio":false},{"filename":"","crunched":0,"start":242799,"end":243019,"audio":false},{"filename":"","crunched":0,"start":243019,"end":243234,"audio":false},{"filename":"","crunched":0,"start":243234,"end":243303,"audio":false},{"filename":"","crunched":0,"start":243303,"end":244050,"audio":false},{"filename":"","crunched":0,"start":244050,"end":244276,"audio":false},{"filename":"","crunched":0,"start":244276,"end":255977,"audio":false},{"filename":"","crunched":0,"start":255977,"end":256575,"audio":false},{"filename":"","crunched":0,"start":256575,"end":257416,"audio":false},{"filename":"","crunched":0,"start":257416,"end":257644,"audio":false},{"filename":"","crunched":0,"start":257644,"end":257883,"audio":false},{"filename":"","crunched":0,"start":257883,"end":258103,"audio":false},{"filename":"","crunched":0,"start":258103,"end":258945,"audio":false},{"filename":"","crunched":0,"start":258945,"end":259744,"audio":false},{"filename":"","crunched":0,"start":259744,"end":261859,"audio":false},{"filename":"","crunched":0,"start":261859,"end":271202,"audio":false},{"filename":"","crunched":0,"start":271202,"end":271521,"audio":false},{"filename":"","crunched":0,"start":271521,"end":271759,"audio":false},{"filename":"","crunched":0,"start":271759,"end":272006,"audio":false},{"filename":"","crunched":0,"start":272006,"end":272847,"audio":false},{"filename":"","crunched":0,"start":272847,"end":273078,"audio":false},{"filename":"","crunched":0,"start":273078,"end":273880,"audio":false},{"filename":"","crunched":0,"start":273880,"end":274117,"audio":false},{"filename":"","crunched":0,"start":274117,"end":274280,"audio":false},{"filename":"","crunched":0,"start":274280,"end":274500,"audio":false},{"filename":"","crunched":0,"start":274500,"end":284938,"audio":false},{"filename":"","crunched":0,"start":284938,"end":285177,"audio":false},{"filename":"","crunched":0,"start":285177,"end":285397,"audio":false},{"filename":"","crunched":0,"start":285397,"end":285617,"audio":false},{"filename":"","crunched":0,"start":285617,"end":285941,"audio":false},{"filename":"","crunched":0,"start":285941,"end":297081,"audio":false},{"filename":"","crunched":0,"start":297081,"end":297360,"audio":false},{"filename":"","crunched":0,"start":297360,"end":297684,"audio":false},{"filename":"","crunched":0,"start":297684,"end":298511,"audio":false},{"filename":"","crunched":0,"start":298511,"end":307702,"audio":false},{"filename":"","crunched":0,"start":307702,"end":307717,"audio":false},{"filename":"","crunched":0,"start":307717,"end":308558,"audio":false},{"filename":"","crunched":0,"start":308558,"end":310045,"audio":false},{"filename":"","crunched":0,"start":310045,"end":310275,"audio":false},{"filename":"","crunched":0,"start":310275,"end":310495,"audio":false},{"filename":"","crunched":0,"start":310495,"end":310742,"audio":false},{"filename":"","crunched":0,"start":310742,"end":310779,"audio":false},{"filename":"","crunched":0,"start":310779,"end":314480,"audio":false},{"filename":"","crunched":0,"start":314480,"end":314727,"audio":false},{"filename":"","crunched":0,"start":314727,"end":315342,"audio":false},{"filename":"","crunched":0,"start":315342,"end":316059,"audio":false},{"filename":"","crunched":0,"start":316059,"end":318979,"audio":false},{"filename":"","crunched":0,"start":318979,"end":429830,"audio":false},{"filename":"","crunched":0,"start":429830,"end":430146,"audio":false},{"filename":"","crunched":0,"start":430146,"end":430416,"audio":false},{"filename":"","crunched":0,"start":430416,"end":430457,"audio":false},{"filename":"","crunched":0,"start":430457,"end":430498,"audio":false},{"filename":"","crunched":0,"start":430498,"end":430539,"audio":false},{"filename":"","crunched":0,"start":430539,"end":430580,"audio":false},{"filename":"","crunched":0,"start":430580,"end":430621,"audio":false},{"filename":"","crunched":0,"start":430621,"end":430662,"audio":false},{"filename":"","crunched":0,"start":430662,"end":430703,"audio":false},{"filename":"","crunched":0,"start":430703,"end":430744,"audio":false},{"filename":"","crunched":0,"start":430744,"end":430785,"audio":false},{"filename":"","crunched":0,"start":430785,"end":430826,"audio":false},{"filename":"","crunched":0,"start":430826,"end":430867,"audio":false},{"filename":"","crunched":0,"start":430867,"end":430908,"audio":false},{"filename":"","crunched":0,"start":430908,"end":430949,"audio":false},{"filename":"","crunched":0,"start":430949,"end":430990,"audio":false},{"filename":"","crunched":0,"start":430990,"end":431031,"audio":false},{"filename":"","crunched":0,"start":431031,"end":431072,"audio":false},{"filename":"","crunched":0,"start":431072,"end":431113,"audio":false},{"filename":"","crunched":0,"start":431113,"end":431154,"audio":false},{"filename":"","crunched":0,"start":431154,"end":431195,"audio":false},{"filename":"","crunched":0,"start":431195,"end":431236,"audio":false},{"filename":"","crunched":0,"start":431236,"end":431277,"audio":false},{"filename":"","crunched":0,"start":431277,"end":431318,"audio":false},{"filename":"","crunched":0,"start":431318,"end":431359,"audio":false},{"filename":"","crunched":0,"start":431359,"end":431400,"audio":false},{"filename":"","crunched":0,"start":431400,"end":431441,"audio":false},{"filename":"","crunched":0,"start":431441,"end":431482,"audio":false},{"filename":"","crunched":0,"start":431482,"end":431523,"audio":false},{"filename":"","crunched":0,"start":431523,"end":431564,"audio":false},{"filename":"","crunched":0,"start":431564,"end":431605,"audio":false},{"filename":"","crunched":0,"start":431605,"end":431646,"audio":false},{"filename":"","crunched":0,"start":431646,"end":431687,"audio":false},{"filename":"","crunched":0,"start":431687,"end":431728,"audio":false},{"filename":"","crunched":0,"start":431728,"end":431769,"audio":false},{"filename":"","crunched":0,"start":431769,"end":431810,"audio":false},{"filename":"","crunched":0,"start":431810,"end":431851,"audio":false},{"filename":"","crunched":0,"start":431851,"end":431892,"audio":false},{"filename":"","crunched":0,"start":431892,"end":431933,"audio":false},{"filename":"","crunched":0,"start":431933,"end":431974,"audio":false},{"filename":"","crunched":0,"start":431974,"end":432015,"audio":false},{"filename":"","crunched":0,"start":432015,"end":432056,"audio":false},{"filename":"","crunched":0,"start":432056,"end":432097,"audio":false},{"filename":"","crunched":0,"start":432097,"end":432138,"audio":false},{"filename":"","crunched":0,"start":432138,"end":432179,"audio":false},{"filename":"","crunched":0,"start":432179,"end":432220,"audio":false},{"filename":"","crunched":0,"start":432220,"end":432261,"audio":false},{"filename":"","crunched":0,"start":432261,"end":432302,"audio":false},{"filename":"","crunched":0,"start":432302,"end":432343,"audio":false},{"filename":"","crunched":0,"start":432343,"end":432384,"audio":false},{"filename":"","crunched":0,"start":432384,"end":432425,"audio":false},{"filename":"","crunched":0,"start":432425,"end":432466,"audio":false},{"filename":"","crunched":0,"start":432466,"end":432496,"audio":false},{"filename":"","crunched":0,"start":432496,"end":432537,"audio":false},{"filename":"","crunched":0,"start":432537,"end":432578,"audio":false},{"filename":"","crunched":0,"start":432578,"end":432619,"audio":false},{"filename":"","crunched":0,"start":432619,"end":438281,"audio":false},{"filename":"","crunched":0,"start":438281,"end":438302,"audio":false},{"filename":"","crunched":0,"start":438302,"end":438385,"audio":false},{"filename":"","crunched":0,"start":438385,"end":438388,"audio":false},{"filename":"","crunched":0,"start":438388,"end":438495,"audio":false},{"filename":"","crunched":0,"start":438495,"end":438561,"audio":false},{"filename":"","crunched":0,"start":438561,"end":438627,"audio":false},{"filename":"","crunched":0,"start":438627,"end":438693,"audio":false},{"filename":"","crunched":0,"start":438693,"end":438759,"audio":false},{"filename":"","crunched":0,"start":438759,"end":438825,"audio":false},{"filename":"","crunched":0,"start":438825,"end":438891,"audio":false},{"filename":"","crunched":0,"start":438891,"end":438957,"audio":false},{"filename":"","crunched":0,"start":438957,"end":439023,"audio":false},{"filename":"","crunched":0,"start":439023,"end":439089,"audio":false},{"filename":"","crunched":0,"start":439089,"end":439155,"audio":false},{"filename":"","crunched":0,"start":439155,"end":439221,"audio":false},{"filename":"","crunched":0,"start":439221,"end":439287,"audio":false},{"filename":"","crunched":0,"start":439287,"end":439353,"audio":false},{"filename":"","crunched":0,"start":439353,"end":439419,"audio":false},{"filename":"","crunched":0,"start":439419,"end":439485,"audio":false},{"filename":"","crunched":0,"start":439485,"end":439551,"audio":false},{"filename":"","crunched":0,"start":439551,"end":439617,"audio":false},{"filename":"","crunched":0,"start":439617,"end":439683,"audio":false},{"filename":"","crunched":0,"start":439683,"end":439749,"audio":false},{"filename":"","crunched":0,"start":439749,"end":439815,"audio":false},{"filename":"","crunched":0,"start":439815,"end":439881,"audio":false},{"filename":"","crunched":0,"start":439881,"end":439947,"audio":false},{"filename":"","crunched":0,"start":439947,"end":440013,"audio":false},{"filename":"","crunched":0,"start":440013,"end":440079,"audio":false},{"filename":"","crunched":0,"start":440079,"end":440145,"audio":false},{"filename":"","crunched":0,"start":440145,"end":440211,"audio":false},{"filename":"","crunched":0,"start":440211,"end":440277,"audio":false},{"filename":"","crunched":0,"start":440277,"end":440343,"audio":false},{"filename":"","crunched":0,"start":440343,"end":440409,"audio":false},{"filename":"","crunched":0,"start":440409,"end":440475,"audio":false},{"filename":"","crunched":0,"start":440475,"end":440541,"audio":false},{"filename":"","crunched":0,"start":440541,"end":440607,"audio":false},{"filename":"","crunched":0,"start":440607,"end":440673,"audio":false},{"filename":"","crunched":0,"start":440673,"end":440739,"audio":false},{"filename":"","crunched":0,"start":440739,"end":440805,"audio":false},{"filename":"","crunched":0,"start":440805,"end":440871,"audio":false},{"filename":"","crunched":0,"start":440871,"end":440937,"audio":false},{"filename":"","crunched":0,"start":440937,"end":441065,"audio":false},{"filename":"","crunched":0,"start":441065,"end":441193,"audio":false},{"filename":"","crunched":0,"start":441193,"end":441321,"audio":false},{"filename":"","crunched":0,"start":441321,"end":441449,"audio":false},{"filename":"","crunched":0,"start":441449,"end":441577,"audio":false},{"filename":"","crunched":0,"start":441577,"end":441705,"audio":false},{"filename":"","crunched":0,"start":441705,"end":441833,"audio":false},{"filename":"","crunched":0,"start":441833,"end":441961,"audio":false},{"filename":"","crunched":0,"start":441961,"end":442089,"audio":false},{"filename":"","crunched":0,"start":442089,"end":442217,"audio":false},{"filename":"","crunched":0,"start":442217,"end":442345,"audio":false},{"filename":"","crunched":0,"start":442345,"end":442473,"audio":false},{"filename":"","crunched":0,"start":442473,"end":442601,"audio":false},{"filename":"","crunched":0,"start":442601,"end":442729,"audio":false},{"filename":"","crunched":0,"start":442729,"end":442857,"audio":false},{"filename":"","crunched":0,"start":442857,"end":442985,"audio":false},{"filename":"","crunched":0,"start":442985,"end":443113,"audio":false},{"filename":"","crunched":0,"start":443113,"end":443241,"audio":false},{"filename":"","crunched":0,"start":443241,"end":443369,"audio":false},{"filename":"","crunched":0,"start":443369,"end":443497,"audio":false},{"filename":"","crunched":0,"start":443497,"end":443625,"audio":false},{"filename":"","crunched":0,"start":443625,"end":443753,"audio":false},{"filename":"","crunched":0,"start":443753,"end":443881,"audio":false},{"filename":"","crunched":0,"start":443881,"end":444009,"audio":false},{"filename":"","crunched":0,"start":444009,"end":444137,"audio":false},{"filename":"","crunched":0,"start":444137,"end":444265,"audio":false},{"filename":"","crunched":0,"start":444265,"end":444393,"audio":false},{"filename":"","crunched":0,"start":444393,"end":444521,"audio":false},{"filename":"","crunched":0,"start":444521,"end":444649,"audio":false},{"filename":"","crunched":0,"start":444649,"end":444777,"audio":false},{"filename":"","crunched":0,"start":444777,"end":444905,"audio":false},{"filename":"","crunched":0,"start":444905,"end":445033,"audio":false},{"filename":"","crunched":0,"start":445033,"end":445161,"audio":false},{"filename":"","crunched":0,"start":445161,"end":445289,"audio":false},{"filename":"","crunched":0,"start":445289,"end":445417,"audio":false},{"filename":"","crunched":0,"start":445417,"end":445545,"audio":false},{"filename":"","crunched":0,"start":445545,"end":445673,"audio":false},{"filename":"","crunched":0,"start":445673,"end":445933,"audio":false},{"filename":"","crunched":0,"start":445933,"end":446325,"audio":false},{"filename":"","crunched":0,"start":446325,"end":446537,"audio":false},{"filename":"","crunched":0,"start":446537,"end":446949,"audio":false},{"filename":"","crunched":0,"start":446949,"end":448053,"audio":false},{"filename":"","crunched":0,"start":448053,"end":448357,"audio":false},{"filename":"","crunched":0,"start":448357,"end":450109,"audio":false},{"filename":"","crunched":0,"start":450109,"end":450321,"audio":false},{"filename":"","crunched":0,"start":450321,"end":450625,"audio":false},{"filename":"","crunched":0,"start":450625,"end":450885,"audio":false},{"filename":"","crunched":0,"start":450885,"end":451189,"audio":false},{"filename":"","crunched":0,"start":451189,"end":451401,"audio":false},{"filename":"","crunched":0,"start":451401,"end":451661,"audio":false},{"filename":"","crunched":0,"start":451661,"end":451873,"audio":false},{"filename":"","crunched":0,"start":451873,"end":452133,"audio":false},{"filename":"","crunched":0,"start":452133,"end":452525,"audio":false},{"filename":"","crunched":0,"start":452525,"end":452737,"audio":false},{"filename":"","crunched":0,"start":452737,"end":453509,"audio":false},{"filename":"","crunched":0,"start":453509,"end":453653,"audio":false},{"filename":"","crunched":0,"start":453653,"end":454197,"audio":false},{"filename":"","crunched":0,"start":454197,"end":454457,"audio":false},{"filename":"","crunched":0,"start":454457,"end":454669,"audio":false},{"filename":"","crunched":0,"start":454669,"end":454881,"audio":false},{"filename":"","crunched":0,"start":454881,"end":455441,"audio":false},{"filename":"","crunched":0,"start":455441,"end":455653,"audio":false},{"filename":"","crunched":0,"start":455653,"end":455865,"audio":false},{"filename":"","crunched":0,"start":455865,"end":456077,"audio":false},{"filename":"","crunched":0,"start":456077,"end":456337,"audio":false},{"filename":"","crunched":0,"start":456337,"end":456549,"audio":false},{"filename":"","crunched":0,"start":456549,"end":456809,"audio":false},{"filename":"","crunched":0,"start":456809,"end":457021,"audio":false},{"filename":"","crunched":0,"start":457021,"end":457105,"audio":false},{"filename":"","crunched":0,"start":457105,"end":457409,"audio":false},{"filename":"","crunched":0,"start":457409,"end":457416,"audio":false},{"filename":"","crunched":0,"start":457416,"end":457416,"audio":false},{"filename":"","crunched":0,"start":457416,"end":457437,"audio":false},{"filename":"","crunched":0,"start":457437,"end":457752,"audio":false},{"filename":"","crunched":0,"start":457752,"end":458028,"audio":false},{"filename":"","crunched":0,"start":458028,"end":458302,"audio":false},{"filename":"","crunched":0,"start":458302,"end":458549,"audio":false},{"filename":"","crunched":0,"start":458549,"end":458796,"audio":false},{"filename":"","crunched":0,"start":458796,"end":459090,"audio":false},{"filename":"","crunched":0,"start":459090,"end":459377,"audio":false},{"filename":"","crunched":0,"start":459377,"end":459692,"audio":false},{"filename":"","crunched":0,"start":459692,"end":460007,"audio":false},{"filename":"","crunched":0,"start":460007,"end":460322,"audio":false},{"filename":"","crunched":0,"start":460322,"end":460598,"audio":false},{"filename":"","crunched":0,"start":460598,"end":460911,"audio":false},{"filename":"","crunched":0,"start":460911,"end":461226,"audio":false},{"filename":"","crunched":0,"start":461226,"end":461539,"audio":false},{"filename":"","crunched":0,"start":461539,"end":461820,"audio":false},{"filename":"","crunched":0,"start":461820,"end":462102,"audio":false},{"filename":"","crunched":0,"start":462102,"end":462449,"audio":false},{"filename":"","crunched":0,"start":462449,"end":462764,"audio":false},{"filename":"","crunched":0,"start":462764,"end":463011,"audio":false},{"filename":"","crunched":0,"start":463011,"end":463313,"audio":false},{"filename":"","crunched":0,"start":463313,"end":463540,"audio":false},{"filename":"","crunched":0,"start":463540,"end":463855,"audio":false},{"filename":"","crunched":0,"start":463855,"end":464131,"audio":false},{"filename":"","crunched":0,"start":464131,"end":464382,"audio":false},{"filename":"","crunched":0,"start":464382,"end":464658,"audio":false},{"filename":"","crunched":0,"start":464658,"end":464983,"audio":false},{"filename":"","crunched":0,"start":464983,"end":465230,"audio":false},{"filename":"","crunched":0,"start":465230,"end":465468,"audio":false},{"filename":"","crunched":0,"start":465468,"end":465744,"audio":false},{"filename":"","crunched":0,"start":465744,"end":466025,"audio":false},{"filename":"","crunched":0,"start":466025,"end":466338,"audio":false},{"filename":"","crunched":0,"start":466338,"end":466651,"audio":false},{"filename":"","crunched":0,"start":466651,"end":466897,"audio":false},{"filename":"","crunched":0,"start":466897,"end":467144,"audio":false},{"filename":"","crunched":0,"start":467144,"end":467459,"audio":false},{"filename":"","crunched":0,"start":467459,"end":467786,"audio":false},{"filename":"","crunched":0,"start":467786,"end":467801,"audio":false},{"filename":"","crunched":0,"start":467801,"end":468548,"audio":false},{"filename":"","crunched":0,"start":468548,"end":469295,"audio":false},{"filename":"","crunched":0,"start":469295,"end":470353,"audio":false},{"filename":"","crunched":0,"start":470353,"end":471411,"audio":false},{"filename":"","crunched":0,"start":471411,"end":472638,"audio":false},{"filename":"","crunched":0,"start":472638,"end":473385,"audio":false},{"filename":"","crunched":0,"start":473385,"end":474132,"audio":false},{"filename":"","crunched":0,"start":474132,"end":474879,"audio":false},{"filename":"","crunched":0,"start":474879,"end":475626,"audio":false},{"filename":"","crunched":0,"start":475626,"end":476373,"audio":false},{"filename":"","crunched":0,"start":476373,"end":477120,"audio":false},{"filename":"","crunched":0,"start":477120,"end":477867,"audio":false},{"filename":"","crunched":0,"start":477867,"end":478614,"audio":false},{"filename":"","crunched":0,"start":478614,"end":479518,"audio":false},{"filename":"","crunched":0,"start":479518,"end":480265,"audio":false},{"filename":"","crunched":0,"start":480265,"end":481012,"audio":false},{"filename":"","crunched":0,"start":481012,"end":481759,"audio":false},{"filename":"","crunched":0,"start":481759,"end":482506,"audio":false},{"filename":"","crunched":0,"start":482506,"end":483564,"audio":false},{"filename":"","crunched":0,"start":483564,"end":484311,"audio":false},{"filename":"","crunched":0,"start":484311,"end":484374,"audio":false},{"filename":"","crunched":0,"start":484374,"end":485121,"audio":false},{"filename":"","crunched":0,"start":485121,"end":486179,"audio":false},{"filename":"","crunched":0,"start":486179,"end":487546,"audio":false},{"filename":"","crunched":0,"start":487546,"end":488604,"audio":false},{"filename":"","crunched":0,"start":488604,"end":489351,"audio":false},{"filename":"","crunched":0,"start":489351,"end":490098,"audio":false},{"filename":"","crunched":0,"start":490098,"end":491134,"audio":false},{"filename":"","crunched":0,"start":491134,"end":492192,"audio":false},{"filename":"","crunched":0,"start":492192,"end":493096,"audio":false},{"filename":"","crunched":0,"start":493096,"end":493843,"audio":false},{"filename":"","crunched":0,"start":493843,"end":494590,"audio":false},{"filename":"","crunched":0,"start":494590,"end":495817,"audio":false},{"filename":"","crunched":0,"start":495817,"end":496875,"audio":false},{"filename":"","crunched":0,"start":496875,"end":497622,"audio":false},{"filename":"","crunched":0,"start":497622,"end":498369,"audio":false},{"filename":"","crunched":0,"start":498369,"end":498637,"audio":false},{"filename":"","crunched":0,"start":498637,"end":498971,"audio":false},{"filename":"","crunched":0,"start":498971,"end":500519,"audio":false},{"filename":"","crunched":0,"start":500519,"end":500721,"audio":false},{"filename":"","crunched":0,"start":500721,"end":500989,"audio":false},{"filename":"","crunched":0,"start":500989,"end":501745,"audio":false},{"filename":"","crunched":0,"start":501745,"end":502079,"audio":false},{"filename":"","crunched":0,"start":502079,"end":502523,"audio":false},{"filename":"","crunched":0,"start":502523,"end":502531,"audio":false},{"filename":"","crunched":0,"start":502531,"end":502733,"audio":false},{"filename":"","crunched":0,"start":502733,"end":502935,"audio":false},{"filename":"","crunched":0,"start":502935,"end":503137,"audio":false},{"filename":"","crunched":0,"start":503137,"end":503405,"audio":false},{"filename":"","crunched":0,"start":503405,"end":504047,"audio":false},{"filename":"","crunched":0,"start":504047,"end":504359,"audio":false},{"filename":"","crunched":0,"start":504359,"end":504671,"audio":false},{"filename":"","crunched":0,"start":504671,"end":504873,"audio":false},{"filename":"","crunched":0,"start":504873,"end":505075,"audio":false},{"filename":"","crunched":0,"start":505075,"end":505321,"audio":false},{"filename":"","crunched":0,"start":505321,"end":505567,"audio":false},{"filename":"","crunched":0,"start":505567,"end":506011,"audio":false},{"filename":"","crunched":0,"start":506011,"end":506477,"audio":false},{"filename":"","crunched":0,"start":506477,"end":506657,"audio":false},{"filename":"","crunched":0,"start":506657,"end":506859,"audio":false},{"filename":"","crunched":0,"start":506859,"end":507809,"audio":false},{"filename":"","crunched":0,"start":507809,"end":508143,"audio":false},{"filename":"","crunched":0,"start":508143,"end":508345,"audio":false},{"filename":"","crunched":0,"start":508345,"end":508547,"audio":false},{"filename":"","crunched":0,"start":508547,"end":508859,"audio":false},{"filename":"","crunched":0,"start":508859,"end":509127,"audio":false},{"filename":"","crunched":0,"start":509127,"end":511951,"audio":false},{"filename":"","crunched":0,"start":511951,"end":512219,"audio":false},{"filename":"","crunched":0,"start":512219,"end":512839,"audio":false},{"filename":"","crunched":0,"start":512839,"end":513085,"audio":false},{"filename":"","crunched":0,"start":513085,"end":513287,"audio":false},{"filename":"","crunched":0,"start":513287,"end":513489,"audio":false},{"filename":"","crunched":0,"start":513489,"end":513541,"audio":false},{"filename":"","crunched":0,"start":513541,"end":513985,"audio":false},{"filename":"","crunched":0,"start":513985,"end":514187,"audio":false},{"filename":"","crunched":0,"start":514187,"end":514367,"audio":false},{"filename":"","crunched":0,"start":514367,"end":514547,"audio":false},{"filename":"","crunched":0,"start":514547,"end":514749,"audio":false},{"filename":"","crunched":0,"start":514749,"end":515391,"audio":false},{"filename":"","crunched":0,"start":515391,"end":515615,"audio":false},{"filename":"","crunched":0,"start":515615,"end":515817,"audio":false},{"filename":"","crunched":0,"start":515817,"end":516063,"audio":false},{"filename":"","crunched":0,"start":516063,"end":516063,"audio":false},{"filename":"","crunched":0,"start":516063,"end":516076,"audio":false},{"filename":"","crunched":0,"start":516076,"end":516079,"audio":false},{"filename":"","crunched":0,"start":516079,"end":516086,"audio":false},{"filename":"","crunched":0,"start":516086,"end":516161,"audio":false},{"filename":"","crunched":0,"start":516161,"end":516863,"audio":false},{"filename":"","crunched":0,"start":516863,"end":516868,"audio":false},{"filename":"","crunched":0,"start":516868,"end":517390,"audio":false},{"filename":"","crunched":0,"start":517390,"end":524462,"audio":false},{"filename":"","crunched":0,"start":524462,"end":525532,"audio":false},{"filename":"","crunched":0,"start":525532,"end":527577,"audio":false},{"filename":"","crunched":0,"start":527577,"end":529113,"audio":false},{"filename":"","crunched":0,"start":529113,"end":530268,"audio":false},{"filename":"","crunched":0,"start":530268,"end":530780,"audio":false},{"filename":"","crunched":0,"start":530780,"end":531191,"audio":false},{"filename":"","crunched":0,"start":531191,"end":542038,"audio":false},{"filename":"","crunched":0,"start":542038,"end":643984,"audio":false},{"filename":"","crunched":0,"start":643984,"end":644443,"audio":false},{"filename":"","crunched":0,"start":644443,"end":651124,"audio":false},{"filename":"","crunched":0,"start":651124,"end":7274591,"audio":false},{"filename":"","crunched":0,"start":7274591,"end":7327566,"audio":false},{"filename":"","crunched":0,"start":7327566,"end":7332450,"audio":false},{"filename":"","crunched":0,"start":7332450,"end":7657904,"audio":false},{"filename":"","crunched":0,"start":7657904,"end":12378630,"audio":false},{"filename":"","crunched":0,"start":12378630,"end":12382053,"audio":false},{"filename":"","crunched":0,"start":12382053,"end":12389214,"audio":false},{"filename":"","crunched":0,"start":12389214,"end":12390074,"audio":false},{"filename":"","crunched":0,"start":12390074,"end":12426617,"audio":false},{"filename":"","crunched":0,"start":12426617,"end":12427177,"audio":false},{"filename":"","crunched":0,"start":12427177,"end":12430514,"audio":false},{"filename":"","crunched":0,"start":12430514,"end":12431650,"audio":false},{"filename":"","crunched":0,"start":12431650,"end":12435046,"audio":false},{"filename":"","crunched":0,"start":12435046,"end":12435578,"audio":false},{"filename":"","crunched":0,"start":12435578,"end":12436515,"audio":false},{"filename":"","crunched":0,"start":12436515,"end":12436547,"audio":false},{"filename":"","crunched":0,"start":12436547,"end":12436554,"audio":false},{"filename":"","crunched":0,"start":12436554,"end":12437653,"audio":false},{"filename":"","crunched":0,"start":12437653,"end":12442013,"audio":false},{"filename":"","crunched":0,"start":12442013,"end":12448576,"audio":false},{"filename":"","crunched":0,"start":12448576,"end":12449684,"audio":false},{"filename":"","crunched":0,"start":12449684,"end":12450150,"audio":false},{"filename":"","crunched":0,"start":12450150,"end":12450258,"audio":false}]});

})();
