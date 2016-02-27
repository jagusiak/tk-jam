if (typeof XMLHttpRequest === "undefined") {
    /*
     * Creates XMLHttpRequest.
     * Standard supports for IE browsers.
     *
     * @returns {ActiveXObject}
     */
    XMLHttpRequest = function () {
        try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
            catch (e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
            catch (e) {}
        try { return new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (e) {}
        throw new Error("This browser does not support XMLHttpRequest.");
  };
}

/**
 * Global variable SJ
 * This variable stores main application container with core functions
 */
window.SJ = (function () {
    "use strict";

    // app handler
    var app;

    // core directories location
    var core = {
        settings : 'sj/core/settings.js',
        config : 'sj/core/config.js',
        modules : 'sj/core/modules.js',
        run : 'sj/core/run.js'
    };

    /**
     * Script object - it is used to load script files
     * @type Function
     */
    var script = (function() {
        // local xhr object - one for all
        var xhr = new XMLHttpRequest();

        // run evaluation on ready state
        xhr.onreadystatechange = function() {
            if (this.readyState === (this.DONE || 4)) {
                eval(this.responseText);
            }
        };
        return {
            /**
             * Loads scripts in given location file name
             *
             * @param {String} file name
             * @returns {null}
             */
            load : function(file) {
                xhr.open('GET', file, false);
                xhr.send(null);
            }
        };
    })();

    var json = (function() {
        // local xhr object - one for all
        var xhr = new XMLHttpRequest(), response = null;

        // run evaluation on ready state
        xhr.onreadystatechange = function() {
            if (this.readyState === (this.DONE || 4)) {
                response = JSON.parse(this.responseText);
            }
        };
        return {
            /**
             * Loads scripts in given location file name
             *
             * @param {String} file name
             * @returns {null}
             */
            load : function(file) {
                xhr.open('GET', file, false);
                xhr.send(null);
                return response;
            }
        };
    }());

    /**
     * Intializes application by given app name.
     * Method will run configuration and modules from directory with the same
     * name as appName.
     *
     * @param {String} appName
     * @returns {Boolean}
     */
    function init(appName) {
        app = (!appName ? 'app' : appName);
        window.SJ.settings = {"configuration": {"canvas": {"scope": "FULL", "file": "canvas"}, "texture": {"scope": "APP", "file": "texture"}, "sound": {"scope": "APP", "file": "sound"}, "scenes": {"scope": "APP", "file": "scenes"}}, "modules": {"utils": "sj/modules/utils", "h4render": "sj/modules/h4render", "texture": "sj/modules/texture", "canvasobject": "sj/modules/canvasobject", "scene": "sj/modules/scene", "canvas": "sj/modules/canvas", "sound": "sj/modules/sound", "input": "sj/modules/input", "animation": "sj/modules/animation", "default": "sj/modules/default", "loader": "sj/modules/loader", "qte_start": "APP_NAME/modules/qte_start", "qte_run": "APP_NAME/modules/qte_run"}, "init": {"module": "qte_start", "action": "init"}};
window.SJ.config = (function(configuration) {var data = configuration; return function(name, item) {return data[name][item]; };}({"sound": {}, "scenes": {"keys": {"textures": [], "objects": {"key_t": {"visibility": true, "dimension": {"width": 0.2, "height": 0.2}, "texture": {"top": 0, "bottom": 1, "right": 1, "name": "key_t", "left": 0}, "position": {"y": 0.7, "x": 0.5, "z": 3}, "rotation": 0.0}, "key_q": {"visibility": true, "dimension": {"width": 0.2, "height": 0.2}, "texture": {"top": 0, "bottom": 1, "right": 1, "name": "key_q", "left": 0}, "position": {"y": 0.7, "x": 0.2, "z": 3}, "rotation": 0.0}, "key_e": {"visibility": true, "dimension": {"width": 0.2, "height": 0.2}, "texture": {"top": 0, "bottom": 1, "right": 1, "name": "key_e", "left": 0}, "position": {"y": 0.7, "x": 0.8, "z": 3}, "rotation": 0.0}}, "sounds": []}, "run": {"textures": [], "objects": {"guy": {"visibility": true, "dimension": {"width": 0.2, "height": 0.2}, "texture": {"top": 0, "bottom": 1, "right": 0.09, "name": "anim", "left": 0}, "position": {"y": 0.5, "x": 0.75, "z": 2}, "rotation": 0.0}, "background": {"visibility": true, "dimension": {"width": 1.5, "height": 1.0}, "texture": {"top": 0, "bottom": 1, "right": 4, "name": "bg_1", "left": 0}, "position": {"y": 0.5, "x": 0.75, "z": 1}, "rotation": 0.0}}, "sounds": []}}, "texture": {"textures": {"key_t": "images/t.png", "bg_1": "images/bg_1.png", "key_q": "images/q.png", "anim": "images/anim.png", "key_e": "images/e.png"}}, "canvas": {"width": 1.5, "fps": 20, "redner": "h4renderer", "height": 1.0, "canvas_id": "sj-canvas", "loader": "loader"}}));
window.SJ.module = function(name, code) { if (!window.SJ.settings.modules[name]) {console.error('Module ' + name + ' not found in settings');} if (window.SJ[name]) {console.error('Cannot reserve name ' + name);} window.SJ[name] = code(window.SJ);};
window.SJ.module('utils', function(sj) {
    

    return {
        /**
         * Load image from given url
         * @param  {String} src Image location
         * @return {Image} Image object
         */
        loadImage: function(src) {
            var image = new Image();
            image.src = src;
            return image;
        },
        /**
         * Load sound from given url
         * @param  {String} src Sound location
         * @return {Audio} Sound objecy
         */
        loadSound: function(src) {
            var sound = new Audio(src);
            sound.load();
            return sound;
        },
    };
});

window.SJ.module('h4render', function (sj) {
    

    var canvas, width, height, ratioX, ratioY;

    /**
     * Set object position
     *
     * @param {CanvasObject} object
     */
    function setPosition(object) {
        var div = object.rh4;
        div.style.top = ratioY * (object.y - object.height/2) + "px";
        div.style.left = ratioX * (object.x - object.width/2) + "px";
        div.style.zIndex = object.z | 1;
        object.translated = false;
    }

    /**
     * Sets object dimension
     *
     * @param {CanvasObject} object
     */
    function setDimension(object) {
        var div = object.rh4;
        div.style.width = ratioX * object.width + "px";
        div.style.height = ratioY * object.height + "px";
        object.scaled = false;
    }

    /**
     * Sets object rotation
     *
     * @param {CanvasObject} object
     */
    function setRotation(object) {
        object.rh4.style.transform = 'rotate(' + object.rotation + 'rad)';
        object.rotated = false;
    }

    /**
     * Sets object texture
     *
     * @param {CanvasObject} object
     */
    function setTexture(object) {
        var bgWidth = 100.0 / (object.textureRight - object.textureLeft),
                bgHeight = 100.0 / (object.textureBottom - object.textureTop),
                div = object.rh4;
        div.style.backgroundImage = "url('" + object.texture.image.src + "')";
        div.style.backgroundSize = bgWidth + "% " + bgHeight + "%";
        div.style.backgroundPosition = bgWidth * object.textureLeft + "% " + bgHeight * object.textureTop + "%";
        object.textured = false;
    }

    /**
     * Sets object visibility
     *
     * @param {CanvasObject} object
     */
    function setVisibility(object) {
        object.rh4.style.display = object.visible ? 'block' : 'none';
        object.rotated = false;
    }

    return {
        /**
         * Initalizes render - setup
         *
         * @param {DOMElement} canvasElement
         * @param {Integer} canvas virtual width
         * @param {Integer} canvas viertual height
         */
        init: function (canvasElement, w, h) {
            canvas = canvasElement;
            width = w;
            height = h;
            ratioX = canvas.offsetWidth / w;
            ratioY = canvas.offsetHeight / h;
        },
        /**
         * Starts rendering scene
         *
         * @param {SJScene} scene
         */
        start: function (scene) {
            for (var i in scene.objects) {
                var object = scene.objects[i],
                        div = document.createElement('div');
                div.id = 'sj-rh4-' + object.name;
                div.style.position = 'absolute';
                object.rh4 = div;
                canvas.appendChild(div);
                setPosition(object);
                setDimension(object);
                setRotation(object);
                setTexture(object);
                setVisibility(object);
            }
            scene.started = true;
        },
        /**
         * Stops rendering scene
         *
         * @param {SJScene} scene
         */
        stop: function (scene) {
            scene.started = false;
            for (var i in scene.objects) {
                var object = scene.objects[i];
                canvas.removeChild(object.rh4);
                delete object.rh4;
            }
        },
        /**
         * Notify about object removal
         *
         * @param {CanvasObject} object
         */
        remove: function(object) {
            canvas.removeChild(object.rh4);
        },
        /**
         * Renders single frame
         *
         * @param {SJScene} scene
         */
        frame: function (scene) {
            if (scene.started) {
                for (var i in scene.objects) {
                    var object = scene.objects[i];
                    if (object.translated) {
                        setPosition(object);
                    }
                    if (object.rotated) {
                        setRotation(object);
                    }
                    if (object.textured) {
                        setTexture(object);
                    }
                    if (object.scaled) {
                        setDimension(object);
                    }
                    if (object.displayed) {
                        setVisibility(object);
                    }
                }
            }
        }
    };
});

window.SJ.module('texture', function(sj) {
    

    var config = sj.config("texture", "textures"),
        textures = {};


    function SJTexture() {
    }

    for (var name in config) {
        textures[name] = new SJTexture();
        textures[name].name = name;
    }

    function exists(name) {
        if (!config[name]) {
            throw new Error("Texture '" + name + "' not defined!");
        }
        return true;
    }

    return {
        /**
         * Loads texture to memory (loads file)
         * @param  {String} name Texture name (represents name from config file)
         */
        load : function(name) {
            if (exists(name) && !textures[name].image) {
                textures[name].image = sj.utils.loadImage(config[name]);
            }
        },
        /**
         * Unload texture from memory (unloads file)
         * @param  {String} name Texture name (represents name from config file)
         */
        unload : function(name) {
            if (exists(name) && textures[name].image) {
                delete textures[name].image;
            }
        },
        /**
         * Returns texture object
         * @param  {SJTextrue} name Texture name (represents name from config file)
         */
        get : function(name) {
            if (exists(name)) {
                return textures[name];
            }
        },
        /**
         * Determines if texture was loaded
         * @param  {SJTextrue} name Texture name (represents name from config file)
         */
        loaded : function(name) {
            if (exists(name)) {
                return !!textures[name].image;
            }
        }
    };
});

window.SJ.module('canvasobject', function (sj) {
    

    /**
     * Creates scene object - main element of display
     *
     * @param {String} name Object name (identifier, unique per scene)
     * @returns {CanvasObject}
     */
    function CanvasObject(name) {
        var object = this;
        // set identifier (name)
        this.name = name;

        // set default values
        // dimension
        this.width = 1;
        this.height = 1;
        // rotation
        this.rotation = 0;
        // position
        this.x = 0;
        this.y = 0;
        this.z = 1; // this one is for depth

        this.visible = true;
        /**
         * Sets element position
         *
         * @param {Float} x - x position
         * @param {Float} y - y position
         * @param {Integer|undefined} z - depth
         */
        this.setPosition = function (x, y, z) {
            object.x = x;
            object.y = y;
            object.z = z | 1;
            // notify about changed position
            object.translated = true;
        };

        /**
         * Sets object dimesnion
         *
         * @param {Float} w Object width
         * @param {Float} h Object height
         */
        this.setDimension = function (w, h) {
            this.width = w;
            this.height = h;
            // notify about changed dimensions
            object.scaled = true;
        };

        /**
         * Sets object visibility
         *
         * @param {Boolean} v Object visibility
         */
        this.setVisible = function (v) {
            object.visible = v;
            // notify about changed visiblity
            object.displayed = true;
        };

        /**
         * Sets object rotation dur center point
         * @param {Float} rotation Object rotation value in radians
         */
        this.setRotation = function (rotation) {
            object.rotation = rotation;
            // notify about rotation
            object.rotated = true;
        };

        /**
         * Sets object texture
         *
         * @param {SJTexture} texture Texture object loaded by texture module
         * @param {Float} left (0,1) Defines in which postion left edge should be placed regarding texture, ie 0,.5 means that texture starts from half
         * @param {Float} top (0,1) Defines in which postion top edge should be placed regarding texture
         * @param {Float} right (0,1) Defines in which postion right edge should be placed regarding texture
         * @param {Float} bottom (0,1) Defines in which postion bottom edge should be placed regarding texture
         */
        this.setTexture = function (texture, left, top, right, bottom) {
            object.texture = texture;
            object.textureLeft = left;
            object.textureRight = right;
            object.textureTop = top;
            object.textureBottom = bottom;
            // notify about texturing
            object.textured = true;
        };

    }

    return {
        /**
         * Return new object
         *
         * @param {String} name Object name
         * @returns {CanvasObject}
         */
        create: function (name) {
            return new CanvasObject(name);
        }
    };
});

window.SJ.module('scene', function (sj) {
    

    function SJScene(render, data) {
        var scene = this;
        scene.objects = {};
        scene.sounds = {};
        /**
         * Start scene - initalizes textures and sounds
         * @return {[type]} [description]
         */
        scene.start = function () {
            var textures = {};
            for (var i in scene.objects) {
                var object = scene.objects[i];
                if (object.texture && !sj.texture.loaded(object.texture.name)) {
                    textures[object.texture.name] = true;
                }
            }
            for (var textureName in textures) {
                sj.texture.load(textureName);
            }
            for (var soundName in scene.sounds) {
                sj.sound.load(soundName);
            }
            render.start(scene);
        };
        /**
         * Stop scene - nottifies renderer to stop drawing scene
         */
        scene.stop = function () {
            render.stop(scene);
        };
        /**
         * Renders frame
         */
        scene.frame = function () {
            render.frame(scene);
        };
        /**
         * Creates new canvas object
         * @param  {String} name Object identifier
         */
        scene.createObject = function (name) {
            if (!scene.objects[name]) {
                var object = sj.canvasobject.create(name);
                scene.objects[name] = object;
                return object;
            } else {
                new Error("Object with name '" + name + "' already exists in scene");
            }
        };
        /**
         * Removes object (notifies render about removal)
         * @param  {String} name Object identifier
         */
        scene.removeObject = function (name) {
          if (scene.objects[name]) {
              render.remove(scene.objects[name]);
              delete scene.objects[name];
          }
        };
        /**
         * Return scene object by identifier
         * @param  {String} name Object identifier
         * @return {CanvasObject} Returns objects
         */
        scene.getObject = function (name) {
            return scene.objects[name];
        };
        /**
         * Adds sound to scene
         * @param  {String} name Sound identifier
         */
        scene.attachSound = function (name) {
          if (!scene.sounds[name]) {
              var object = sj.sound.get(name);
              scene.sounds[name] = object;
              return object;
          } else {
              new Error("Sound with name '" + name + "' already attached scene");
          }
        };
        /**
         * Removes sound from
         * @param  {String} name Sound identifier
         */
        scene.dettachSound = function (name) {
            delete scene.sounds[name];
        };
        /**
         * Get sound object from scene
         * @param  {String} name Sound identifier
         */
        scene.getSound = function (name) {
            return scene.sounds[name];
        };

        // defualt
        if (data && data.objects) {
            for (var name in data.objects) {
                var object = scene.createObject(name),
                    objectData = data.objects[name];
                if (objectData.position) {
                    object.setPosition(objectData.position.x, objectData.position.y, objectData.position.z);
                }
                if (objectData.rotation) {
                    object.setRotation(objectData.rotation);
                }
                if (objectData.dimension) {
                    object.setDimension(objectData.dimension.width, objectData.dimension.height);
                }
                if (objectData.texture) {
                    object.setTexture(sj.texture.get(objectData.texture.name), objectData.texture.left, objectData.texture.top, objectData.texture.right, objectData.texture.bottom);
                }
                if (objectData.visibility) {
                    object.setVisible(objectData.visibility);
                }
            }
        }

        if (data && data.sounds) {
            for (var i in data.sounds) {
                var sound = data.sounds[i];
                scene.attachSound(sound);
            }
        }

        if (data && data.textures) {
            for (var j in data.textures) {
                sj.texture.load(data.textures[j]);
            }
        }
    }

    return {
        /**
         * Creates new scene
         * @param  {[type]} render [description]
         * @param  {[type]} data   [description]
         * @return {SJScene}        [description]
         */
        create: function (render, data) {
            return new SJScene(render, data);
        }
    };
});

window.SJ.module('canvas', function(sj) {
    

    var fps = sj.config('canvas', 'fps') || 20, // fps value
        frameTime = 1000/fps, // calculated frame duration
        scenes = {}, // scene list
        runningScene, // current running scene - one in the momemnt - stores name of scene - not object
        runThread = false, // determines if thread is running
        render, // renderer object
        element = document.getElementById(sj.config('canvas', 'canvas_id')), // canvas html element (DOM)
        loaderName = sj.config('canvas', 'loader') || 'loader';

    /**
     * Thread function -  it is run in loop
     */
    function run() {
        // current time
        var time = (new Date()).getMilliseconds();
        // run if scene is selected
        if (runningScene) {
            // running scene object
            var scene = scenes[runningScene];
            // execute app defined action - on frame
            if (scene.onFrame) {
                scene.onFrame();
            }
            // run default scene frame action - defined by framework
            scene.frame();
        }
        // continue "thread" only if it was stoped
        if (runThread) {
            // run again function after frameTime (minus processing frame time)
            setTimeout(run, Math.max(1,frameTime - (new Date()).getMilliseconds() + time));
        }
    }

    return {
        /**
         * Initialize canvas = sets renderer options
         */
        init : function() {
            // get render name (render is module)
            render = sj[sj.config('canvas', 'render') || 'h4render'];
            // handle missing render
            if (!render) {
                throw new Error("Render not found!");
            }

            // initalize render using options
            render.init(
                element,
                sj.config('canvas', 'width') || 1,
                sj.config('canvas', 'height') || 1
            );
        },
        /**
         * Creates new scene with given name
         *
         * @param {String} name Scene name
         * @param {Object|undefined} data Scene data - it allows to create ready scene from scene config
         * @returns {SJScene}
         */
        createScene : function(name, data) {
            // handles situation when scene with given name exists
            if (scenes[name]) {
                throw new Error("Scene name '" + name + "' alredy exists");
            }
            // store and return new scene
            scenes[name] = sj.scene.create(render, data);
            return scenes[name];
        },
        /**
         * Set scene as running
         *
         * @param {String} name Scene name
         */
        loadScene : function(name) {
            // get scene
            var scene = scenes[name],
            // get loader
            loader = sj.canvas.getLoader();

            // set loader - show initaial screen
            loader.start(element);

            // handle non existing scene
            if (!scene) {
                throw new Error("Scene name '" + name + "' does not exists");
            }

            // stop previous scene if running
            if (runningScene) {
                // retrieve previous scene
                scene = scenes[runningScene];
                // run app defined action onStop
                if (scene.onStop) {
                    scene.onStop();
                    // set loader progress
                    loader.progress(element, 25);
                }
                // stop scene - framework acrion
                scene.stop();
            }

            // mark progress
            loader.progress(element, 50);

            // store running scene name
            runningScene = name;
            // retrieve running scene object
            scene = scenes[runningScene];

            // run app defined action onStart
            if(scene.onStart) {
                scene.onStart();
                // mark progress
                loader.progress(element, 75);
            }
            // mark final progress
            loader.progress(element, 100);
            // finish loader actions
            loader.finish(element, scene.start);
        },
        /**
         * Reloads the same scene - all loading process is performed again
         */
        reloadScene : function() {
            sj.canvas.loadScene(runningScene);
        },
        /**
         * Returns scene related to given name
         * @param {String} name Scene name
         * @returns {Scene|undefined} Scene object
         */
        getScene : function(name) {
            return scenes[name];
        },
        /**
         * Removes scene
         *
         * @param {String} name Scene name
         */
        removeScene : function(name) {
            // handle not existing scene
            if (scenes[name]) {
                throw new Error("Scena name '" + name + "' alredy exists");
            }
            // handle removing running scene
            if (runningScene === name) {
                throw new Error("Cannot remove running scene");
            }
            // handle framework defined on destroy function
            if (scenes[name].onDestroy) {
                scenes[name].onDestroy();
            }
            // destory scene
            scenes[name].destroy();
            // delete scene object
            delete scenes[name];
        },
        /**
         * Start rendering frame by freame
         */
        start : function () {
            // handle already running canvas
            if (!runThread) {
                // set proper flag
                runThread = true;
                // run thread
                run();
            }
        },
        /**
         * Stop frame rendering
         */
        stop : function () {
            // stop only if it is already running
            if (runThread) {
                // set proper flag
                runThread = false;
            }
        },
        /**
         * Returns cavnas element
         * @return {DOMElement}
         */
        getCanvas : function() {
            return element;
        },
        /**
         * Returns loader
         * @return {Object} loader object
         */
        getLoader : function() {
            return sj[loaderName];
        }
    };
});

window.SJ.module('sound', function(sj) {
    

    var config = sj.config("sound", "sounds"),
        sounds = {};


    function SJSound() {
        var instance = this;
        instance.play = function() {
            instance.sound.currentTime = 0;
            instance.sound.play();
        };
    }

    for (var name in config) {
        sounds[name] = new SJSound();
        sounds[name].name = name;
    }

    function exists(name) {
        if (!config[name]) {
            throw new Error("Sound '" + name + "' not defined!");
        }
        return true;
    }

    return {
        /**
         * Loads sound to memory (loads file)
         * @param  {String} name Sound name (represents name from config file)
         */
        load : function(name) {
            if (exists(name) && !sounds[name].sound) {
                sounds[name].sound = sj.utils.loadSound(config[name]);
            }
        },
        /**
         * Unloads sound from memory (unloads file)
         * @param  {String} name Sound name (represents name from config file)
         */
        unload : function(name) {
            if (exists(name) && sounds[name].image) {
                delete sounds[name].image;
            }
        },
        /**
         * Gets sound
         * @param  {SJSound} name Sound name (represents name from config file)
         */
        get : function(name) {
            if (exists(name)) {
                return sounds[name];
            }
        },
        /**
         * Check if sound is loaded
         * @param  {String} name Sound name (represents name from config file)
         */
        loaded : function(name) {
            if (exists(name)) {
                return !!sounds[name].image;
            }
        }
    };
});

window.SJ.module('input', function(sj) {
    

    var canvas = sj.canvas.getCanvas(),
        listeners = {},
        ratioX = canvas.offsetWidth / (sj.config('canvas', 'width') || 1),
        ratioY = canvas.offsetHeight / (sj.config('canvas', 'height') || 1);

    /**
     * Attaches event related to pressing keyCode
     * @param  {String} eventName Javascript event name, ie: keydown, keyup
     * @param  {Function} listener Listens to event, one argument is passed - key code
     * @param  {Boolean} preventDefault Optional - determines if default action shoul be taken - turned of by default
     */
    function attachKeyEvent(eventName, listener, preventDefault) {
        var currentListener = listeners[eventName];
        detachKeyEvent(eventName);
        listeners[eventName] = listener;
        document.addEventListener(eventName, function(event) {
            if (preventDefault) {
                event.preventDefault();
            }
            listener(event.keyCode);
        });
    }
    /**
    * Attaches event related to mouse actions, ie: move, clicl
     * @param  {String} eventName Javascript event name, ie: mousemove, clik
     * @param  {Function} listener Listens to event, two argument are mouse position of action (x, y) regarding canvas size
     * @param  {Boolean} preventDefault Optional - determines if default action shoul be taken - turned of by default
     */
    function attachMouseEvent(eventName, listener, preventDefault) {
        var currentListener = listeners[eventName];
        detachMouseEvent(eventName);
        listeners[eventName] = listener;
        canvas.addEventListener(eventName, function(event) {
            if (preventDefault) {
                event.preventDefault();
            }
            listener((event.pageX - canvas.offsetLeft )/ratioX, (event.pageY - canvas.offsetTop)/ratioY);
        });
    }

    /**
     * Detaches event with given name
     * @param  {String} eventName
     * @param  {Object} DOM element
     */
    function detachMouseEvent(eventName) {
        var currentListener = listeners[eventName];
        if (currentListener) {
            // remove previous listener
            canvas.removeEventListener(eventName, currentListener);
            // dispose previous listener
            delete listeners[eventName];
        }
    }

    /**
     * Detaches event with given name
     * @param  {String} eventName
     * @param  {Object} DOM element
     */
    function detachKeyEvent(eventName) {
        var currentListener = listeners[eventName];
        if (currentListener) {
            // remove previous listener
            document.removeEventListener(eventName, currentListener);
            // dispose previous listener
            delete listeners[eventName];
        }
    }

    return {
        KEY_BACKSPACE: 8,
        KEY_TAB : 9,
        KEY_ENTER : 13,
        KEY_SHIFT : 16,
        KET_CTRL : 17,
        KEY_ALT : 18,
        KEY_ESCAPE : 27,
        KEY_LEFT : 37,
        KEY_UP : 38,
        KEY_RIGHT : 39,
        KEY_DOWN : 40,
        onKeyDown : function(listener, preventDefault) {
            attachKeyEvent('keydown', listener, preventDefault);
        },
        onKeyUp : function(listener, preventDefault) {
            attachKeyEvent('keyup', listener, preventDefault);
        },
        onMouseMove : function(listner, preventDefault) {
            attachMouseEvent('mousemove', listner, preventDefault);
        },
        onMouseClick : function(listner, preventDefault) {
            attachMouseEvent('click', listner, preventDefault);
        },
        clearKeyDown : function() {
            detachKeyEvent('keydown');
        },
        clearKeyUp : function() {
            detachKeyEvent('keyup');
        },
        clearMouseMove : function() {
            detachMouseEvent('mousemove');
        },
        clearMouseClick : function() {
            detachMouseEvent('click');
        }
    };
});

window.SJ.module('animation', function(sj) {
    

    function SJAnimation(o) {
        var animation = this,
            object = o,
            step = 1,
            currentStep = 0,
            currentFrame = 0,
            frames = [],
            loopped = true,
            stopped = false;

        animation.addFrame = function(texture, left, top, right, bottom) {
            frames.push({
                texture: texture,
                left: left,
                top: top,
                right: right,
                bottom: bottom
            });
        };

        animation.setStep = function (s) {
            step = s;
        };

        animation.setLooped = function (l) {
            looped = l;
        };

        animation.setCurrentFrame = function (f) {
            currentFrame = f | 0;
            currentStep = f*step;
            stopeed = false;
        };

        animation.play = function (s) {
            var nextFrame = Math.floor(currentStep/step);
            if (nextFrame !== currentFrame) {
                if (nextFrame < frames.length || loopped) {
                    var frameData = frames[nextFrame % frames.length];
                    object.setTexture(frameData.texture, frameData.left, frameData.top, frameData.right, frameData.bottom);
                    currentFrame = nextFrame;
                } else {
                    stopped = true;
                }
            }
            currentStep++;
        };

        animation.hasStopped = function () {
            return stopped;
        };

    }

    return {
        create: function(object) {
            return new SJAnimation(object);
        }
    };

});

window.SJ.module('default', function(sj) {
    

    return {
        start : function() {
            alert("Welcome to sj.js\nI hope you will enjoy it!");
        }
    };
});

window.SJ.module('loader', function(sj) {
    

    var loader, progress;

    return {
        /**
         * Starts loader
         * @param  {CanvasObject} canvas Canvas object
         */
        start: function(canvas) {
            setTimeout(function() {
                if (!loader) {
                    var footer, title = document.createElement('div');
                    title.style.fontFamily = "'Lucida Console', Monaco, monospace";
                    title.style.position = "relative";
                    title.style.textAlign = "center";
                    title.style.lineHeight = "0px";
                    progress = title.cloneNode();
                    footer = title.cloneNode();
                    title.style.fontSize = "20px";
                    title.style.top = "45%";
                    title.innerHTML = "[SJ.JS]";
                    progress.style.fontSize = "15px";
                    progress.style.top = "70%";
                    progress.innerHTML = "(0%)";
                    footer.style.fontSize = "10px";
                    footer.style.top = "85%";
                    footer.innerHTML = "https://github.com/jagusiak/sj.js";
                    loader = canvas.cloneNode();
                    loader.style.backgroundColor = 'darkslategrey';
                    loader.style.color = 'white';
                    loader.appendChild(title);
                    loader.appendChild(progress);
                    loader.appendChild(footer);
                }
                canvas.parentNode.replaceChild(loader, canvas);
            },1);
        },
        /**
         * Marks progress
         * @param  {CanvasObject} canvas Canvas object to watch progress
         * @param  {Integer} percentage Percentage value
         */
        progress : function(canvas, percentage) {
            setTimeout(function() {
                progress.innerHTML = "(" + Math.round(percentage) + "%)";
            }, 1);
        },
        /**
         * Marks finish
         * @param  {CanvasObject} canvas Canvas object to watch progress
         * @param  {Function} callback Mark function finish
         */
        finish: function(canvas, callback) {
            setTimeout(function() {
                loader.parentNode.replaceChild(canvas, loader);
                callback();
            }, 1000);
        }
    };
});

window.SJ.module('qte_start', function(sj) {

    return {
        'init' : function() {
            var canvas = sj.canvas,
                scene, background, animation, guy;

            canvas.init();
            scene = canvas.createScene('scene_1', sj.config('scenes', 'run'));
            background = scene.getObject('background');
            guy = scene.getObject('guy');
            animation = sj.animation.create(guy);
            animation.setStep(4);
            for (var i = 0; i < 6; i++) {
                animation.addFrame(guy.texture, i/6, 0, (i+1)/6, 1);
            }

            scene.onFrame = function () {
                background.setTexture(background.texture, background.textureLeft + 0.1, background.textureTop, background.textureRight + 0.1, background.textureBottom);
                animation.play();
            };

            canvas.start();
            canvas.loadScene('scene_1');
        }
    };

});

window.SJ.module('qte_run', function(sj) {

    return {
        'init' : function() {
            var canvas = sj.canvas,
                scene,
                keys = ['q', 'e', 't'],
                keyObjects = {},
                pressed = {},
                frameCounter = 0;

            canvas.init();
            scene = canvas.createScene('scene_1', sj.config('scenes', 'keys'));


            for (var i in keys) {
                var keyName = keys[i];
                keyObjects[keyName] = scene.getObject('key_' + keyName);
            }

            scene.onFrame = function () {
                frameCounter++;
                for (var i in keys) {
                    keyObjects[keys[i]].setVisible((Math.floor(frameCounter/200) % 3) == i);
                }
            };

            sj.input.onKeyDown(function(key) {
                var code = String.fromCharCode(key).toLowerCase(), object = keyObjects[code];
                if (object && !pressed[code]) {
                    object.setDimension(object.width, object.height/2);
                    object.setPosition(object.x, object.y+object.height/2, object.z);
                    pressed[code] = true;
                }
            });

            sj.input.onKeyUp(function(key) {
                var code = String.fromCharCode(key).toLowerCase(), object = keyObjects[code];
                if (object) {
                    object.setPosition(object.x, object.y-object.height/2, object.z);
                    object.setDimension(object.width, object.height*2);
                    pressed[code] = false;
                }
            });

            canvas.start();
            canvas.loadScene('scene_1');
        }
    };

});
setTimeout(window.SJ[window.SJ.settings.init.module][window.SJ.settings.init.action], 1);

        return true;
    }

    return {
        init: init,
        script : script,
        json : json,
        getApp : function() { return app; }
    };
}());
