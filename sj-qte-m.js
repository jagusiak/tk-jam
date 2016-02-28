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
        window.SJ.settings = {"configuration": {"canvas": {"scope": "FULL", "file": "canvas"}, "texture": {"scope": "APP", "file": "texture"}, "sound": {"scope": "APP", "file": "sound"}, "scenes": {"scope": "APP", "file": "scenes"}, "keys": {"scope": "APP", "file": "keys"}}, "modules": {"utils": "sj/modules/utils", "h4render": "sj/modules/h4render", "texture": "sj/modules/texture", "canvasobject": "sj/modules/canvasobject", "scene": "sj/modules/scene", "canvas": "sj/modules/canvas", "sound": "sj/modules/sound", "input": "sj/modules/input", "animation": "sj/modules/animation", "default": "sj/modules/default", "loader": "sj/modules/loader", "qte_start": "APP_NAME/modules/qte_start", "qte_run": "APP_NAME/modules/qte_run", "qte_intro": "APP_NAME/modules/qte_intro", "qte_generator": "APP_NAME/modules/qte_generator", "qte_game": "APP_NAME/modules/qte_game", "letters": "APP_NAME/modules/combos/letters", "pair": "APP_NAME/modules/combos/pair", "single": "APP_NAME/modules/combos/single", "choice": "APP_NAME/modules/combos/choice", "triple": "APP_NAME/modules/combos/triple", "sequence": "APP_NAME/modules/combos/sequence", "random": "APP_NAME/modules/combos/random", "listener": "APP_NAME/modules/combos/listener", "numbers": "APP_NAME/modules/combos/numbers", "arrows": "APP_NAME/modules/combos/arrows"}, "init": {"module": "qte_intro", "action": "init"}};
window.SJ.config = (function(configuration) {var data = configuration; return function(name, item) {return data[name][item]; };}({"sound": {"sounds": {"soundtrack": "sounds/soundtrack96_1.mp3"}}, "keys": {"keys": {"w": 0.5, "k": 0.5, "r": 0.5, "z": 0.5, "e": 0.5, "m": 0.5, "p": 0.5, "g": 0.5, "x": 0.5, "i": 0.5, "h": 0.5, "a": 0.5, "o": 0.5, "c": 0.5, "v": 0.5, "n": 0.5, "d": 0.5, "b": 0.5, "j": 0.5, "f": 0.5, "q": 0.5, "t": 0.5, "l": 0.5, "u": 0.5, "y": 0.5, "s": 0.5}}, "canvas": {"width": 1.5, "loader": "loader", "redner": "h4renderer", "fps": 25, "height": 1.0, "canvas_id": "sj-canvas"}, "scenes": {"welcome": {"textures": [], "objects": {"any_key": {"rotation": 0.0, "visibility": true, "dimension": {"width": 0.4, "height": 0.1}, "position": {"z": 8, "x": 0.75, "y": 0.8}, "texture": {"left": 0, "name": "any_key", "bottom": 1, "top": 0, "right": 1}}, "guy": {"rotation": 0.0, "visibility": true, "dimension": {"width": 0.8, "height": 0.8}, "position": {"z": 3, "x": 1.0, "y": 0.3}, "texture": {"left": 0, "name": "anim", "bottom": 1, "top": 0, "right": 1}}, "back": {"rotation": 0.0, "visibility": true, "dimension": {"width": 1.5, "height": 1}, "position": {"z": 1, "x": 0.75, "y": 0.5}, "texture": {"left": 0, "name": "logo", "bottom": 1, "top": 0, "right": 1}}}, "sounds": []}, "run": {"textures": [], "objects": {"progress": {"rotation": 0.0, "visibility": true, "dimension": {"width": 0.3, "height": 0.04}, "position": {"z": 8, "x": 0.18, "y": 0.05}, "texture": {"left": 0, "name": "progress", "bottom": 1, "top": 0, "right": 1}}, "stink": {"rotation": 0.0, "visibility": false, "dimension": {"width": 0.2, "height": 0.2}, "position": {"z": 11, "x": 0.8, "y": 0.35}, "texture": {"left": 0, "name": "stink", "bottom": 1, "top": 0, "right": 0.5}}, "background": {"rotation": 0.0, "visibility": true, "dimension": {"width": 3, "height": 1.0}, "position": {"z": 2, "x": 0.75, "y": 0.5}, "texture": {"left": 0, "name": "bg_1", "bottom": 1, "top": 0, "right": 8}}, "ob_6": {"rotation": 0.0, "visibility": false, "dimension": {"width": 0.25, "height": 0.25}, "position": {"z": 3, "x": 0.75, "y": 0.45}, "texture": {"left": 0, "name": "obstacles", "bottom": 1, "top": 0, "right": 0.33}}, "ob_1": {"rotation": 0.0, "visibility": false, "dimension": {"width": 0.15, "height": 0.15}, "position": {"z": 3, "x": 0.75, "y": 0.5}, "texture": {"left": 0.35, "name": "obstacles", "bottom": 1, "top": 0.45, "right": 0.52}}, "ob_0": {"rotation": 0.0, "visibility": false, "dimension": {"width": 0.15, "height": 0.15}, "position": {"z": 3, "x": 0.75, "y": 0.5}, "texture": {"left": 0.35, "name": "obstacles", "bottom": 1, "top": 0.45, "right": 0.52}}, "ob_2": {"rotation": 0.0, "visibility": false, "dimension": {"width": 0.15, "height": 0.15}, "position": {"z": 3, "x": 0.75, "y": 0.5}, "texture": {"left": 0.35, "name": "obstacles", "bottom": 1, "top": 0.45, "right": 0.52}}, "any_key": {"rotation": 0.0, "visibility": false, "dimension": {"width": 0.4, "height": 0.1}, "position": {"z": 20, "x": 0.75, "y": 0.615}, "texture": {"left": 0, "name": "any_key", "bottom": 1, "top": 0, "right": 1}}, "ob_3": {"rotation": 0.0, "visibility": false, "dimension": {"width": 0.25, "height": 0.25}, "position": {"z": 3, "x": 0.75, "y": 0.45}, "texture": {"left": 0, "name": "obstacles", "bottom": 1, "top": 0, "right": 0.33}}, "ob_5": {"rotation": 0.0, "visibility": false, "dimension": {"width": 0.25, "height": 0.25}, "position": {"z": 3, "x": 0.75, "y": 0.45}, "texture": {"left": 0.66, "name": "obstacles", "bottom": 1, "top": 0, "right": 1.0}}, "guy": {"rotation": 0.0, "visibility": true, "dimension": {"width": 0.4, "height": 0.4}, "position": {"z": 3, "x": 0.75, "y": 0.4}, "texture": {"left": 0, "name": "anim", "bottom": 1, "top": 0, "right": 0.09}}, "ob_4": {"rotation": 0.0, "visibility": false, "dimension": {"width": 0.25, "height": 0.25}, "position": {"z": 3, "x": 0.75, "y": 0.45}, "texture": {"left": 0.66, "name": "obstacles", "bottom": 1, "top": 0, "right": 1.0}}}, "sounds": []}}, "texture": {"textures": {"obstacles": "images/sprite_obstacle.png", "progress": "images/progress.png", "key_e": "images/e.png", "stink": "images/stink.png", "numbers": "images/numbers.png", "bg_1": "images/bg_1.png", "key_q": "images/q.png", "jump": "images/agentjump.png", "letters": "images/letters.png", "key_t": "images/t.png", "anim": "images/agent.png", "logo": "images/logo.png", "any_key": "images/any_key.png", "arrows": "images/arrows.png"}}}));
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
                div = object.rh4,
                posX = (bgWidth == 100 ? 100 * object.textureLeft : (object.textureLeft/(1-((object.textureRight - object.textureLeft)))*100)),
                posY = (bgHeight == 100 ? 100 * object.textureTop : (object.textureTop/(1-((object.textureBottom - object.textureTop)))*100));
        div.style.backgroundImage = "url('" + object.texture.image.src + "')";
        div.style.backgroundSize = bgWidth + "% " + bgHeight + "%";
        div.style.backgroundPosition = posX + "% " + posY + "%";
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
                object.setVisible(objectData.visibility);
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
            if (!scenes[name]) {
                throw new Error("Scena name does not '" + name + "' alredy exist");
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
        listeners[eventName] = function(event) {
            if (preventDefault) {
                event.preventDefault();
            }
            listener(event.keyCode);
        };
        document.addEventListener(eventName, listeners[eventName]);
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
        listeners[eventName] = function(event) {
            if (preventDefault) {
                event.preventDefault();
            }
            listener((event.pageX - canvas.offsetLeft )/ratioX, (event.pageY - canvas.offsetTop)/ratioY);
        };
        canvas.addEventListener(eventName, listeners[eventName]);
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
            loopped = l;
        };

        animation.setCurrentFrame = function (f) {
            currentFrame = f | 0;
            currentStep = f*step;
            stopped = false;
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

window.SJ.module('qte_start', function (sj) {

    return {
        'init': function () {
            var canvas,
                scene, background, frame = 0,
                animation, guy,
                letters = sj.letters, letter, letterObjects = [],
                listener,
                generator, generated;

            canvas = sj.canvas;
            canvas.init();

            generator = sj.qte_generator;
            generated = generator.next();

            listener = sj.listener;

            scene = canvas.createScene('scene_1', sj.config('scenes', 'run'));

            for (var i = 0; i < 1; i++) {
                var letterObj = scene.createObject('a');
                letterObjects['a'] = letterObj;
                letters.set(letterObj, i, i, i);
            }

            background = scene.getObject('background');
            guy = scene.getObject('guy');

            animation = sj.animation.create(guy);
            animation.setStep(4);

            for (var i = 0; i < 6; i++) {
                animation.addFrame(guy.texture, i / 6, 0, (i + 1) / 6, 1);
            }

            scene.onFrame = function () {
                frame++;

                background.setTexture(
                    background.texture,
                    background.textureLeft + 0.1,
                    background.textureTop,
                    background.textureRight + 0.1,
                    background.textureBottom);
                animation.play();

                for (var obj in letterObjects) {
                    letters.state(letterObjects[obj], letters.STATE_CORRECT);
                }

                if (frame % 30) {
                    listener.clear();
                    generated = generator.next();
                }
            };

            sj.input.onKeyDown(function(key) {
                listener.down(String.fromCharCode(key).toLowerCase(), frame);
            });

            sj.input.onKeyUp(function(key) {
                listener.up(String.fromCharCode(key).toLowerCase(), frame);
            });

            canvas.start();
            canvas.loadScene('scene_1');
        }
    };

});

window.SJ.module('qte_run', function(sj) {

    return {
        'init' : function() {
            var canvas = sj.canvas,
                scene, generator = sj.qte_generator, generated = generator.next(),
                keys, listener = sj.listener,
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
                    keyObjects[keys[i]].setVisible(true);
                }

                if(frameCounter % 30 === 0){
                    listener.clear();

                    generated = generator.next();
                }
            };

            sj.input.onKeyDown(function(key) {
                listener.down(String.fromCharCode(key).toLowerCase(), frameCounter);
            });

            sj.input.onKeyUp(function(key) {
                listener.up(String.fromCharCode(key).toLowerCase(), frameCounter);
            });

            canvas.start();
            canvas.loadScene('scene_1');
        }
    };

});

window.SJ.module('qte_intro', function(sj) {

    return {
        'init' : function() {
            var canvas = sj.canvas, scene, animation, object, frame = 0;

            canvas.init();

            scene = canvas.createScene('welcome', sj.config('scenes', 'welcome'));
            object = scene.getObject('guy');

            animation = sj.animation.create(object);

            for (var i = 0; i < 6; i++) {
                animation.addFrame(object.texture, i / 16, 0, (i + 1) / 16, 1);
            }

            scene.onFrame = function () {
                frame++;
                scene.getObject("any_key").setVisible(Math.floor(frame/10) % 2);

                animation.play();
            };

            sj.input.onKeyDown(function(key) {
                sj.input.clearKeyDown();
                sj.qte_game.init();

            });

            canvas.start();
            canvas.loadScene('welcome');
        }
    };

});

window.SJ.module('qte_generator', function (sj) {
    return {
        'next': function () {
            var types = [sj.single, sj.pair, sj.choice, sj.sequence, sj.triple],
                random = types[types.length * Math.random() << 0];

            return random.next();
        }
    };
});

window.SJ.module('qte_game', function (sj) {
    var canvas, scene, currentLocation = 0, canvasWidth = 1.5, speed = 0.02, speed_add = 0, runAnimation, jumpAnimation, slideAnimation, stinkAnimation,
        loadAnimations = function () {
            var guy = scene.getObject('guy'), stink = scene.getObject('stink');
            runAnimation = sj.animation.create(guy);
            jumpAnimation = sj.animation.create(guy);
            slideAnimation = sj.animation.create(guy);
            stinkAnimation = sj.animation.create(stink);
            jumpAnimation.setStep(4);
            jumpAnimation.setLooped(false);
            stinkAnimation.setStep(4);
            slideAnimation.setStep(7);
            slideAnimation.setLooped(false);


            for (var i = 0; i < 6; i++) {
                runAnimation.addFrame(guy.texture, i / 16, 0, (i + 1) / 16, 1);
            }
            for (i = 6; i < 10; i++) {
                jumpAnimation.addFrame(guy.texture, i / 16, 0, (i + 1) / 16, 1);
            }
            for (i = 11; i < 13; i++) {
                slideAnimation.addFrame(guy.texture, i / 16, 0, (i + 1) / 16, 1);
            }
            for (i = 0; i < 2; i++) {
                stinkAnimation.addFrame(stink.texture, i / 2, 0, (i + 1) / 2, 1);
            }
        },
        run = function () {
            var background, obstacle, currentAnimation, guy,
                frame = 0, phase_counter = 0,
                letters, letter, letterObjects = [],
                numbers, numberObjects = [],
                arrows, arrowObject, arrowAnimation,
                listener, blinking = false,
                generator, generated, progress, generateObstacle = true, obstacles = [],
                downObstacles = ['ob_0', 'ob_1', 'ob_2'], upObstacles = ['ob_3', 'ob_4', 'ob_5', 'ob_6'], j = 0, currentObstacle, done = false;
            canvas = sj.canvas;
            canvas.init();

            if (!scene) {
                scene = canvas.createScene('scene_1', sj.config('scenes', 'run'));
            }
            background = scene.getObject('background');

            progress = scene.getObject("progress");
            guy = scene.getObject('guy');

            loadAnimations();

            sj.sound.load('soundtrack');
            sj.sound.get('soundtrack').play();

            for (var n in downObstacles) {
                obstacles[j] = scene.getObject(downObstacles[n]);
                obstacles[j]['animation'] = jumpAnimation;
                j++;
            }

            for (n in upObstacles) {
                obstacles[j] = scene.getObject(upObstacles[n]);
                obstacles[j]['animation'] = slideAnimation;
                j++;
            }

            numbers = sj.numbers;
            numberObjects = numbers.init(scene);

            generator = sj.qte_generator;
            generated = generator.next();

            letters = sj.letters;
            letterObjects = letters.init(scene);

            arrows = sj.arrows;
            arrowObject = arrows.init(scene);

            listener = sj.listener;
            currentAnimation = runAnimation;

            scene.onFrame = function () {
                var leftSeconds = 10 - Math.floor(frame / 25), select;
                frame++;

                progress.setTexture(progress.texture, 0, 0, leftSeconds / 10, 1);
                progress.setPosition(0.02 * leftSeconds + 0.03, 0.03, 10);
                progress.setDimension(0.04 * leftSeconds, 0.04);

                if (leftSeconds < 0) {
                    stinkAnimation.play();
                    scene.getObject("stink").setVisible(true);
                    scene.getObject("any_key").setVisible(true);
                    guy.setTexture(guy.texture, 14 / 16, 0, 15 / 16, 1);
                    sj.input.onKeyDown(function () {
                        frame = 0;
                        scene.getObject("stink").setVisible(false);
                        scene.getObject("any_key").setVisible(false);
                        generateObstacle = true;
                        for (var o in obstacles) {
                            obstacles[o].setVisible(false);
                        }
                        currentObstacle = undefined;
                        blinking = 0;
                        guy.setVisible(true);
                        sj.input.onKeyDown(function (key) {
                            listener.down(String.fromCharCode(key).toLowerCase(), frame);
                        });

                        sj.input.onKeyUp(function (key) {
                            listener.up(String.fromCharCode(key).toLowerCase(), frame);
                        });

                        listener.resetScore();

                        sj.numbers.set(numberObjects.tenth, numberObjects.unit, 0);
                        sj.sound.get('soundtrack').play();
                    });
                    return;
                }

                if (generateObstacle) {
                    select = Math.floor(Math.random() * obstacles.length);
                    while (obstacles[select].visible) {
                        select = Math.floor(Math.random() * obstacles.length);
                    }
                    var o = obstacles[select];
                    o.setPosition(frame < 5 ? -0.7 : -0.4, o.y, o.z);
                    o.setVisible(true);
                    generateObstacle = false;
                }

                if (frame - blinking < 0) {
                    guy.setVisible(frame % 2);
                } else {
                    guy.setVisible(true);
                }

                background.setPosition(currentLocation - Math.floor(currentLocation / 1.5) * 1.5, background.y, background.z);
                currentAnimation.play();
                if (currentAnimation.hasStopped()) {
                    currentAnimation = runAnimation;
                }


                currentLocation += speed;
                if (undefined !== arrowAnimation) {
                    arrowAnimation.play();
                }

                for (select in obstacles) {
                    var ob = obstacles[select];
                    if (ob.visible) {
                        ob.setPosition(ob.x + speed, ob.y, ob.z);
                        if (ob.x > 1.8) {
                            ob.setVisible(false);
                        }
                        if (ob.x > -0.5 && ob.x < 0.50 && !currentObstacle) {
                            currentObstacle = ob;
                            phase_counter = 0;

                            listener.clear();
                            generated = generator.next();

                            arrowAnimation = arrows.set(arrowObject, generated.type);

                            for (var obj in sj.config('keys', 'keys')) {
                                var ind = generated.keys.indexOf(obj), letter = letterObjects[obj];
                                if (ind != -1) {
                                    letters.position(letter, ind);

                                    letter.setVisible(true);
                                } else {
                                    letter.setVisible(false);
                                }
                            }
                            speed = 0.02;
                            done = false;


                        }
                        if (currentObstacle && currentObstacle.x > 0.50) {
                            generateObstacle = true;
                            if (done) {
                                currentAnimation = currentObstacle.animation;
                                currentAnimation.setCurrentFrame(0);
                            } else {
                                blinking = frame + 20;

                                // wyłącz
                            }
                            currentObstacle = undefined;
                            listener.clear();
                        }
                    }

                }

                if (done) {
                    speed = 0.06;
                }

                if (currentObstacle) {
                    for (var obj in generated.keys) {
                        var ident = generated.keys[obj], check = listener.check(generated, ident, numberObjects);

                        letters.state(letterObjects[ident], check);

                        if (sj.letters.STATE_CORRECT === check) {
                            done = true;
                            listener.clear();
                        }
                    }
                }

            };

            sj.input.onKeyDown(function (key) {
                listener.down(String.fromCharCode(key).toLowerCase(), frame);
            });

            sj.input.onKeyUp(function (key) {
                listener.up(String.fromCharCode(key).toLowerCase(), frame);
            });

            canvas.start();
            canvas.loadScene('scene_1');
        };


    return {
        'init': run
    };

});

window.SJ.module('letters', function (sj) {

    return {
        STATE_IDLE: 0,
        STATE_CORRECT: 1,
        STATE_INCORRECT: 2,
        STATE_PART: 3,

        POS_TOP: 0,
        POS_MIDDLE: 1,
        POS_BOTTOM: 2,

        POS_OFFSET: 0.10,

        BASE_X: 0.75,
        BASE_Y: 0.728,
        BASE_Z: 10,

        DIVIDER_X: 0.25,
        DIVIDER_Y: 0.03846,

        'init': function (scene) {
            var objects = {}, iterator = 0;
            for (var i in sj.config('keys', 'keys')) {
                var obj = scene.createObject(i);

                objects[i] = obj;
                sj.letters.set(obj, iterator++, sj.letters.STATE_IDLE, 0);
            }

            return objects;
        },
        'set': function (object, letter, state, position) {
            var letters, left = state * sj.letters.DIVIDER_X, top = letter * sj.letters.DIVIDER_Y;

            sj.texture.load('letters');

            object.setTexture(
                sj.texture.get('letters'),
                left,
                top,
                left + sj.letters.DIVIDER_X,
                top + sj.letters.DIVIDER_Y);
            object.setDimension(0.09, 0.09);
            object.setPosition(0.75, 0.728 + position * sj.letters.POS_OFFSET, sj.letters.BASE_Z);
            object.setVisible(false);
        },
        'position': function (object, position) {
            object.setPosition(sj.letters.BASE_X, sj.letters.BASE_Y + position * sj.letters.POS_OFFSET, sj.letters.BASE_Z);
        },
        'state': function (object, state) {
            var left = state * sj.letters.DIVIDER_X;
            object.setTexture(object.texture, left, object.textureTop, left + sj.letters.DIVIDER_X, object.textureBottom);
        }
    };

});

window.SJ.module('pair', function(sj) {
    return {
        'next' : function () {
            var keys = sj.config('keys', 'keys'),
                r = sj.random,
                a = r.get(), b = r.get();

            while(b === a) {
                b = r.get();
            }

            return {
                type: sj.arrows.TYPE_PAIR,
                keys: [
                    a, b
                ],
                points: 2
            };
        }
    };
});

window.SJ.module('single', function(sj) {
    return {
        'next' : function () {
            var keys = sj.config('keys', 'keys'),
                r = sj.random;
            return {
                type: sj.arrows.TYPE_SINGLE,
                keys: [
                    r.get()
                ],
                points: 1
            };
        }
    };
});

window.SJ.module('choice', function (sj) {
    return {
        'next': function () {
            var keys = sj.config('keys', 'keys'),
                r = sj.random,
                a = r.get(), b = r.get();

            while (b === a) {
                b = r.get();
            }

            return {
                type: sj.arrows.TYPE_CHOICE,
                keys: [
                    a, b
                ],
                points: 1
            };
        }
    };
});

window.SJ.module('triple', function (sj) {
    return {
        'next': function () {
            var keys = sj.config('keys', 'keys'),
                r = sj.random,
                a = r.get(), b = r.get(), c = r.get();

            while (b === a) {
                b = r.get();
            }

            while (c === a || c === b) {
                c = r.get();
            }

            return {
                type: sj.arrows.TYPE_TRIPLE,
                keys: [
                    a, b, c
                ],
                points: 3
            }
        }
    };
});

window.SJ.module('sequence', function(sj) {
    return {
        'next' : function () {
            var keys = sj.config('keys', 'keys'),
                r = sj.random,
                a = r.get(), b = r.get(), c = r.get();

            while(b === a) {
                b = r.get();
            }

            while(c === a || c === b) {
                c = r.get();
            }

            return {
                type: sj.arrows.TYPE_SEQUENCE,
                keys: [
                    a, b, c
                ],
                points: 4
            };
        }
    };
});

window.SJ.module('random', function(sj) {
    return {
        'get' : function () {
            var keys = sj.config('keys', 'keys'),
                distrib = {},
                rand, selected,
                sum = 0;

            for (var i in keys) {
                sum += parseFloat(keys[i]);
                distrib[i] = sum;
            }

            rand = Math.random() * sum;

            for (var j in distrib) {
                if (distrib[j] >= rand) {
                    return j;
                }
            }
        }
    };
});

window.SJ.module('listener', function (sj) {
    var memory = {}, score = 0, tryout;

    var internal_min = function (obj) {
        var local;

        for (var i in obj) {
            if (obj[i] !== -1) {
                if (undefined === local) {
                    local = obj[i];
                } else if (obj[i] != -1 && local > obj[i]) {
                    local = obj[i];
                }
            }
        }

        return local;
    };

    var internal_max = function (obj) {
        var local;

        for (var i in obj) {
            if (obj[i] !== -1) {
                if (undefined === local) {
                    local = obj[i];
                } else if (local < obj[i]) {
                    local = obj[i];
                }
            }
        }

        return local;
    };

    var internal_filter = function (func, obj) {
        var filtered = {};

        for (var i in obj) {
            if (func(i)) {
                filtered[i] = obj[i];
            }
        }

        return filtered;
    };

    var internal_check = function (generated, letter) {
        var keys = generated.keys, length = keys.length, memkeys = Object.keys(memory), memlength = memkeys.length;
        switch (generated.type) {
            case sj.arrows.TYPE_SINGLE:
            case sj.arrows.TYPE_PAIR:
            case sj.arrows.TYPE_TRIPLE:
                var filtered = internal_filter(function (k) {
                        return keys.indexOf(k) != -1;
                    }, memory), min = internal_min(memory), max = internal_max(memory),
                    fillkeys = Object.keys(filtered), fillen = fillkeys.length;

                if (0 >= memlength) {
                    return sj.letters.STATE_IDLE;
                } else if (memlength !== fillen || 1 < Math.abs(max - min)) {
                    return sj.letters.STATE_INCORRECT;
                } else if (length > fillen) {
                    if (undefined !== letter) {
                        if (fillkeys.indexOf(letter) != -1) {
                            return sj.letters.STATE_PART;
                        } else {
                            return sj.letters.STATE_PART;
                        }
                    } else {
                        return sj.letters.STATE_PART;
                    }
                } else {
                    return sj.letters.STATE_CORRECT;
                }
            case sj.arrows.TYPE_CHOICE:
                if (1 === memlength) {
                    return 1 === Object.keys(internal_filter(function (k) {
                        return keys.indexOf(k) != -1;
                    }, memory)).length ? sj.letters.STATE_CORRECT : sj.letters.STATE_INCORRECT;
                } else if (0 >= memlength) {
                    return sj.letters.STATE_IDLE;
                }
            case sj.arrows.TYPE_SEQUENCE:
                var time = internal_min(internal_filter(function (o) {
                    return keys.indexOf(o) != -1;
                }, memory));

                for (var k in keys) {
                    var next = memory[keys[k]];
                    if (next === undefined) {
                        return sj.letters.STATE_IDLE;
                    } else if (time > next) {
                        return sj.letters.STATE_INCORRECT;
                    } else if (undefined !== letter && k === letter) {
                        return sj.letters.STATE_PART
                    }

                    time = next;
                }

                return memlength === length ? sj.letters.STATE_CORRECT : sj.letters.STATE_INCORRECT;
            default:
                return false
        }

        return false;
    };

    return {
        'down': function (key, time) {
            memory[key] = -1;
        },
        'up': function (key, time) {
            if (undefined !== memory[key] && -1 === memory[key]) {
                memory[key] = time;
            }
        },
        'check': function (generated, letter, objects) {
            var checked = internal_check(generated);
            if (tryout !== checked && sj.letters.STATE_CORRECT === checked) {
                score += generated.points;
                tryout = checked;

                sj.numbers.set(objects.tenth, objects.unit, score);
            }

            return checked;
        },
        'clear': function () {
            memory = {}, tryout = undefined;
        },
        resetScore: function () {
            score = 0;
        }
    };
});

window.SJ.module('numbers', function (sj) {
    return {
        'init': function (scene) {
            var tenth = scene.createObject('tenth'), unit = scene.createObject('unit');

            tenth.setTexture(
                sj.texture.get('numbers'),
                0,
                0,
                1,
                1
            );
            tenth.setDimension(0.09, 0.09);
            tenth.setPosition(1.25, 0.10, sj.letters.BASE_Z);
            tenth.setVisible(false);

            unit.setTexture(
                sj.texture.get('numbers'),
                0,
                0,
                1,
                1
            );
            unit.setDimension(0.09, 0.09);
            unit.setPosition(1.25, 0.10, sj.letters.BASE_Z);
            unit.setVisible(false);

            return {
                tenth: tenth,
                unit: unit
            };
        },
        'set': function (tenth, unit, number) {
            sj.texture.load('numbers');

            if (10 <= number) {
                var tens = Math.floor(number / 10);

                tenth.setTexture(
                    sj.texture.get('numbers'),
                    tens * 0.1,
                    0,
                    tens * 0.1 + 0.1,
                    1
                );
                tenth.setDimension(0.09, 0.09);
                tenth.setPosition(1.33, 0.10, sj.letters.BASE_Z);
                tenth.setVisible(true);
            } else {
                tenth.setVisible(false);
            }

            var unt = number % 10;
            unit.setTexture(
                sj.texture.get('numbers'),
                unt * 0.1,
                0,
                unt * 0.1 + 0.1,
                1
            );
            unit.setDimension(0.09, 0.09);
            unit.setPosition(1.4, 0.10, sj.letters.BASE_Z);
            unit.setVisible(true);
        }
    };
});

window.SJ.module('arrows', function (sj) {
    return {
        TYPE_SINGLE: 0,
        TYPE_PAIR: 1,
        TYPE_TRIPLE: 2,
        TYPE_SEQUENCE: 3,
        TYPE_CHOICE: 4,

        'init': function (scene) {
            var arrows = scene.createObject('arrows');

            arrows.setTexture(
                sj.texture.get('arrows'),
                0,
                0,
                1,
                1
            );
            arrows.setDimension(32 / 160, 35 / 105);
            arrows.setPosition(0.90, 0.83, sj.letters.BASE_Z);
            arrows.setVisible(false);

            return arrows;
        },
        'set': function (arrows, type) {
            sj.texture.load('arrows');

            arrows.setTexture(
                sj.texture.get('arrows'),
                0.2 * type,
                0,
                0.2 * type + 0.2,
                0.33
            );
            arrows.setDimension(32 / 160, 31 / 105);
            arrows.setPosition(0.90, 0.83, sj.letters.BASE_Z);
            arrows.setVisible(true);

            var animation = sj.animation.create(arrows);

            for (var j = 0; j < 3; j++) {
                animation.addFrame(arrows.texture, 0.2 * type, j / 3, 0.2 * type + 0.2, (j + 1) / 3);
            }

            return animation;
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
