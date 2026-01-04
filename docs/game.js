
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
  loadPackage({"package_uuid":"44305920-fd56-4732-87c3-e7210e66ac98","remote_package_size":27075291,"files":[{"filename":"","crunched":0,"start":0,"end":279,"audio":false},{"filename":"","crunched":0,"start":279,"end":296,"audio":false},{"filename":"","crunched":0,"start":296,"end":612,"audio":false},{"filename":"","crunched":0,"start":612,"end":653,"audio":false},{"filename":"","crunched":0,"start":653,"end":694,"audio":false},{"filename":"","crunched":0,"start":694,"end":1120,"audio":false},{"filename":"","crunched":0,"start":1120,"end":1193,"audio":false},{"filename":"","crunched":0,"start":1193,"end":1671,"audio":false},{"filename":"","crunched":0,"start":1671,"end":2567,"audio":false},{"filename":"","crunched":0,"start":2567,"end":7293,"audio":false},{"filename":"","crunched":0,"start":7293,"end":7482,"audio":false},{"filename":"","crunched":0,"start":7482,"end":7906,"audio":false},{"filename":"","crunched":0,"start":7906,"end":9555,"audio":false},{"filename":"","crunched":0,"start":9555,"end":9971,"audio":false},{"filename":"","crunched":0,"start":9971,"end":11345,"audio":false},{"filename":"","crunched":0,"start":11345,"end":16243,"audio":false},{"filename":"","crunched":0,"start":16243,"end":16787,"audio":false},{"filename":"","crunched":0,"start":16787,"end":18279,"audio":false},{"filename":"","crunched":0,"start":18279,"end":21062,"audio":false},{"filename":"","crunched":0,"start":21062,"end":23370,"audio":false},{"filename":"","crunched":0,"start":23370,"end":27020,"audio":false},{"filename":"","crunched":0,"start":27020,"end":29724,"audio":false},{"filename":"","crunched":0,"start":29724,"end":29964,"audio":false},{"filename":"","crunched":0,"start":29964,"end":31474,"audio":false},{"filename":"","crunched":0,"start":31474,"end":31766,"audio":false},{"filename":"","crunched":0,"start":31766,"end":32098,"audio":false},{"filename":"","crunched":0,"start":32098,"end":32682,"audio":false},{"filename":"","crunched":0,"start":32682,"end":32974,"audio":false},{"filename":"","crunched":0,"start":32974,"end":33143,"audio":false},{"filename":"","crunched":0,"start":33143,"end":33289,"audio":false},{"filename":"","crunched":0,"start":33289,"end":33428,"audio":false},{"filename":"","crunched":0,"start":33428,"end":33574,"audio":false},{"filename":"","crunched":0,"start":33574,"end":33720,"audio":false},{"filename":"","crunched":0,"start":33720,"end":33761,"audio":false},{"filename":"","crunched":0,"start":33761,"end":34048,"audio":false},{"filename":"","crunched":0,"start":34048,"end":34121,"audio":false},{"filename":"","crunched":0,"start":34121,"end":34599,"audio":false},{"filename":"","crunched":0,"start":34599,"end":35495,"audio":false},{"filename":"","crunched":0,"start":35495,"end":40221,"audio":false},{"filename":"","crunched":0,"start":40221,"end":40410,"audio":false},{"filename":"","crunched":0,"start":40410,"end":40834,"audio":false},{"filename":"","crunched":0,"start":40834,"end":42483,"audio":false},{"filename":"","crunched":0,"start":42483,"end":42899,"audio":false},{"filename":"","crunched":0,"start":42899,"end":44273,"audio":false},{"filename":"","crunched":0,"start":44273,"end":49171,"audio":false},{"filename":"","crunched":0,"start":49171,"end":49715,"audio":false},{"filename":"","crunched":0,"start":49715,"end":51207,"audio":false},{"filename":"","crunched":0,"start":51207,"end":53990,"audio":false},{"filename":"","crunched":0,"start":53990,"end":56298,"audio":false},{"filename":"","crunched":0,"start":56298,"end":59948,"audio":false},{"filename":"","crunched":0,"start":59948,"end":60325,"audio":false},{"filename":"","crunched":0,"start":60325,"end":60565,"audio":false},{"filename":"","crunched":0,"start":60565,"end":60934,"audio":false},{"filename":"","crunched":0,"start":60934,"end":61108,"audio":false},{"filename":"","crunched":0,"start":61108,"end":61282,"audio":false},{"filename":"","crunched":0,"start":61282,"end":65042,"audio":false},{"filename":"","crunched":0,"start":65042,"end":85690,"audio":false},{"filename":"","crunched":0,"start":85690,"end":86126,"audio":false},{"filename":"","crunched":0,"start":86126,"end":86238,"audio":false},{"filename":"","crunched":0,"start":86238,"end":86279,"audio":false},{"filename":"","crunched":0,"start":86279,"end":86309,"audio":false},{"filename":"","crunched":0,"start":86309,"end":86548,"audio":false},{"filename":"","crunched":0,"start":86548,"end":86754,"audio":false},{"filename":"","crunched":0,"start":86754,"end":87344,"audio":false},{"filename":"","crunched":0,"start":87344,"end":88146,"audio":false},{"filename":"","crunched":0,"start":88146,"end":97875,"audio":false},{"filename":"","crunched":0,"start":97875,"end":98092,"audio":false},{"filename":"","crunched":0,"start":98092,"end":98254,"audio":false},{"filename":"","crunched":0,"start":98254,"end":98492,"audio":false},{"filename":"","crunched":0,"start":98492,"end":98712,"audio":false},{"filename":"","crunched":0,"start":98712,"end":109017,"audio":false},{"filename":"","crunched":0,"start":109017,"end":109226,"audio":false},{"filename":"","crunched":0,"start":109226,"end":110066,"audio":false},{"filename":"","crunched":0,"start":110066,"end":110868,"audio":false},{"filename":"","crunched":0,"start":110868,"end":111115,"audio":false},{"filename":"","crunched":0,"start":111115,"end":111356,"audio":false},{"filename":"","crunched":0,"start":111356,"end":111576,"audio":false},{"filename":"","crunched":0,"start":111576,"end":111825,"audio":false},{"filename":"","crunched":0,"start":111825,"end":112521,"audio":false},{"filename":"","crunched":0,"start":112521,"end":112741,"audio":false},{"filename":"","crunched":0,"start":112741,"end":112961,"audio":false},{"filename":"","crunched":0,"start":112961,"end":113829,"audio":false},{"filename":"","crunched":0,"start":113829,"end":113989,"audio":false},{"filename":"","crunched":0,"start":113989,"end":114203,"audio":false},{"filename":"","crunched":0,"start":114203,"end":114439,"audio":false},{"filename":"","crunched":0,"start":114439,"end":114665,"audio":false},{"filename":"","crunched":0,"start":114665,"end":114901,"audio":false},{"filename":"","crunched":0,"start":114901,"end":115139,"audio":false},{"filename":"","crunched":0,"start":115139,"end":123963,"audio":false},{"filename":"","crunched":0,"start":123963,"end":134234,"audio":false},{"filename":"","crunched":0,"start":134234,"end":137264,"audio":false},{"filename":"","crunched":0,"start":137264,"end":137960,"audio":false},{"filename":"","crunched":0,"start":137960,"end":138448,"audio":false},{"filename":"","crunched":0,"start":138448,"end":139753,"audio":false},{"filename":"","crunched":0,"start":139753,"end":139988,"audio":false},{"filename":"","crunched":0,"start":139988,"end":140735,"audio":false},{"filename":"","crunched":0,"start":140735,"end":141339,"audio":false},{"filename":"","crunched":0,"start":141339,"end":141559,"audio":false},{"filename":"","crunched":0,"start":141559,"end":142168,"audio":false},{"filename":"","crunched":0,"start":142168,"end":142970,"audio":false},{"filename":"","crunched":0,"start":142970,"end":143230,"audio":false},{"filename":"","crunched":0,"start":143230,"end":143468,"audio":false},{"filename":"","crunched":0,"start":143468,"end":143688,"audio":false},{"filename":"","crunched":0,"start":143688,"end":143955,"audio":false},{"filename":"","crunched":0,"start":143955,"end":144498,"audio":false},{"filename":"","crunched":0,"start":144498,"end":144679,"audio":false},{"filename":"","crunched":0,"start":144679,"end":144906,"audio":false},{"filename":"","crunched":0,"start":144906,"end":152450,"audio":false},{"filename":"","crunched":0,"start":152450,"end":158773,"audio":false},{"filename":"","crunched":0,"start":158773,"end":251193,"audio":false},{"filename":"","crunched":0,"start":251193,"end":251413,"audio":false},{"filename":"","crunched":0,"start":251413,"end":251633,"audio":false},{"filename":"","crunched":0,"start":251633,"end":251689,"audio":false},{"filename":"","crunched":0,"start":251689,"end":252155,"audio":false},{"filename":"","crunched":0,"start":252155,"end":252842,"audio":false},{"filename":"","crunched":0,"start":252842,"end":263144,"audio":false},{"filename":"","crunched":0,"start":263144,"end":263364,"audio":false},{"filename":"","crunched":0,"start":263364,"end":263579,"audio":false},{"filename":"","crunched":0,"start":263579,"end":263648,"audio":false},{"filename":"","crunched":0,"start":263648,"end":264395,"audio":false},{"filename":"","crunched":0,"start":264395,"end":264621,"audio":false},{"filename":"","crunched":0,"start":264621,"end":276322,"audio":false},{"filename":"","crunched":0,"start":276322,"end":276920,"audio":false},{"filename":"","crunched":0,"start":276920,"end":277761,"audio":false},{"filename":"","crunched":0,"start":277761,"end":277989,"audio":false},{"filename":"","crunched":0,"start":277989,"end":278228,"audio":false},{"filename":"","crunched":0,"start":278228,"end":278448,"audio":false},{"filename":"","crunched":0,"start":278448,"end":278532,"audio":false},{"filename":"","crunched":0,"start":278532,"end":279399,"audio":false},{"filename":"","crunched":0,"start":279399,"end":280241,"audio":false},{"filename":"","crunched":0,"start":280241,"end":282539,"audio":false},{"filename":"","crunched":0,"start":282539,"end":2527998,"audio":false},{"filename":"","crunched":0,"start":2527998,"end":2528797,"audio":false},{"filename":"","crunched":0,"start":2528797,"end":2530912,"audio":false},{"filename":"","crunched":0,"start":2530912,"end":2531132,"audio":false},{"filename":"","crunched":0,"start":2531132,"end":2540475,"audio":false},{"filename":"","crunched":0,"start":2540475,"end":2540794,"audio":false},{"filename":"","crunched":0,"start":2540794,"end":2541032,"audio":false},{"filename":"","crunched":0,"start":2541032,"end":2541279,"audio":false},{"filename":"","crunched":0,"start":2541279,"end":2542120,"audio":false},{"filename":"","crunched":0,"start":2542120,"end":2542988,"audio":false},{"filename":"","crunched":0,"start":2542988,"end":8944224,"audio":false},{"filename":"","crunched":0,"start":8944224,"end":8944455,"audio":false},{"filename":"","crunched":0,"start":8944455,"end":8945257,"audio":false},{"filename":"","crunched":0,"start":8945257,"end":8945494,"audio":false},{"filename":"","crunched":0,"start":8945494,"end":8945657,"audio":false},{"filename":"","crunched":0,"start":8945657,"end":8945877,"audio":false},{"filename":"","crunched":0,"start":8945877,"end":8956315,"audio":false},{"filename":"","crunched":0,"start":8956315,"end":8956554,"audio":false},{"filename":"","crunched":0,"start":8956554,"end":8956774,"audio":false},{"filename":"","crunched":0,"start":8956774,"end":8956994,"audio":false},{"filename":"","crunched":0,"start":8956994,"end":8957318,"audio":false},{"filename":"","crunched":0,"start":8957318,"end":8957439,"audio":false},{"filename":"","crunched":0,"start":8957439,"end":8959176,"audio":false},{"filename":"","crunched":0,"start":8959176,"end":8959443,"audio":false},{"filename":"","crunched":0,"start":8959443,"end":8970583,"audio":false},{"filename":"","crunched":0,"start":8970583,"end":8970862,"audio":false},{"filename":"","crunched":0,"start":8970862,"end":8971186,"audio":false},{"filename":"","crunched":0,"start":8971186,"end":8972013,"audio":false},{"filename":"","crunched":0,"start":8972013,"end":8981204,"audio":false},{"filename":"","crunched":0,"start":8981204,"end":8981219,"audio":false},{"filename":"","crunched":0,"start":8981219,"end":8982060,"audio":false},{"filename":"","crunched":0,"start":8982060,"end":8983547,"audio":false},{"filename":"","crunched":0,"start":8983547,"end":8983788,"audio":false},{"filename":"","crunched":0,"start":8983788,"end":8984018,"audio":false},{"filename":"","crunched":0,"start":8984018,"end":8984238,"audio":false},{"filename":"","crunched":0,"start":8984238,"end":8984485,"audio":false},{"filename":"","crunched":0,"start":8984485,"end":8984522,"audio":false},{"filename":"","crunched":0,"start":8984522,"end":8988223,"audio":false},{"filename":"","crunched":0,"start":8988223,"end":8988470,"audio":false},{"filename":"","crunched":0,"start":8988470,"end":8989085,"audio":false},{"filename":"","crunched":0,"start":8989085,"end":8989802,"audio":false},{"filename":"","crunched":0,"start":8989802,"end":9096366,"audio":false},{"filename":"","crunched":0,"start":9096366,"end":9099286,"audio":false},{"filename":"","crunched":0,"start":9099286,"end":9210137,"audio":false},{"filename":"","crunched":0,"start":9210137,"end":9210453,"audio":false},{"filename":"","crunched":0,"start":9210453,"end":9210723,"audio":false},{"filename":"","crunched":0,"start":9210723,"end":9210764,"audio":false},{"filename":"","crunched":0,"start":9210764,"end":9210805,"audio":false},{"filename":"","crunched":0,"start":9210805,"end":9210846,"audio":false},{"filename":"","crunched":0,"start":9210846,"end":9210887,"audio":false},{"filename":"","crunched":0,"start":9210887,"end":9210928,"audio":false},{"filename":"","crunched":0,"start":9210928,"end":9210969,"audio":false},{"filename":"","crunched":0,"start":9210969,"end":9211010,"audio":false},{"filename":"","crunched":0,"start":9211010,"end":9211051,"audio":false},{"filename":"","crunched":0,"start":9211051,"end":9211092,"audio":false},{"filename":"","crunched":0,"start":9211092,"end":9211133,"audio":false},{"filename":"","crunched":0,"start":9211133,"end":9211174,"audio":false},{"filename":"","crunched":0,"start":9211174,"end":9211215,"audio":false},{"filename":"","crunched":0,"start":9211215,"end":9211256,"audio":false},{"filename":"","crunched":0,"start":9211256,"end":9211297,"audio":false},{"filename":"","crunched":0,"start":9211297,"end":9211338,"audio":false},{"filename":"","crunched":0,"start":9211338,"end":9211379,"audio":false},{"filename":"","crunched":0,"start":9211379,"end":9211420,"audio":false},{"filename":"","crunched":0,"start":9211420,"end":9211461,"audio":false},{"filename":"","crunched":0,"start":9211461,"end":9211502,"audio":false},{"filename":"","crunched":0,"start":9211502,"end":9211543,"audio":false},{"filename":"","crunched":0,"start":9211543,"end":9211584,"audio":false},{"filename":"","crunched":0,"start":9211584,"end":9211625,"audio":false},{"filename":"","crunched":0,"start":9211625,"end":9211666,"audio":false},{"filename":"","crunched":0,"start":9211666,"end":9211707,"audio":false},{"filename":"","crunched":0,"start":9211707,"end":9211748,"audio":false},{"filename":"","crunched":0,"start":9211748,"end":9211789,"audio":false},{"filename":"","crunched":0,"start":9211789,"end":9211830,"audio":false},{"filename":"","crunched":0,"start":9211830,"end":9211871,"audio":false},{"filename":"","crunched":0,"start":9211871,"end":9211912,"audio":false},{"filename":"","crunched":0,"start":9211912,"end":9211953,"audio":false},{"filename":"","crunched":0,"start":9211953,"end":9211994,"audio":false},{"filename":"","crunched":0,"start":9211994,"end":9212035,"audio":false},{"filename":"","crunched":0,"start":9212035,"end":9212076,"audio":false},{"filename":"","crunched":0,"start":9212076,"end":9212117,"audio":false},{"filename":"","crunched":0,"start":9212117,"end":9212158,"audio":false},{"filename":"","crunched":0,"start":9212158,"end":9212199,"audio":false},{"filename":"","crunched":0,"start":9212199,"end":9212240,"audio":false},{"filename":"","crunched":0,"start":9212240,"end":9212281,"audio":false},{"filename":"","crunched":0,"start":9212281,"end":9212322,"audio":false},{"filename":"","crunched":0,"start":9212322,"end":9212363,"audio":false},{"filename":"","crunched":0,"start":9212363,"end":9212404,"audio":false},{"filename":"","crunched":0,"start":9212404,"end":9212445,"audio":false},{"filename":"","crunched":0,"start":9212445,"end":9212486,"audio":false},{"filename":"","crunched":0,"start":9212486,"end":9212527,"audio":false},{"filename":"","crunched":0,"start":9212527,"end":9212568,"audio":false},{"filename":"","crunched":0,"start":9212568,"end":9212609,"audio":false},{"filename":"","crunched":0,"start":9212609,"end":9212650,"audio":false},{"filename":"","crunched":0,"start":9212650,"end":9212691,"audio":false},{"filename":"","crunched":0,"start":9212691,"end":9212732,"audio":false},{"filename":"","crunched":0,"start":9212732,"end":9212773,"audio":false},{"filename":"","crunched":0,"start":9212773,"end":9212814,"audio":false},{"filename":"","crunched":0,"start":9212814,"end":9212855,"audio":false},{"filename":"","crunched":0,"start":9212855,"end":9212896,"audio":false},{"filename":"","crunched":0,"start":9212896,"end":9212937,"audio":false},{"filename":"","crunched":0,"start":9212937,"end":9212978,"audio":false},{"filename":"","crunched":0,"start":9212978,"end":9213019,"audio":false},{"filename":"","crunched":0,"start":9213019,"end":9213049,"audio":false},{"filename":"","crunched":0,"start":9213049,"end":9213090,"audio":false},{"filename":"","crunched":0,"start":9213090,"end":9213131,"audio":false},{"filename":"","crunched":0,"start":9213131,"end":9213172,"audio":false},{"filename":"","crunched":0,"start":9213172,"end":9213213,"audio":false},{"filename":"","crunched":0,"start":9213213,"end":9218875,"audio":false},{"filename":"","crunched":0,"start":9218875,"end":9218896,"audio":false},{"filename":"","crunched":0,"start":9218896,"end":9218979,"audio":false},{"filename":"","crunched":0,"start":9218979,"end":9218982,"audio":false},{"filename":"","crunched":0,"start":9218982,"end":9219130,"audio":false},{"filename":"","crunched":0,"start":9219130,"end":9219196,"audio":false},{"filename":"","crunched":0,"start":9219196,"end":9219262,"audio":false},{"filename":"","crunched":0,"start":9219262,"end":9219328,"audio":false},{"filename":"","crunched":0,"start":9219328,"end":9219394,"audio":false},{"filename":"","crunched":0,"start":9219394,"end":9219460,"audio":false},{"filename":"","crunched":0,"start":9219460,"end":9219526,"audio":false},{"filename":"","crunched":0,"start":9219526,"end":9219592,"audio":false},{"filename":"","crunched":0,"start":9219592,"end":9219658,"audio":false},{"filename":"","crunched":0,"start":9219658,"end":9219724,"audio":false},{"filename":"","crunched":0,"start":9219724,"end":9219790,"audio":false},{"filename":"","crunched":0,"start":9219790,"end":9219856,"audio":false},{"filename":"","crunched":0,"start":9219856,"end":9219922,"audio":false},{"filename":"","crunched":0,"start":9219922,"end":9219988,"audio":false},{"filename":"","crunched":0,"start":9219988,"end":9220054,"audio":false},{"filename":"","crunched":0,"start":9220054,"end":9220120,"audio":false},{"filename":"","crunched":0,"start":9220120,"end":9220186,"audio":false},{"filename":"","crunched":0,"start":9220186,"end":9220252,"audio":false},{"filename":"","crunched":0,"start":9220252,"end":9220318,"audio":false},{"filename":"","crunched":0,"start":9220318,"end":9220384,"audio":false},{"filename":"","crunched":0,"start":9220384,"end":9220450,"audio":false},{"filename":"","crunched":0,"start":9220450,"end":9220516,"audio":false},{"filename":"","crunched":0,"start":9220516,"end":9220582,"audio":false},{"filename":"","crunched":0,"start":9220582,"end":9220648,"audio":false},{"filename":"","crunched":0,"start":9220648,"end":9220714,"audio":false},{"filename":"","crunched":0,"start":9220714,"end":9220780,"audio":false},{"filename":"","crunched":0,"start":9220780,"end":9220846,"audio":false},{"filename":"","crunched":0,"start":9220846,"end":9220912,"audio":false},{"filename":"","crunched":0,"start":9220912,"end":9220978,"audio":false},{"filename":"","crunched":0,"start":9220978,"end":9221044,"audio":false},{"filename":"","crunched":0,"start":9221044,"end":9221110,"audio":false},{"filename":"","crunched":0,"start":9221110,"end":9221176,"audio":false},{"filename":"","crunched":0,"start":9221176,"end":9221242,"audio":false},{"filename":"","crunched":0,"start":9221242,"end":9221308,"audio":false},{"filename":"","crunched":0,"start":9221308,"end":9221374,"audio":false},{"filename":"","crunched":0,"start":9221374,"end":9221440,"audio":false},{"filename":"","crunched":0,"start":9221440,"end":9221506,"audio":false},{"filename":"","crunched":0,"start":9221506,"end":9221572,"audio":false},{"filename":"","crunched":0,"start":9221572,"end":9221638,"audio":false},{"filename":"","crunched":0,"start":9221638,"end":9221704,"audio":false},{"filename":"","crunched":0,"start":9221704,"end":9221770,"audio":false},{"filename":"","crunched":0,"start":9221770,"end":9221836,"audio":false},{"filename":"","crunched":0,"start":9221836,"end":9221902,"audio":false},{"filename":"","crunched":0,"start":9221902,"end":9221968,"audio":false},{"filename":"","crunched":0,"start":9221968,"end":9222096,"audio":false},{"filename":"","crunched":0,"start":9222096,"end":9222224,"audio":false},{"filename":"","crunched":0,"start":9222224,"end":9222352,"audio":false},{"filename":"","crunched":0,"start":9222352,"end":9222480,"audio":false},{"filename":"","crunched":0,"start":9222480,"end":9222608,"audio":false},{"filename":"","crunched":0,"start":9222608,"end":9222736,"audio":false},{"filename":"","crunched":0,"start":9222736,"end":9222864,"audio":false},{"filename":"","crunched":0,"start":9222864,"end":9222992,"audio":false},{"filename":"","crunched":0,"start":9222992,"end":9223120,"audio":false},{"filename":"","crunched":0,"start":9223120,"end":9223248,"audio":false},{"filename":"","crunched":0,"start":9223248,"end":9223376,"audio":false},{"filename":"","crunched":0,"start":9223376,"end":9223504,"audio":false},{"filename":"","crunched":0,"start":9223504,"end":9223632,"audio":false},{"filename":"","crunched":0,"start":9223632,"end":9223760,"audio":false},{"filename":"","crunched":0,"start":9223760,"end":9223888,"audio":false},{"filename":"","crunched":0,"start":9223888,"end":9224016,"audio":false},{"filename":"","crunched":0,"start":9224016,"end":9224144,"audio":false},{"filename":"","crunched":0,"start":9224144,"end":9224272,"audio":false},{"filename":"","crunched":0,"start":9224272,"end":9224400,"audio":false},{"filename":"","crunched":0,"start":9224400,"end":9224528,"audio":false},{"filename":"","crunched":0,"start":9224528,"end":9224656,"audio":false},{"filename":"","crunched":0,"start":9224656,"end":9224784,"audio":false},{"filename":"","crunched":0,"start":9224784,"end":9224912,"audio":false},{"filename":"","crunched":0,"start":9224912,"end":9225040,"audio":false},{"filename":"","crunched":0,"start":9225040,"end":9225168,"audio":false},{"filename":"","crunched":0,"start":9225168,"end":9225296,"audio":false},{"filename":"","crunched":0,"start":9225296,"end":9225424,"audio":false},{"filename":"","crunched":0,"start":9225424,"end":9225552,"audio":false},{"filename":"","crunched":0,"start":9225552,"end":9225680,"audio":false},{"filename":"","crunched":0,"start":9225680,"end":9225808,"audio":false},{"filename":"","crunched":0,"start":9225808,"end":9225936,"audio":false},{"filename":"","crunched":0,"start":9225936,"end":9226064,"audio":false},{"filename":"","crunched":0,"start":9226064,"end":9226192,"audio":false},{"filename":"","crunched":0,"start":9226192,"end":9226320,"audio":false},{"filename":"","crunched":0,"start":9226320,"end":9226448,"audio":false},{"filename":"","crunched":0,"start":9226448,"end":9226576,"audio":false},{"filename":"","crunched":0,"start":9226576,"end":9226704,"audio":false},{"filename":"","crunched":0,"start":9226704,"end":9226832,"audio":false},{"filename":"","crunched":0,"start":9226832,"end":9226960,"audio":false},{"filename":"","crunched":0,"start":9226960,"end":9227088,"audio":false},{"filename":"","crunched":0,"start":9227088,"end":9227216,"audio":false},{"filename":"","crunched":0,"start":9227216,"end":9227344,"audio":false},{"filename":"","crunched":0,"start":9227344,"end":9227472,"audio":false},{"filename":"","crunched":0,"start":9227472,"end":9227732,"audio":false},{"filename":"","crunched":0,"start":9227732,"end":9228124,"audio":false},{"filename":"","crunched":0,"start":9228124,"end":9228336,"audio":false},{"filename":"","crunched":0,"start":9228336,"end":9228748,"audio":false},{"filename":"","crunched":0,"start":9228748,"end":9229852,"audio":false},{"filename":"","crunched":0,"start":9229852,"end":9230156,"audio":false},{"filename":"","crunched":0,"start":9230156,"end":9231908,"audio":false},{"filename":"","crunched":0,"start":9231908,"end":9232120,"audio":false},{"filename":"","crunched":0,"start":9232120,"end":9232424,"audio":false},{"filename":"","crunched":0,"start":9232424,"end":9232684,"audio":false},{"filename":"","crunched":0,"start":9232684,"end":9232988,"audio":false},{"filename":"","crunched":0,"start":9232988,"end":9233200,"audio":false},{"filename":"","crunched":0,"start":9233200,"end":9233460,"audio":false},{"filename":"","crunched":0,"start":9233460,"end":9233672,"audio":false},{"filename":"","crunched":0,"start":9233672,"end":9233932,"audio":false},{"filename":"","crunched":0,"start":9233932,"end":9236664,"audio":false},{"filename":"","crunched":0,"start":9236664,"end":9237056,"audio":false},{"filename":"","crunched":0,"start":9237056,"end":9237268,"audio":false},{"filename":"","crunched":0,"start":9237268,"end":9238040,"audio":false},{"filename":"","crunched":0,"start":9238040,"end":9238184,"audio":false},{"filename":"","crunched":0,"start":9238184,"end":9238728,"audio":false},{"filename":"","crunched":0,"start":9238728,"end":9238940,"audio":false},{"filename":"","crunched":0,"start":9238940,"end":9239200,"audio":false},{"filename":"","crunched":0,"start":9239200,"end":9239412,"audio":false},{"filename":"","crunched":0,"start":9239412,"end":9239624,"audio":false},{"filename":"","crunched":0,"start":9239624,"end":9240184,"audio":false},{"filename":"","crunched":0,"start":9240184,"end":9240456,"audio":false},{"filename":"","crunched":0,"start":9240456,"end":9240668,"audio":false},{"filename":"","crunched":0,"start":9240668,"end":9240880,"audio":false},{"filename":"","crunched":0,"start":9240880,"end":9241092,"audio":false},{"filename":"","crunched":0,"start":9241092,"end":9241352,"audio":false},{"filename":"","crunched":0,"start":9241352,"end":9241564,"audio":false},{"filename":"","crunched":0,"start":9241564,"end":9241824,"audio":false},{"filename":"","crunched":0,"start":9241824,"end":9242036,"audio":false},{"filename":"","crunched":0,"start":9242036,"end":9242120,"audio":false},{"filename":"","crunched":0,"start":9242120,"end":9242424,"audio":false},{"filename":"","crunched":0,"start":9242424,"end":9242744,"audio":false},{"filename":"","crunched":0,"start":9242744,"end":9242751,"audio":false},{"filename":"","crunched":0,"start":9242751,"end":9242751,"audio":false},{"filename":"","crunched":0,"start":9242751,"end":9242772,"audio":false},{"filename":"","crunched":0,"start":9242772,"end":9243087,"audio":false},{"filename":"","crunched":0,"start":9243087,"end":9243363,"audio":false},{"filename":"","crunched":0,"start":9243363,"end":9243637,"audio":false},{"filename":"","crunched":0,"start":9243637,"end":9243884,"audio":false},{"filename":"","crunched":0,"start":9243884,"end":9244186,"audio":false},{"filename":"","crunched":0,"start":9244186,"end":9244499,"audio":false},{"filename":"","crunched":0,"start":9244499,"end":9244746,"audio":false},{"filename":"","crunched":0,"start":9244746,"end":9245040,"audio":false},{"filename":"","crunched":0,"start":9245040,"end":9245327,"audio":false},{"filename":"","crunched":0,"start":9245327,"end":9245642,"audio":false},{"filename":"","crunched":0,"start":9245642,"end":9245957,"audio":false},{"filename":"","crunched":0,"start":9245957,"end":9246272,"audio":false},{"filename":"","crunched":0,"start":9246272,"end":9246597,"audio":false},{"filename":"","crunched":0,"start":9246597,"end":9246873,"audio":false},{"filename":"","crunched":0,"start":9246873,"end":9247186,"audio":false},{"filename":"","crunched":0,"start":9247186,"end":9247501,"audio":false},{"filename":"","crunched":0,"start":9247501,"end":9247814,"audio":false},{"filename":"","crunched":0,"start":9247814,"end":9248095,"audio":false},{"filename":"","crunched":0,"start":9248095,"end":9248377,"audio":false},{"filename":"","crunched":0,"start":9248377,"end":9248724,"audio":false},{"filename":"","crunched":0,"start":9248724,"end":9249039,"audio":false},{"filename":"","crunched":0,"start":9249039,"end":9249286,"audio":false},{"filename":"","crunched":0,"start":9249286,"end":9249533,"audio":false},{"filename":"","crunched":0,"start":9249533,"end":9249835,"audio":false},{"filename":"","crunched":0,"start":9249835,"end":9250062,"audio":false},{"filename":"","crunched":0,"start":9250062,"end":9250344,"audio":false},{"filename":"","crunched":0,"start":9250344,"end":9250659,"audio":false},{"filename":"","crunched":0,"start":9250659,"end":9250935,"audio":false},{"filename":"","crunched":0,"start":9250935,"end":9251186,"audio":false},{"filename":"","crunched":0,"start":9251186,"end":9251462,"audio":false},{"filename":"","crunched":0,"start":9251462,"end":9251787,"audio":false},{"filename":"","crunched":0,"start":9251787,"end":9252034,"audio":false},{"filename":"","crunched":0,"start":9252034,"end":9252347,"audio":false},{"filename":"","crunched":0,"start":9252347,"end":9252585,"audio":false},{"filename":"","crunched":0,"start":9252585,"end":9252861,"audio":false},{"filename":"","crunched":0,"start":9252861,"end":9253142,"audio":false},{"filename":"","crunched":0,"start":9253142,"end":9253455,"audio":false},{"filename":"","crunched":0,"start":9253455,"end":9253768,"audio":false},{"filename":"","crunched":0,"start":9253768,"end":9254014,"audio":false},{"filename":"","crunched":0,"start":9254014,"end":9254261,"audio":false},{"filename":"","crunched":0,"start":9254261,"end":9254576,"audio":false},{"filename":"","crunched":0,"start":9254576,"end":9254903,"audio":false},{"filename":"","crunched":0,"start":9254903,"end":9254918,"audio":false},{"filename":"","crunched":0,"start":9254918,"end":9255665,"audio":false},{"filename":"","crunched":0,"start":9255665,"end":9256412,"audio":false},{"filename":"","crunched":0,"start":9256412,"end":9257470,"audio":false},{"filename":"","crunched":0,"start":9257470,"end":9258528,"audio":false},{"filename":"","crunched":0,"start":9258528,"end":9259755,"audio":false},{"filename":"","crunched":0,"start":9259755,"end":9260502,"audio":false},{"filename":"","crunched":0,"start":9260502,"end":9261249,"audio":false},{"filename":"","crunched":0,"start":9261249,"end":9261996,"audio":false},{"filename":"","crunched":0,"start":9261996,"end":9262743,"audio":false},{"filename":"","crunched":0,"start":9262743,"end":9263490,"audio":false},{"filename":"","crunched":0,"start":9263490,"end":9264237,"audio":false},{"filename":"","crunched":0,"start":9264237,"end":9264984,"audio":false},{"filename":"","crunched":0,"start":9264984,"end":9265731,"audio":false},{"filename":"","crunched":0,"start":9265731,"end":9266635,"audio":false},{"filename":"","crunched":0,"start":9266635,"end":9268002,"audio":false},{"filename":"","crunched":0,"start":9268002,"end":9268749,"audio":false},{"filename":"","crunched":0,"start":9268749,"end":9270116,"audio":false},{"filename":"","crunched":0,"start":9270116,"end":9270863,"audio":false},{"filename":"","crunched":0,"start":9270863,"end":9271610,"audio":false},{"filename":"","crunched":0,"start":9271610,"end":9272357,"audio":false},{"filename":"","crunched":0,"start":9272357,"end":9273415,"audio":false},{"filename":"","crunched":0,"start":9273415,"end":9275092,"audio":false},{"filename":"","crunched":0,"start":9275092,"end":9275839,"audio":false},{"filename":"","crunched":0,"start":9275839,"end":9275902,"audio":false},{"filename":"","crunched":0,"start":9275902,"end":9276649,"audio":false},{"filename":"","crunched":0,"start":9276649,"end":9277707,"audio":false},{"filename":"","crunched":0,"start":9277707,"end":9279074,"audio":false},{"filename":"","crunched":0,"start":9279074,"end":9280441,"audio":false},{"filename":"","crunched":0,"start":9280441,"end":9281499,"audio":false},{"filename":"","crunched":0,"start":9281499,"end":9282246,"audio":false},{"filename":"","crunched":0,"start":9282246,"end":9282993,"audio":false},{"filename":"","crunched":0,"start":9282993,"end":9284029,"audio":false},{"filename":"","crunched":0,"start":9284029,"end":9285087,"audio":false},{"filename":"","crunched":0,"start":9285087,"end":9285991,"audio":false},{"filename":"","crunched":0,"start":9285991,"end":9286738,"audio":false},{"filename":"","crunched":0,"start":9286738,"end":9288275,"audio":false},{"filename":"","crunched":0,"start":9288275,"end":9289022,"audio":false},{"filename":"","crunched":0,"start":9289022,"end":9290249,"audio":false},{"filename":"","crunched":0,"start":9290249,"end":9291307,"audio":false},{"filename":"","crunched":0,"start":9291307,"end":9292054,"audio":false},{"filename":"","crunched":0,"start":9292054,"end":9293591,"audio":false},{"filename":"","crunched":0,"start":9293591,"end":9294338,"audio":false},{"filename":"","crunched":0,"start":9294338,"end":9294606,"audio":false},{"filename":"","crunched":0,"start":9294606,"end":9294940,"audio":false},{"filename":"","crunched":0,"start":9294940,"end":9295142,"audio":false},{"filename":"","crunched":0,"start":9295142,"end":9296690,"audio":false},{"filename":"","crunched":0,"start":9296690,"end":9296892,"audio":false},{"filename":"","crunched":0,"start":9296892,"end":9297160,"audio":false},{"filename":"","crunched":0,"start":9297160,"end":9297916,"audio":false},{"filename":"","crunched":0,"start":9297916,"end":9298250,"audio":false},{"filename":"","crunched":0,"start":9298250,"end":9298584,"audio":false},{"filename":"","crunched":0,"start":9298584,"end":9299028,"audio":false},{"filename":"","crunched":0,"start":9299028,"end":9299036,"audio":false},{"filename":"","crunched":0,"start":9299036,"end":9299238,"audio":false},{"filename":"","crunched":0,"start":9299238,"end":9299440,"audio":false},{"filename":"","crunched":0,"start":9299440,"end":9299642,"audio":false},{"filename":"","crunched":0,"start":9299642,"end":9299910,"audio":false},{"filename":"","crunched":0,"start":9299910,"end":9300552,"audio":false},{"filename":"","crunched":0,"start":9300552,"end":9300864,"audio":false},{"filename":"","crunched":0,"start":9300864,"end":9301132,"audio":false},{"filename":"","crunched":0,"start":9301132,"end":9301444,"audio":false},{"filename":"","crunched":0,"start":9301444,"end":9301646,"audio":false},{"filename":"","crunched":0,"start":9301646,"end":9301848,"audio":false},{"filename":"","crunched":0,"start":9301848,"end":9302094,"audio":false},{"filename":"","crunched":0,"start":9302094,"end":9302340,"audio":false},{"filename":"","crunched":0,"start":9302340,"end":9302784,"audio":false},{"filename":"","crunched":0,"start":9302784,"end":9303250,"audio":false},{"filename":"","crunched":0,"start":9303250,"end":9304200,"audio":false},{"filename":"","crunched":0,"start":9304200,"end":9304380,"audio":false},{"filename":"","crunched":0,"start":9304380,"end":9304582,"audio":false},{"filename":"","crunched":0,"start":9304582,"end":9304762,"audio":false},{"filename":"","crunched":0,"start":9304762,"end":9305712,"audio":false},{"filename":"","crunched":0,"start":9305712,"end":9306046,"audio":false},{"filename":"","crunched":0,"start":9306046,"end":9306248,"audio":false},{"filename":"","crunched":0,"start":9306248,"end":9306450,"audio":false},{"filename":"","crunched":0,"start":9306450,"end":9306762,"audio":false},{"filename":"","crunched":0,"start":9306762,"end":9307030,"audio":false},{"filename":"","crunched":0,"start":9307030,"end":9309854,"audio":false},{"filename":"","crunched":0,"start":9309854,"end":9310122,"audio":false},{"filename":"","crunched":0,"start":9310122,"end":9310742,"audio":false},{"filename":"","crunched":0,"start":9310742,"end":9310988,"audio":false},{"filename":"","crunched":0,"start":9310988,"end":9311190,"audio":false},{"filename":"","crunched":0,"start":9311190,"end":9311392,"audio":false},{"filename":"","crunched":0,"start":9311392,"end":9311444,"audio":false},{"filename":"","crunched":0,"start":9311444,"end":9311888,"audio":false},{"filename":"","crunched":0,"start":9311888,"end":9312090,"audio":false},{"filename":"","crunched":0,"start":9312090,"end":9312270,"audio":false},{"filename":"","crunched":0,"start":9312270,"end":9312450,"audio":false},{"filename":"","crunched":0,"start":9312450,"end":9312652,"audio":false},{"filename":"","crunched":0,"start":9312652,"end":9313294,"audio":false},{"filename":"","crunched":0,"start":9313294,"end":9313518,"audio":false},{"filename":"","crunched":0,"start":9313518,"end":9313720,"audio":false},{"filename":"","crunched":0,"start":9313720,"end":9313966,"audio":false},{"filename":"","crunched":0,"start":9313966,"end":9313966,"audio":false},{"filename":"","crunched":0,"start":9313966,"end":9313979,"audio":false},{"filename":"","crunched":0,"start":9313979,"end":9313982,"audio":false},{"filename":"","crunched":0,"start":9313982,"end":9313989,"audio":false},{"filename":"","crunched":0,"start":9313989,"end":9314064,"audio":false},{"filename":"","crunched":0,"start":9314064,"end":9315049,"audio":false},{"filename":"","crunched":0,"start":9315049,"end":9315054,"audio":false},{"filename":"","crunched":0,"start":9315054,"end":9315576,"audio":false},{"filename":"","crunched":0,"start":9315576,"end":9322648,"audio":false},{"filename":"","crunched":0,"start":9322648,"end":9323718,"audio":false},{"filename":"","crunched":0,"start":9323718,"end":9325763,"audio":false},{"filename":"","crunched":0,"start":9325763,"end":9327299,"audio":false},{"filename":"","crunched":0,"start":9327299,"end":9328454,"audio":false},{"filename":"","crunched":0,"start":9328454,"end":9328966,"audio":false},{"filename":"","crunched":0,"start":9328966,"end":9329377,"audio":false},{"filename":"","crunched":0,"start":9329377,"end":9340224,"audio":false},{"filename":"","crunched":0,"start":9340224,"end":9442170,"audio":false},{"filename":"","crunched":0,"start":9442170,"end":9442629,"audio":false},{"filename":"","crunched":0,"start":9442629,"end":9449310,"audio":false},{"filename":"","crunched":0,"start":9449310,"end":21899568,"audio":false},{"filename":"","crunched":0,"start":21899568,"end":21952581,"audio":false},{"filename":"","crunched":0,"start":21952581,"end":21957465,"audio":false},{"filename":"","crunched":0,"start":21957465,"end":22282919,"audio":false},{"filename":"","crunched":0,"start":22282919,"end":27003645,"audio":false},{"filename":"","crunched":0,"start":27003645,"end":27007068,"audio":false},{"filename":"","crunched":0,"start":27007068,"end":27014229,"audio":false},{"filename":"","crunched":0,"start":27014229,"end":27015089,"audio":false},{"filename":"","crunched":0,"start":27015089,"end":27051632,"audio":false},{"filename":"","crunched":0,"start":27051632,"end":27052192,"audio":false},{"filename":"","crunched":0,"start":27052192,"end":27055529,"audio":false},{"filename":"","crunched":0,"start":27055529,"end":27056665,"audio":false},{"filename":"","crunched":0,"start":27056665,"end":27060061,"audio":false},{"filename":"","crunched":0,"start":27060061,"end":27060593,"audio":false},{"filename":"","crunched":0,"start":27060593,"end":27061530,"audio":false},{"filename":"","crunched":0,"start":27061530,"end":27061562,"audio":false},{"filename":"","crunched":0,"start":27061562,"end":27061569,"audio":false},{"filename":"","crunched":0,"start":27061569,"end":27062668,"audio":false},{"filename":"","crunched":0,"start":27062668,"end":27067028,"audio":false},{"filename":"","crunched":0,"start":27067028,"end":27073591,"audio":false},{"filename":"","crunched":0,"start":27073591,"end":27074699,"audio":false},{"filename":"","crunched":0,"start":27074699,"end":27075165,"audio":false},{"filename":"","crunched":0,"start":27075165,"end":27075291,"audio":false}]});

})();
