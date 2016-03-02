/**
 * Created by COD on 03.06.15.
 */
/*jslint unparam: true */
/*global window, require, exports */

(function(exports){
    var IrLib = exports;

(function() {/*    require('core-object');// */

/**
 * Created by COD on 03.06.15.
 */
(function() {/*require('class');// */

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 *
 * Edited by Daniel Corn
 */
// jshint ignore: start
// Inspired by base2 and Prototype
(function(root){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    //var hasUnderscoreJs = root['_'] && root._['clone'];
    //var hasJQuery = root['jQuery'] && root.jQuery().jquery;
    //
    //var simpleClone = function(source, isDeep) {
    //    var target = {};
    //    for (var prop in source) {
    //        if (!source.hasOwnProperty(prop)) {
    //            console.log('skip: ' + prop)
    //            continue;
    //        }
    //        if (source[prop] instanceof Date) {
    //            console.log('copy: Date ' + prop);
    //            target[prop] = source[prop];
    //
    //            continue;
    //
    //        }
    //        if (isDeep && typeof source[prop] === 'object') {
    //            target[prop] = simpleClone(target[prop], source[prop]);
    //        } else {
    //            target[prop] = source[prop];
    //        }
    //    }
    //    return target;
    //};
    //var createLocalProperty = function(source) {
    //    if (!source) {
    //        return source;
    //    }
    //    if (typeof source === 'object') {
    //        console.log('is object');
    //        if (hasJQuery) {
    //            return jQuery.extend({}, source);
    //        }
    //        if (hasUnderscoreJs) {
    //            return _.clone(source)
    //        }
    //        return simpleClone(source, false);
    //    }
    //    return source;
    //};

    // The base Class implementation (does nothing)
    this.Class = function(){};

    // Create a new Class that inherits from this class
    Class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            //if (typeof prop[name] === 'object') {
            //    IrLib.Logger.warn(
            //        'Detected object type prototype member "' + name + '". ' +
            //        'You should initialize member objects inside init()'
            //    );
            //}
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function(name, fn){
                    return function() {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
                //createLocalProperty(prop[name]);
                //(typeof prop[name] === 'object' ? simpleClone(prop[name]) : prop[name]);
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if ( !initializing && this.init )
                this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    };
})(this);

}());



IrLib.CoreObject = Class.extend({
    /**
     * @type {String}
     */
    __guid: null,

    init: function() {
        this.__guid = IrLib.CoreObject.createGuid();
    },

    /**
     * Returns the global unique ID of the object
     *
     * @returns {String}
     */
    guid: function () {
        return this.__guid;
    },

    /**
     * Defines a new property with the given key and descriptor
     *
     * @param {String} key
     * @param {Object} descriptor
     * @returns {IrLib.CoreObject}
     * @see Object.defineProperty()
     */
    defineProperty: function (key, descriptor) {
        if (descriptor.overwrite === false && this[key]) {
            return this;
        }
        Object.defineProperty(this, key, descriptor);
        return this;
    },

    /**
     * Defines new properties form the given properties
     *
     * @param {Object} properties
     * @returns {IrLib.CoreObject}
     * @see Object.defineProperties()
     */
    defineProperties: function (properties) {
        Object.defineProperties(this, properties);
        return this;
    },

    /**
     * Returns a clone of this object
     *
     * @returns {*}
     */
    clone: function() {
        var source = this,
            _clone = new (source.constructor)();
        for (var attr in source) {
            if (source.hasOwnProperty(attr)) {
                _clone[attr] = source[attr];
            }
        }
        _clone.__guid = IrLib.CoreObject.createGuid();
        return _clone;
    }
});
IrLib.CoreObject.__lastGuid = 0;
IrLib.CoreObject.createGuid = function() {
    return 'irLib-' + (++IrLib.CoreObject.__lastGuid);
};


}());


(function() {/*    require('error\/*');// */

/**
 * Created by COD on 14.04.15.
 */
var _Error = IrLib.Error = function (message, code, userInfo) {
    this.message = message;
    this.code = code;
    this.userInfo = userInfo;
};

_Error.prototype = Object.create(Error.prototype);
_Error.prototype = {
    constructor: _Error,
    toString: function() {
        return '[IrLib.Error] ' +
            (this.code ? '#' + this.code + ':' : '') +
            this.message;
    }
};


/**
 * Created by COD on 14.04.15.
 */
IrLib.MissingImplementationError = function (message, code) {
    this.message = message;
    this.code = code || 1435238939;
};

IrLib.MissingImplementationError.prototype = Object.create(Error.prototype);
IrLib.MissingImplementationError.prototype = {
    constructor: IrLib.MissingImplementationError,
    toString: function() {
        return '[IrLib.MissingImplementationError] ' +
            (this.code ? '#' + this.code + ':' : '') +
            this.message;
    }
};

}());


(function() {/*    require('utility\/*');// */

/**
 * Created by COD on 03.06.15.
 */

IrLib.Utility = IrLib.Utility || {};

var _GeneralUtility = IrLib.Utility.GeneralUtility = {
    /**
     * Returns if the given element is a HTML node
     *
     * @param {*} element
     * @returns {Boolean}
     */
    isDomNode: function (element) {
        return !!(element && element.nodeName);
    },

    /**
     * Returns the matching HTML node
     *
     * @param {*} element
     * @returns {HTMLElement}
     */
    domNode: function (element) {
        if (_GeneralUtility.isDomNode(element)) {
            return element;
        }
        if (typeof element === 'string') {
            return document.querySelector(element);
        }
        return null;
    },

    /**
     * Tries to transform the given value into an array
     *
     * If the value is
     * - undefined an empty array will be returned
     * - an array it will be cloned and returned (the elements will not be cloned)
     * - an object it's values will be returned
     * - something else a new array will be returned with the value as it's single element
     *
     * @param {*} value
     * @returns {*}
     */
    toArray: function (value) {
        if (typeof value === 'undefined') {
            return [];
        }
        if (Array.isArray(value)) {
            return value.slice();
        }
        if (typeof value === 'object') {
            var valueCollection = [],
                keys = Object.keys(value),
                keysLength = keys.length;
            for (var i = 0; i < keysLength; i++) {
                valueCollection.push(value[keys[i]]);
            }
            return valueCollection;
        }
        return [value];
    },

    /**
     * Returns the value for the key path of the given object
     *
     * @param {String} keyPath Collection of object keys concatenated with a dot (".")
     * @param {Object} object Root object to fetch the property
     * @param {Boolean} [graceful] Do not throw an exception for unresolved key paths
     * @returns {*}
     */
    valueForKeyPathOfObject: function (keyPath, object, graceful) {
        if (typeof keyPath !== 'string') {
            throw new TypeError('Key path must be of type string, ' + (typeof keyPath) + ' given');
        }
        var keyPathParts = keyPath.split('.'),
            keyPathPartsLength = keyPathParts.length,
            currentValue = object,
            currentKeyPathPart, i;

        for (i = 0; i < keyPathPartsLength; i++) {
            currentKeyPathPart = keyPathParts[i];
            if (typeof currentValue !== 'object') {
                if (!graceful) {
                    throw new TypeError(
                        'Can not get key ' + currentKeyPathPart + ' of value of type ' + (typeof currentValue)
                    );
                } else {
                    return undefined;
                }
            }
            currentValue = currentValue[currentKeyPathPart];
        }
        return currentValue;
    },

    /**
     * Sets the value for the key path of the given object
     *
     * @param {*} value New value to set
     * @param {String} keyPath Collection of object keys concatenated with a dot (".")
     * @param {Object} object Root object to set the property
     * @returns {*}
     */
    setValueForKeyPathOfObject: function (value, keyPath, object) {
        if (typeof keyPath !== 'string') {
            throw new TypeError('Key path must be of type string, ' + (typeof keyPath) + ' given');
        }
        var lastIndexOfDot = keyPath.lastIndexOf('.'), keyPathToParent, childKey, parentObject;

        // Only the first level child should be modified
        if (lastIndexOfDot === -1) {
            parentObject = object;
            childKey = keyPath;
        } else {
            keyPathToParent = keyPath.substr(0, lastIndexOfDot);
            childKey = keyPath.substr(lastIndexOfDot + 1);

            parentObject = _GeneralUtility.valueForKeyPathOfObject(keyPathToParent, object);
        }
        if (typeof parentObject !== 'object') {
            throw new TypeError(
                'Can not set key ' + keyPath + ' of value of type ' + (typeof parentObject)
            );
        }
        parentObject[childKey] = value;
    },

    /**
     * Returns if the given value is numeric
     *
     * @param {*} value
     * @returns {boolean}
     */
    isNumeric: function (value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },

    /**
     * Returns a deep copy of the given object
     *
     * @param {*}obj
     * @param {Number} depth
     * @returns {*}
     */
    clone: function (obj, depth) {
        var copy;
        if (arguments.length < 2) {
            depth = 10;
        }

        // Handle the 3 simple types, and null or undefined
        if (null === obj || "object" !== typeof obj) {
            return obj;
        }

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                if (depth - 1 > 0) {
                    copy[i] = _GeneralUtility.clone(obj[i], depth - 1);
                } else {
                    copy[i] = obj[i];
                }
            }
            return copy;
        }

        // Handle Object
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                if (depth - 1 > 0) {
                    copy[attr] = _GeneralUtility.clone(obj[attr], depth - 1);
                } else {
                    copy[attr] = obj[attr];
                }
            }
        }
        return copy;
    },

    /**
     * Adds the class to the given element
     *
     * @param {*} element HTML node or selector
     * @param {String} className
     */
    addClass: function (element, className) {
        element = _GeneralUtility.domNode(element);
        if (element) {
            if (element.classList) {
                element.classList.add(className);
            } else {
                element.className += ' ' + className;
            }
        }
    }
};


/**
 * Created by COD on 14.04.15.
 */
var ef = function () {
};

var Logger = IrLib.Logger = (typeof console === 'object' ? console : {});

if (!Logger.log) {
    Logger.log = ef;
}
if (!Logger.debug) {
    Logger.debug = ef;
}
if (!Logger.info) {
    Logger.info = ef;
}
if (!Logger.warn) {
    Logger.warn = ef;
}
if (!Logger.error) {
    Logger.error = ef;
}


}());


(function() {/*    require('components\/*');// */

/**
 * Created by COD on 03.06.15.
 */

var GeneralUtility = IrLib.Utility.GeneralUtility;
var _Error = IrLib.Error;

/**
 * @implements EventListener
 */
IrLib.Controller = IrLib.CoreObject.extend({
    /**
     * @type {IrLib.View.Interface|IrLib.View.Template|HTMLElement|String}
     */
    _view: null,

    /**
     * List of all registered events
     *
     * @type {String[]}
     */
    _registeredEvents: [],

    /**
     * Initialize the controller
     *
     * @param {HTMLElement|String} [view] A dom node or selector
     */
    init: function (view) {
        if (arguments.length > 0) { // Check if the view argument is given
            this.setView(view);
        } else if (this.view) { // Check if a view is inherited
            this.setView(this.view);
        }
        this.defineProperty('view', {
            enumerable: true,
            get: this.getView,
            set: this.setView
        });
    },

    /**
     * Handle the DOM event
     *
     * @param {Event} event
     * @returns {*}
     */
    handleEvent: function (event) {
        var controller = this,
            type = event.type,
            target = event.target,
            _events = controller.events,
            targetsTargetAttribute, imp;

        // Workaround for jsdom based unit tests
        if (!_events && typeof event.irController === 'object') {
            controller = event.irController;
            _events = controller.events;
        }

        // Check if the data-irlib-target attribute is set
        if (typeof target.getAttribute === 'function') {
            targetsTargetAttribute = target.getAttribute('data-irlib-target');
        }

        // If the data-irlib-target attribute is set look for a matching implementation
        if (targetsTargetAttribute) {
            var matchingImpName = Object.keys(_events).filter(function (eventIdentifier) {
                var eventIdentifierParts = eventIdentifier.split(':');

                return eventIdentifierParts.length > 1 &&
                    eventIdentifierParts[1] === targetsTargetAttribute && // Matching target attribute
                    eventIdentifierParts[0] === type // Matching event type
                    ;
            });

            if (matchingImpName.length > 0) {
                imp = _events[matchingImpName[0]];
            }
        }

        if (!imp && _events && _events[type]) {
            imp = _events[type];
        }

        if (typeof imp === 'function') {
            return imp.call(controller, event);
        } else if (imp) {
            IrLib.Logger.error('Event handler implementation is of type ' + (typeof event));
            return false;
        }
        return true;
    },

    /**
     * Sets the view
     *
     * @param {IrLib.View.Interface|IrLib.View.Template|HTMLElement|String} view A View object, dom node or selector
     */
    setView: function (view) {
        this._assertView(view);
        if (typeof view === 'string') { // If the view is a selector
            this._view = GeneralUtility.domNode(view);
        } else {
            this._view = view;
        }
    },

    /**
     * Returns the view
     *
     * @returns {IrLib.View.Interface|IrLib.View.Template|HTMLElement|String}
     */
    getView: function () {
        return this._view;
    },

    /**
     * Register the Controller as event listener for each event
     *
     * @returns {IrLib.Controller}
     */
    catchAllViewEvents: function () {
        var registeredEvents = this._registeredEvents,
            inline_splitEventIdentifier = this._splitEventIdentifier,
            _view = this.view,
            domElement, property;
        if (_view) {
            if (_view instanceof IrLib.View.Interface) {
                domElement = document.createElement('div');
            } else {
                domElement = _view;
            }

            for (property in domElement) {
                if (property.substr(0, 2) === 'on') {
                    registeredEvents.push(
                        inline_splitEventIdentifier(property.substr(2))[0]
                    );
                }
            }
            this._addListenersForRegisteredEventTypes();
        } else {
            IrLib.Logger.warn('Can not catch all events because the view not set');
        }
        return this;
    },

    /**
     * Register the Controller as event listener for each of the callbacks defined in
     * the events property
     *
     * @returns {IrLib.Controller}
     */
    initializeEventListeners: function () {
        var registeredEvents = this._registeredEvents,
            inline_splitEventIdentifier = this._splitEventIdentifier,
            _view = this.view,
            _eventNames, i;
        if (_view) {
            _eventNames = this.eventNames();
            for (i = 0; i < _eventNames.length; i++) {
                registeredEvents.push(inline_splitEventIdentifier(_eventNames[i])[0]);
            }
            this._addListenersForRegisteredEventTypes();
        } else {
            IrLib.Logger.warn('Can not add event listener because the view not set');
        }
        return this;
    },

    /**
     * Removes the event listeners
     */
    removeEventListeners: function () {
        var registeredEvents = this._registeredEvents,
            _view = this.view,
            i;
        if (_view) {
            for (i = 0; i < registeredEvents.length; i++) {
                _view.removeEventListener(registeredEvents[i], this, false);
            }
            this._registeredEvents = [];
        } else {
            IrLib.Logger.warn('Can not remove event listeners because the view not set');
        }
    },

    /**
     * Returns the event names
     *
     * @returns {Array}
     */
    eventNames: function () {
        return Object.keys(this.events);
    },

    /**
     * Actually add the event listeners listed in _registeredEvents to the View
     *
     * @private
     */
    _addListenersForRegisteredEventTypes: function () {
        var registeredEvents = this._registeredEvents,
            registeredEventsLength = registeredEvents.length,
            _view = this.view,
            i;
        if (_view) {
            for (i = 0; i < registeredEventsLength; i++) {
                _view.addEventListener(registeredEvents[i], this, false);
            }
        }
    },

    /**
     * Split the given event identifier into it's type and action-target parts
     *
     * Example:
     *  click:my-action => click, my-action
     *  click:data-attribute-to-match => click, data-attribute-to-match
     *
     * @param {String} eventIdentifier
     * @returns {String[]}
     * @private
     */
    _splitEventIdentifier: function (eventIdentifier) {
        return eventIdentifier.split ? eventIdentifier.split(':') : eventIdentifier;
    },

    /**
     * Tests if the given value is a view
     *
     * @param {*} view
     * @private
     */
    _assertView: function (view) {
        if (!view) {
            throw new _Error('No view given', 1433355412);
        }

        var ViewInterface = IrLib.View && IrLib.View.Interface ? IrLib.View.Interface : function () {
        };
        if (!GeneralUtility.domNode(view) && !(view instanceof ViewInterface)) {
            throw new _Error('No view given', 1433355412, view);
        }
    },

    /**
     * Registered event handler methods
     */
    events: {}
});

/**
 * Created by COD on 25.06.15.
 */
var _Error = IrLib.Error;
IrLib.Dictionary = IrLib.CoreObject.extend({
    /**
     * Initialize the Service Locator
     */
    init: function (initializationValues) {
        /**
         * Initialize the instance with the keys and values from the given object
         *
         * @param initializationValues
         * @returns {IrLib.Dictionary}
         * @private
         */
        var _initWithObject = function (initializationValues) {
            var keys = Object.keys(initializationValues),
                keysLength = keys.length,
                currentKey;
            for (var i = 0; i < keysLength; i++) {
                currentKey = keys[i];
                this[currentKey] = initializationValues[currentKey];
            }
        };

        if (arguments.length > 0) {
            if (typeof initializationValues !== 'object') {
                throw new _Error(
                    'Initialization argument has to be of type object, ' + (typeof initializationValues) + ' given',
                    1435219260
                );
            }
            if (initializationValues === null) {
                initializationValues = {};
            }
            _initWithObject.call(this, initializationValues);
        }
        return this;
    },

    /**
     * Returns the dictionary's values as array
     *
     * @returns {Array}
     */
    values: function () {
        var valueCollection = [],
            keys = this.keys(),
            keysLength = keys.length;
        for (var i = 0; i < keysLength; i++) {
            valueCollection.push(this[keys[i]]);
        }
        return valueCollection;
    },

    /**
     * Returns the dictionary's keys as array
     *
     * @returns {Array}
     */
    keys: function () {
        return Object.keys(this);
    },

    /**
     * Invokes the callback for each key value pair in the Dictionary, passing in the value, key and dictionary
     *
     * Callback schema: function(value, key, dictionary) {}
     *
     * @param {Function} callback
     * @param {Object} [thisArg]
     */
    forEach: function(callback, thisArg) {
        this.map(callback, thisArg);
    },

    /**
     * Creates a new array with the results of invoking the given callback for each key value pair in the Dictionary.
     *
     * Callback schema: function(value, key, dictionary) { return newValue; }
     *
     * @param {Function} callback
     * @param {Object} [thisArg]
     */
    map: function(callback, thisArg) {
        if (typeof callback !== 'function') {
            throw new TypeError('Argument "callback" is not of type function');
        }
        var valueCollection = [],
            keys = this.keys(),
            keysLength = keys.length,
            preparedCallback = callback,
            currentKey, currentValue;

        if (thisArg) {
            preparedCallback = callback.bind(thisArg);
        }

        for (var i = 0; i < keysLength; i++) {
            currentKey = keys[i];
            currentValue = this[currentKey];
            valueCollection.push(preparedCallback(currentValue, currentKey, this));
        }
        return valueCollection;
    }
});


/**
 * Created by COD on 03.06.15.
 */
var GeneralUtility = IrLib.Utility.GeneralUtility;
var _Error = IrLib.Error;
IrLib.ServiceLocator = IrLib.CoreObject.extend({
    /**
     * @type {Object}
     */
    services: null,

    /**
     * @type {Object}
     */
    serviceFactory: null,

    /**
     * @type {Number}
     */
    recursionLevel: 0,

    /**
     * Initialize the Service Locator
     */
    init: function () {
        this.services = {};
        this.serviceFactory = {};

        this.set('serviceLocator', this);
    },

    /**
     * Register multiple factory/constructor-identifier combinations
     *
     * @param {Object} configuration
     * @returns {IrLib.ServiceLocator}
     */
    registerMultiple: function (configuration) {
        var identifiers = Object.keys(configuration),
            identifier, i;
        for (i = 0; i < identifiers.length; i++) {
            identifier = identifiers[i];
            this.register(identifier, configuration[identifier]);
        }
        return this;
    },

    /**
     * Register the factory/constructor for the given service identifier
     *
     * @param {String} identifier
     * @param {Function} constructor
     * @returns {IrLib.ServiceLocator}
     */
    register: function (identifier, constructor) {
        this._assertIdentifier(identifier);
        this._assertFactory(constructor);

        this.serviceFactory[identifier] = constructor;
        return this;
    },

    /**
     * Sets the instance for the given service identifier
     *
     * @param {String} identifier
     * @param {Object} instance
     * @returns {IrLib.ServiceLocator}
     */
    set: function (identifier, instance) {
        this._assertIdentifier(identifier);

        this.services[identifier] = instance;
        return this;
    },

    /**
     * Returns the instance for the given service identifier
     *
     * If a service instance for the given identifier is already registered, it will be returned. If no instance is
     * found a matching service factory is looked up. If none is found an exception will be thrown
     *
     * @param {String} identifier
     * @returns {Object}
     */
    get: function (identifier) {
        this._assertIdentifier(identifier);

        var instance = this.services[identifier],
            _serviceFactoryCallback;
        if (!instance) {
            _serviceFactoryCallback = this.serviceFactory[identifier];
            if (!_serviceFactoryCallback) {
                throw new _Error('Could not find service with identifier ' + identifier);
            }
            if (_serviceFactoryCallback.prototype && _serviceFactoryCallback.prototype.constructor) {
                instance = this.resolveDependencies(
                    new _serviceFactoryCallback(),
                    _serviceFactoryCallback
                );
            } else {
                instance = _serviceFactoryCallback();
            }
            this.set(identifier, instance);
        }
        return instance;
    },

    /**
     * Resolves the dependencies defined in the prototype's "needs" property
     *
     * @param {Object} instance
     * @param {Class} serviceClass
     * @returns {Object}
     */
    resolveDependencies: function (instance, serviceClass) {
        if (serviceClass.prototype && typeof serviceClass.prototype.needs === 'object') {
            var dependencies = serviceClass.prototype.needs,
                dependenciesLength = dependencies.length,
                dependency, dependencyProperty, dependencyIdentifier, i;

            if (++this.recursionLevel > 1000) {
                throw new _Error('Maximum recursion level exceeded', 1434301204);
            }
            for (i = 0; i < dependenciesLength; i++) {
                dependency = dependencies[i].split(':', 2);
                dependencyIdentifier = dependency[0];
                dependencyProperty = (dependency[1] || dependencyIdentifier);
                instance[dependencyProperty] = this.get(dependencyIdentifier);
            }
            this.recursionLevel--;
        }
        return instance;
    },

    /**
     * Tests if the given name is a valid service identifier
     *
     * @param {*} identifier
     * @private
     */
    _assertIdentifier: function (identifier) {
        if (typeof identifier !== 'string') {
            throw new _Error('Given service name is not of type string', 1433683510);
        }
    },

    /**
     * Tests if the given value is a valid service factory
     *
     * @param {*} constructor
     * @private
     */
    _assertFactory: function (constructor) {
        if (typeof constructor !== 'function') {
            throw new _Error('Given service constructor is not callable', 1433683511);
        }
    }
});


/**
 * Created by COD on 04.07.14.
 */
/**
 * Object representation of an URL
 *
 * @param {String} href
 * @constructor
 */
IrLib.Url = function (href) {
    if (arguments.length > 0) {
        if (href instanceof IrLib.Url) {
            href = href + '';
        }
        var parser = document.createElement('a');
        parser.href = href;

        this.protocol = parser.protocol; // => "http:"
        this._host = parser.host;     // => "example.com:3000"
        this._hostname = parser.hostname; // => "example.com"
        this._port = parser.port;     // => "3000"
        this._pathname = parser.pathname; // => "/pathname/"
        this.hash = parser.hash;     // => "#hash"
        this.search = parser.search;   // => "?search=test"
    } else {
        this.protocol = '';
        this._host = '';
        this._hostname = '';
        this._port = '';
        this._pathname = '';
        this.hash = '';
        this.search = '';
    }

    Object.defineProperty(this, 'host', {
        get: this.getHost,
        set: this.setHost
    });
    Object.defineProperty(this, 'hostname', {
        get: this.getHostname,
        set: this.setHostname
    });
    Object.defineProperty(this, 'port', {
        get: this.getPort,
        set: this.setPort
    });
    Object.defineProperty(this, 'pathname', {
        get: this.getPathname,
        set: this.setPathname
    });
};

/**
 * Returns the current browser URL
 *
 * @returns {IrLib.Url}
 */
IrLib.Url.current = function () {
    return new IrLib.Url(window.location.href);
};

IrLib.Url.prototype = {
    /**
     * Returns the host
     * @returns {String}
     */
    getHost: function () {
        return this._host;
    },

    /**
     * Sets the host
     * @returns {String}
     */
    setHost: function (newValue) {
        var hostDefinitionParts = newValue.split(':');
        this._host = newValue;
        this._hostname = hostDefinitionParts[0];
        this._port = hostDefinitionParts[1];
    },

    /**
     * Returns the hostname
     * @returns {String}
     */
    getHostname: function () {
        return this._hostname;
    },

    /**
     * Sets the hostname
     * @returns {String}
     */
    setHostname: function (newValue) {
        this._hostname = newValue;
        this._host = newValue + ':' + this._port;
    },

    /**
     * Returns the port
     * @returns {String}
     */
    getPort: function () {
        return this._port;
    },

    /**
     * Sets the port
     * @returns {String}
     */
    setPort: function (newValue) {
        this._port = newValue;
        this._host = this._hostname + ':' + newValue;
    },

    /**
     * Returns the protocol
     *
     * @returns {String}
     */
    getProtocol: function () {
        return this.protocol;
    },

    /**
     * Sets the protocol
     *
     * @param {String} newValue
     */
    setProtocol: function (newValue) {
        this.protocol = newValue;
    },

    /**
     * Returns the pathname
     *
     * @returns {String}
     */
    getPathname: function () {
        return this._pathname;
    },

    /**
     * Sets the pathname
     *
     * @param {String} newValue
     */
    setPathname: function (newValue) {
        if (newValue[0] !== '/') {
            newValue = '/' + newValue;
        }
        this._pathname = newValue;
    },

    /**
     * Returns the hash
     *
     * @returns {String}
     */
    getHash: function () {
        return this.hash;
    },

    /**
     * Sets the hash
     *
     * @param {String} newValue
     */
    setHash: function (newValue) {
        this.hash = newValue;
    },

    /**
     * Returns the search
     *
     * @returns {String}
     */
    getSearch: function () {
        return this.search;
    },

    /**
     * Sets the search
     *
     * @param {String} newValue
     */
    setSearch: function (newValue) {
        this.search = newValue;
    },

    /**
     * Returns if the URL is local
     *
     * @returns {boolean}
     */
    isLocal: function () {
        return window.location.host == this.host;
    },

    /**
     * Returns if the URL is equal to the current page
     *
     * @param {boolean} [ignoreSearch] If set to TRUE the URL's search/query part will not be compared
     * @returns {boolean}
     */
    isSamePage: function (ignoreSearch) {
        var pageUrl = IrLib.Url.current();
        return (
        pageUrl.host == this.host &&
        pageUrl.protocol === this.protocol &&
        pageUrl.pathname === this.pathname &&
        (ignoreSearch || pageUrl.search === this.search)
        );
    },

    /**
     * Returns if the URL fully matches the current location
     *
     * @returns {boolean}
     */
    isCurrent: function () {
        return this.isEqualTo(IrLib.Url.current());
    },

    /**
     * Returns if the URL is equal to the given URL
     *
     * @param {String|IrLib.Url} url
     * @returns {boolean}
     */
    isEqualTo: function (url) {
        return ("" + url) == ("" + this);
    },

    /**
     * Returns a string representation of the URL object
     *
     * @returns {string}
     */
    toString: function () {
        return (this.protocol ? this.protocol + '//' : '') +
            this.host +
            this.pathname +
            this.search +
            this.hash;
    }
};


}());


(function() {/*    require('view\/interface');// */

}());


(function() {/*    require('view\/*');// */

/**
 * Created by COD on 25.06.15.
 */
(function() {/*require('view\/interface');// */

}());


(function() {/*require('view\/abstract-variable-view');// */

/**
 * Created by COD on 25.06.15.
 */
(function() {/*require('view\/interface');// */

/**
 * Created by COD on 25.06.15.
 */

IrLib.View = IrLib.View || {};

/**
 * Defines a common interface for Views
 *
 * @implements IrLib.View.SubViewInterface
 * @interface
 */
IrLib.View.Interface = IrLib.CoreObject.extend({
    init: function (template, variables) {
        this._super();
    },

    /**
     * Renders the template
     *
     * @return {Node|HTMLElement}
     * @abstract
     */
    render: function () {
        throw new IrLib.MissingImplementationError('render');
    },

    /**
     * Set the variables
     *
     * @param {Object|IrLib.Dictionary} data
     * @return {IrLib.View.Interface}
     * @abstract
     */
    setVariables: function (data) {
        throw new IrLib.MissingImplementationError('setVariables');
    },

    /**
     * Add the variable with the given key and value
     *
     * @param {String} key
     * @param {*} value
     * @return {IrLib.View.Interface}
     * @abstract
     */
    assignVariable: function (key, value) {
        throw new IrLib.MissingImplementationError('assignVariable');
    },

    /**
     * Appends the View to the given DOM element, while replacing the previously rendered element
     *
     * @param {Node|HTMLElement} element
     * @return {IrLib.View.Interface}
     * @abstract
     */
    appendTo: function (element) {
        throw new IrLib.MissingImplementationError('appendTo');
    },

    /**
     * Removes the element from it's parent
     *
     * @returns {IrLib.View.Interface}
     * @abstract
     */
    remove: function () {
        throw new IrLib.MissingImplementationError('remove');
    },

    /**
     * Adds the given event listener to the View
     *
     * @param {String} type
     * @param {EventListener|Function} listener
     * @param {Boolean} [useCapture]
     * @abstract
     */
    addEventListener: function (type, listener, useCapture) {
        throw new IrLib.MissingImplementationError('addEventListener');
    },

    /**
     * Dispatches an Event at the View, invoking the affected EventListeners in the appropriate order.
     *
     * The normal event processing rules (including the capturing and optional bubbling phase) apply to events
     * dispatched manually with dispatchEvent().
     *
     * @param {Event} event
     * @return {Boolean}
     * @abstract
     */
    dispatchEvent: function (event) {
        throw new IrLib.MissingImplementationError('dispatchEvent');
    },

    /**
     * Returns the string representation of the rendered template
     *
     * @returns {String}
     * @abstract
     */
    toString: function () {
        throw new IrLib.MissingImplementationError('toString');
    }
});


}());



/**
 * An abstract context-aware view
 *
 * @implements IrLib.View.VariableViewInterface
 * @abstract
 */
IrLib.View.AbstractVariableView = IrLib.View.Interface.extend({
    /**
     * Dictionary of template variables
     *
     * @type {IrLib.Dictionary}
     */
    _variables: null,

    init: function () {
        this._super();

        this.defineProperties({
            'variables': {
                enumerable: true,
                get: this.getVariables,
                set: this.setVariables
            }
        });
    },

    /**
     * @abstract
     */
    toString: function () {
        throw new IrLib.MissingImplementationError('assignVariable');
    },

    /**
     * Sets the variables
     *
     * @param {Object|IrLib.Dictionary} data
     * @returns {IrLib.View.Interface}
     */
    setVariables: function (data) {
        if (typeof data !== 'object') {
            throw new TypeError('Initialization argument has to be of type object, ' + (typeof data) + ' given');
        }
        if (data instanceof IrLib.Dictionary) {
            this._variables = data;
        } else {
            this._variables = new IrLib.Dictionary(data);
        }
        this._needsRedraw = true;
        return this;
    },

    /**
     * Adds the variable with the given key and value
     *
     * @param {String} key
     * @param {*} value
     * @returns {IrLib.View.Interface}
     */
    assignVariable: function (key, value) {
        this._variables[key] = value;
        this._needsRedraw = true;
        return this;
    },

    /**
     * Returns the currently assigned variables
     *
     * @returns {IrLib.Dictionary}
     */
    getVariables: function () {
        return this._variables;
    }
});


}());



/**
 * An abstract context-aware view
 *
 * @implements IrLib.View.ContextInterface
 * @abstract
 */
IrLib.View.AbstractContextAwareView = IrLib.View.AbstractVariableView.extend({
    /**
     * Views context
     *
     * @type {IrLib.View.Interface}
     */
    _context: null,

    init: function () {
        this._super();

        if (typeof this.context !== 'undefined') { // Check if a context is inherited
            this._context = this.context;
        }

        this.defineProperty(
            'context',
            {
                enumerable: true,
                get: this.getContext,
                set: this.setContext
            }
        );
    },

    /**
     * Returns the View's context
     *
     * @returns {IrLib.View.Interface}
     */
    getContext: function () {
        return this._context;
    },

    /**
     * Sets the View's context
     *
     * @param {IrLib.View.Interface} context
     * @returns {IrLib.View.Interface}
     */
    setContext: function (context) {
        this._context = context;
        return this;
    }
});


/**
 * Created by COD on 25.06.15.
 */
(function() {/*require('view\/interface');// */

}());



/**
 * An abstract view with DOM support
 *
 * @implements EventListener
 * @abstract
 */
IrLib.View.AbstractDomView = IrLib.View.AbstractContextAwareView.extend({
    /**
     * Tag name for the HTML node that encapsulates the generated nodes
     *
     * @type {String}
     */
    tagName: 'div',

    /**
     * Registry of event listeners
     *
     * @type {Object}
     */
    _eventListeners: {},

    /**
     * Defines if a redraw is required
     *
     * @type {Boolean}
     */
    _needsRedraw: true,

    /**
     * DOM element
     *
     * @type {Node|HTMLElement}
     */
    _dom: null,

    /**
     * Last inserted node which should be replaced
     *
     * @type {Node}
     */
    _lastInsertedNode: null,

    init: function () {
        this._super();

        if (typeof this.eventListeners === 'object') { // Check if a eventListeners variables are inherited
            var _this = this;
            (new IrLib.Dictionary(this.eventListeners)).forEach(function(imp, key) {
                _this.addEventListener(key, imp);
            });
        } else {
            this._eventListeners = {};
        }

        this.defineProperty(
            'needsRedraw',
            {
                enumerable: true,
                get: this.getNeedsRedraw
            }
        );
    },

    /**
     * Renders the template
     *
     * @return {Node|HTMLElement}
     */
    render: function () {
        if (this._needsRedraw) {
            delete this._dom;
            var _template = this.template;
            if (!_template) {
                throw new ReferenceError('Template not specified');
            }

            this._dom = this._createDom(this.toString());
            this._needsRedraw = false;
        }
        return this._dom;
    },

    /**
     * Returns if a redraw is required
     *
     * @returns {Boolean}
     */
    getNeedsRedraw: function () {
        return this._needsRedraw;
    },

    /**
     * Returns if the View is in the visible DOM
     *
     * @returns {Boolean}
     */
    isVisible: function () {
        var element = this._dom;
        return !!(element && element.parentNode && document.body.contains(element));
    },

    /**
     * Appends the View to the given DOM element, while replacing the previously rendered element
     *
     * @param {Node|HTMLElement} element
     * @returns {IrLib.View.Interface}
     */
    appendTo: function (element) {
        if (!element || typeof element.appendChild !== 'function') {
            throw new TypeError('Given element is not a valid DOM Node');
        }

        this.render();

        if (this._lastInsertedNode) {
            element.replaceChild(this._dom, this._lastInsertedNode);
        } else {
            element.appendChild(this._dom);
        }
        this._lastInsertedNode = this._dom;

        this.addStoredEventListeners();
        return this;
    },

    /**
     * Reloads the Views output in the DOM
     *
     * @param {Boolean} [force]
     * @returns {IrLib.View.Interface}
     */
    reload: function (force) {
        var lastParent = this._dom ? this._dom.parentNode : (this._lastInsertedNode ? this._lastInsertedNode.parentNode : null);
        if (!lastParent) {
            throw new ReferenceError('Can not reload because the view does not seem to be in the DOM');
        }
        if (force || this._needsRedraw) {
            this._needsRedraw = true;
            this.appendTo(lastParent);
        }
        return this;
    },

    /**
     * Removes the element from it's parent
     *
     * @returns {IrLib.View.Interface}
     */
    remove: function () {
        var lastInsertedNode = this._lastInsertedNode;
        if (lastInsertedNode && lastInsertedNode.parentNode) {
            lastInsertedNode.parentNode.removeChild(lastInsertedNode);
            this._lastInsertedNode = null;
        }
        return this;
    },

    /**
     * Handle the DOM event
     *
     * @param {Event} event
     */
    handleEvent: function (event) {
        var imps = this._eventListeners[event.type],
            patchedEvent, currentImp, i;

        if (imps) {
            patchedEvent = this._patchEvent(event);
            for (i = 0; i < imps.length; i++) {
                currentImp = imps[i];
                if (typeof currentImp === 'undefined') {
                    throw new TypeError('Implementation for event type "' + event.type + '" is undefined');
                } else if (typeof currentImp === 'function') {
                    currentImp(patchedEvent);
                } else if (currentImp.handleEvent) {
                    currentImp.handleEvent.call(currentImp, patchedEvent);
                }
            }
        } else {
            IrLib.Logger.log(event);
        }
    },

    /**
     * Create a patches version of the event and set it's target to the View
     *
     * @param {Event} event
     * @returns {Event}
     * @private
     */
    _patchEvent: function (event) {
        event.irTarget = this;
        return event;
    },

    /**
     * Adds the given event listener to the View
     *
     * @param {String} type
     * @param {EventListener|Function} listener
     * @param {Boolean} [useCapture] Currently ignored
     */
    addEventListener: function (type, listener, useCapture) {
        var _eventListeners = this._eventListeners;
        if (!_eventListeners[type]) {
            _eventListeners[type] = [listener];
        }

        if (_eventListeners[type].indexOf(listener) === -1) {
            _eventListeners[type].push(listener);
        }

        this._addEventListeners(this.render(), [type]);
    },

    /**
     * Add event listeners for each given event types to the element
     *
     * @param {HTMLElement} element
     * @param {String[]} eventTypes
     * @private
     */
    _addEventListeners: function (element, eventTypes) {
        var eventTypesLength = eventTypes.length,
            i, type;
        for (i = 0; i < eventTypesLength; i++) {
            type = eventTypes[i];
            element.addEventListener(type, this);
        }
    },

    /**
     * Add the stored event listeners to the DOM Node
     */
    addStoredEventListeners: function() {
        if (!this._dom) {
            throw new ReferenceError('DOM is not render yet');
        }
        this._addEventListeners(this._dom, Object.keys(this._eventListeners));
    },

    /**
     * Dispatches an Event at the View, invoking the affected EventListeners in the appropriate order.
     *
     * The normal event processing rules (including the capturing and optional bubbling phase) apply to events
     * dispatched manually with dispatchEvent().
     *
     * @param {Event} event
     * @return {Boolean}
     */
    dispatchEvent: function (event) {
        this.render().dispatchEvent(event);
    },

    /**
     * Creates the Document Object Model for the given template string
     *
     * @param {String} [template]
     * @returns {Node|HTMLElement}
     * @protected
     */
    _createDom: function (template) {
        var root = document.createElement(this.tagName);
        if (template) {
            root.innerHTML = template;
        }
        return root;
    },

    /**
     * Returns a clone of this object
     *
     * @returns {*}
     */
    clone: function() {
        var source = this,
            _clone = new (source.constructor)();
        for (var attr in source) {
            if (source.hasOwnProperty(attr)) {
                if (attr === '_dom' || attr === '_lastInsertedNode' || attr === '_eventListeners') {
                    continue;
                }
                _clone[attr] = source[attr];
            }
        }
        _clone.__guid = IrLib.CoreObject.createGuid();
        return _clone;
    }
});


/**
 * Created by COD on 25.06.15.
 */

IrLib.View = IrLib.View || {};

/**
 * Defines a common interface for context aware Views
 *
 * @interface
 */
IrLib.View.ContextInterface = function () {
};
IrLib.View.ContextInterface.prototype.setContext = function () {
    throw new IrLib.MissingImplementationError('setContext');
};
IrLib.View.ContextInterface.prototype.getContext = function () {
    throw new IrLib.MissingImplementationError('getContext');
};


/**
 * Created by COD on 25.06.15.
 */
(function() {/*require('view\/template');// */

/**
 * Created by COD on 25.06.15.
 */

/**
 * A template based view
 *
 * @implements EventListener
 * @implements IrLib.View.Interface
 * @implements IrLib.View.ContextInterface
 * @implements IrLib.View.SubViewInterface
 */
IrLib.View.Template = IrLib.View.AbstractDomView.extend({
    needs: ['serviceLocator'],

    /**
     * @type {IrLib.ServiceLocator}
     */
    serviceLocator: null,

    /**
     * Template to render
     *
     * @type {String}
     */
    _template: '',

    /**
     * Array of parse template blocks
     *
     * @type {IrLib.View.Parser.Block[]}
     */
    _templateBlocks: null,

    /**
     * Dictionary of computed variables
     *
     * @type {IrLib.Dictionary}
     */
    _computed: null,

    /**
     * Template parser instance
     *
     * @type {IrLib.View.Parser.Interface}
     */
    _templateParser: null,

    /**
     * Stack of last condition results
     *
     * @type {Boolean[]}
     */
    _lastConditionStateStack: [],

    /**
     * Registered sub views
     *
     * @type {IrLib.Dictionary}
     */
    _subviewPlaceholders: null,

    /**
     * Render the subviews as string
     * @type {Boolean}
     */
    _renderSubviewsAsPlaceholders: false,

    init: function (template, variables) {
        this._super(template, variables);

        if (arguments.length > 0) { // Check if the template argument is given
            if (typeof template !== 'string') {
                throw new TypeError('Argument "template" is not of type string');
            }
            this.setTemplate(template);
        } else if (typeof this.template === 'string') { // Check if a template string is inherited
            this.setTemplate(this.template.slice(0));
        }

        if (typeof this.computed === 'object') { // Check if a computed variables are inherited
            this.setComputed(this.computed);
        }

        this._subviewPlaceholders = new IrLib.Dictionary();

        this.setVariables(variables || {});
        this.defineProperties({
            'template': {
                enumerable: true,
                get: this.getTemplate,
                set: this.setTemplate
            },
            'computed': {
                enumerable: true,
                get: this.getComputed,
                set: this.setComputed
            }
        });
    },

    /**
     * Returns the string representation of the rendered template
     *
     * @returns {String}
     */
    toString: function () {
        return this._renderBlocks();
    },

    /**
     * Renders the template
     *
     * @return {Node|HTMLElement}
     */
    render: function () {
        if (this._needsRedraw) {
            delete this._dom;
            var _template = this.template;
            if (!_template) {
                throw new ReferenceError('Template not specified');
            }

            this._renderSubviewsAsPlaceholders = true;
            this._dom = this._createDom(this.toString());
            this._renderSubviewsAsPlaceholders = false;
            this._needsRedraw = false;
        }
        return this._dom;
    },

    /**
     * Replace the variables inside the given template
     *
     * @returns {String}
     */
    _renderBlocks: function () {
        var BlockType = IrLib.View.Parser.BlockType,
            State = IrLib.View.State,
            templateBlocks = this.getTemplateBlocks(),
            templateBlocksLength = templateBlocks.length,
            inline_escapeHtml = this._escapeHtml,
            inline_resolveVariable = this._resolveVariable.bind(this),
            inline_renderExpression = this._renderExpression.bind(this),
            renderedTemplate = '',
            currentVariableValue, currentMeta, currentTemplateBlock, index;

        for (index = 0; index < templateBlocksLength; index++) {
            /** @var {IrLib.View.Parser.Block} currentTemplateBlock */
            currentTemplateBlock = templateBlocks[index];
            switch (currentTemplateBlock.type) {
                case BlockType.VARIABLE:
                    currentVariableValue = inline_resolveVariable(currentTemplateBlock.content);
                    currentMeta = currentTemplateBlock.meta;
                    if (!currentMeta.isSafe) {
                        currentVariableValue = inline_escapeHtml(currentVariableValue);
                    }

                    renderedTemplate += currentVariableValue;
                    break;

                case BlockType.EXPRESSION:
                    var state = new State(index, templateBlocks);
                    renderedTemplate += inline_renderExpression(currentTemplateBlock, state);
                    index = state.index;
                    break;

                case BlockType.STATIC:
                /* falls through */
                default:
                    renderedTemplate += currentTemplateBlock.content;
                    break;

            }
        }

        return renderedTemplate;
    },

    /**
     * Renders the expression of the current block
     *
     * @param {IrLib.View.Parser.Block} block
     * @param {IrLib.View.State} state
     * @returns {String}
     * @private
     */
    _renderExpression: function (block, state) {
        var ExpressionType = IrLib.View.Parser.ExpressionType,
            expressionParts = block.content.split(' '),
            lastConditionStateStack = this._lastConditionStateStack,
            meta = block.meta,
            output, view, viewId;

        switch (meta.expressionType) {
            case ExpressionType.VIEW:
                view = this._resolveView(expressionParts[1]);
                view.setContext(this);
                view.setVariables(this.variables);

                if (this._renderSubviewsAsPlaceholders) {
                    // TODO: Handle insertion of the same views again
                    viewId = 'irLibView-' + view.guid();
                    //console.log(view.guid());
                    this._subviewPlaceholders[viewId] = view;
                    output = '<script id="' + viewId + '" type="text/x-placeholder"></script>';
                } else {
                    output = view.toString();
                }
                break;

            case ExpressionType.ELSE:
                if (lastConditionStateStack.pop() === true) {
                    /* Skip forward to the closing block */
                    state.index++;
                    this._scanToEndExpression(ExpressionType.CONDITIONAL_START, ExpressionType.CONDITIONAL_END, state);
                }
                output = '';
                break;

            case ExpressionType.CONDITIONAL_START:
                if (expressionParts.length < 2) {
                    throw new ReferenceError('Condition missing');
                }
                var conditionKey = expressionParts[1],
                    conditionValue = this._resolveVariable(conditionKey);

                if (this._evaluateConditionValue(conditionValue)) {
                    /* Continue rendering the next blocks */
                    lastConditionStateStack.push(true);
                } else {
                    /* Skip forward to the closing or else block */
                    state.index++;
                    this._scanToEndExpression(ExpressionType.CONDITIONAL_START, ExpressionType.CONDITIONAL_END, state);
                    lastConditionStateStack.push(false);
                }
                output = '';
                break;

            case ExpressionType.CONDITIONAL_END:
                output = '';
                //output = ' eni ';
                break;

            case ExpressionType.UNKNOWN:
            /* falls through */
            default:
                output = '{%' + block.content + '%}';
        }

        return output;
    },

    /**
     * Evaluate the condition value
     *
     * @param {*} conditionValue
     * @returns {boolean}
     * @private
     */
    _evaluateConditionValue: function (conditionValue) {
        return (
            (Array.isArray(conditionValue) && conditionValue.length > 0) ||
            (typeof conditionValue === 'object' && Object.keys(conditionValue).length > 0) || !!conditionValue
        );
    },

    /**
     * Skip forward to the matching end block
     *
     * @param {IrLib.View.Parser.ExpressionType|string} startExpression
     * @param {IrLib.View.Parser.ExpressionType|string} endExpression
     * @param {IrLib.View.State} state
     * @private
     */
    _scanToEndExpression: function (startExpression, endExpression, state) {
        var blockStream = state.blockStream,
            blockStreamLength = blockStream.length,
            EXPRESSION = IrLib.View.Parser.BlockType.EXPRESSION,
            EXPRESSION_TYPE_ELSE = IrLib.View.Parser.ExpressionType.ELSE,
            nestingDepth = 1,
            i = state.index,
            balanced = false,
            block, expressionType;

        for (; i < blockStreamLength; i++) {
            /** @type {IrLib.View.Parser.Block} */
            block = blockStream[i];
            if (block.type === EXPRESSION) {
                expressionType = block.meta.expressionType;
                if (expressionType === startExpression) { // Start of a new if/for
                    nestingDepth++;
                } else if (expressionType === endExpression) { // End of the last if/for
                    nestingDepth--;
                    if (nestingDepth < 1) {
                        balanced = true;
                        break;
                    }
                } else if (nestingDepth === 1 && expressionType === EXPRESSION_TYPE_ELSE) { // Matching else was found
                    balanced = true;
                    break;
                }
            }
        }

        if (!balanced) {
            IrLib.Logger.log('Not balanced');
        }
        state.index = i;
    },

    /**
     * Resolve the variable for the given key path
     *
     * @param {String} keyPath
     * @returns {*}
     * @private
     */
    _resolveVariable: function (keyPath) {
        var result;
        try {
            result = IrLib.Utility.GeneralUtility.valueForKeyPathOfObject(keyPath, this.getVariables(), false);
            if (typeof result === 'function') {
                result = result(this);
            }
        } catch (error) {
            if (!(error instanceof TypeError)) {
                throw error;
            }
        }

        if (!result && keyPath.indexOf('.') === -1) { // Key paths for computed variables must NOT contain a dot
            result = this._resolveAndEvaluateComputed(keyPath);
        }

        return result !== undefined ? result : '';
    },

    /**
     * Resolve the variable for the given key path
     *
     * @param {String} key
     * @returns {*}
     * @private
     */
    _resolveAndEvaluateComputed: function (key) {
        var _computed = this.computed,
            registeredComputed;
        if (!_computed) {
            return undefined;
        }
        registeredComputed = _computed[key];
        if (typeof registeredComputed === 'function') {
            return registeredComputed.call(this);
        }
        return undefined;
    },

    /**
     * Resolve the requested View
     *
     * @param {String} viewIdentifier
     * @returns {IrLib.View.SubViewInterface}
     * @private
     */
    _resolveView: function (viewIdentifier) {
        var _serviceLocator = this.serviceLocator,
            view;

        if (!_serviceLocator) {
            throw new ReferenceError('Service Locator must be set to resolve views for identifier "' + viewIdentifier + '"');
        }
        try {
            view = this.serviceLocator.get(viewIdentifier);
        } catch (exception) {
        }
        if (view instanceof IrLib.View.Interface) {
            return view;
        }
        throw new ReferenceError('No view for identifier "' + viewIdentifier + '"');
    },

    /**
     * Escapes the given input
     *
     * @param {String} string
     * @returns {string}
     * @private
     */
    _escapeHtml: function (string) {
        var entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;'
        };
        return String(string).replace(/[&<>"'\/]/g, function fromEntityMap(s) {
            return entityMap[s];
        });
    },

    ///**
    // * Renders the actions inside the given template
    // *
    // * @param {String} template
    // * @returns {String}
    // */
    //_renderActions: function (template) {
    //    var actionRegularExpression = /\s\{\{action:([\w\-]*)}}\s/g,
    //        _document = $(document),
    //        matches = [], found, i, _this;
    //
    //    /**
    //    * @type {Iresults.Modal}
    //    * @private
    //    */
    //    _this = this;
    //
    //    while (found = actionRegularExpression.exec(template)) {
    //        matches.push({
    //            expression: found[0],
    //            action: found[1]
    //        });
    //        actionRegularExpression.lastIndex -= found[0].split(':')[1].length;
    //    }
    //
    //    for (i = 0; i < matches.length; i++) {
    //        var elementId = Iresults.Modal.actionElementIds.length,
    //            actionDefinition = matches[i],
    //            actionName = actionDefinition.action,
    //            expression = actionDefinition.expression,
    //            elementIdString = 'ir-modal-' + elementId,
    //            elementIdAttribute = ' id="' + elementIdString + '" ',
    //            data
    //            ;
    //        Iresults.Modal.actionElementIds.push(elementId);
    //
    //        data = {
    //            action: actionName
    //        };
    //
    //        /* Prepare the template */
    //        template = template.replace(expression, elementIdAttribute);
    //
    //        /* Register the click handler */
    //        _document.on('click', '#' + elementIdString, data, function(event) {
    //            var actionName = event.data.action,
    //                imp = _this.controller.actions ? _this.controller.actions[actionName] : _this.controller[actionName];
    //
    //            if (!imp) {
    //                throw new Iresults.ActionError('No implementation for method "' + actionName + '"');
    //            }
    //            imp.call(_this.controller, event);
    //        });
    //    }
    //
    //    return template;
    //},

    /**
     * Replace the placeholders for subviews with the actual view instances
     */
    replaceSubviewPlaceholders: function () {
        var _dom = this._dom;

        this._subviewPlaceholders.forEach(function (view, elementId) {
            var placeholder = _dom.querySelector('#' + elementId);

            //console.log(placeholder, elementId, view.render());

            if (placeholder && placeholder.parentNode) {
                placeholder.parentNode.replaceChild(view.render(), placeholder);
                view.addStoredEventListeners();
            } else {
                throw new ReferenceError(
                    'Could not find subview placeholder #' + elementId
                );
            }
        });
        this._subviewPlaceholders = new IrLib.Dictionary();
    },

    /**
     * @inheritDoc
     */
    appendTo: function (element) {
        this._super(element);
        this.replaceSubviewPlaceholders();
    },

    /**
     * Sets the registered computed variables
     *
     * @param {Object|IrLib.Dictionary} data
     * @returns {IrLib.View.Interface}
     */
    setComputed: function (data) {
        if (typeof data !== 'object') {
            throw new TypeError('Initialization argument has to be of type object, ' + (typeof data) + ' given');
        }
        if (data instanceof IrLib.Dictionary) {
            this._computed = data;
        } else {
            this._computed = new IrLib.Dictionary(data);
        }
        this._needsRedraw = true;
        return this;
    },

    /**
     * Returns the registered computed variables
     *
     * @returns {IrLib.Dictionary}
     */
    getComputed: function () {
        return this._computed;
    },

    /**
     * Sets the template
     *
     * @param {String} template
     * @returns {IrLib.View.Template}
     */
    setTemplate: function (template) {
        var templateTemporary = template.trim();
        if (this._isSelector(templateTemporary)) {
            this._template = this._getTemplateForSelector(templateTemporary);
        } else {
            this._template = templateTemporary;
        }
        this._needsRedraw = true;
        this._templateBlocks = null;
        return this;
    },

    /**
     * Returns the template
     *
     * @returns {String}
     */
    getTemplate: function () {
        return this._template;
    },

    /**
     * Returns the template blocks
     *
     * @returns {IrLib.View.Parser.Block[]}
     */
    getTemplateBlocks: function () {
        if (!this._templateBlocks) {
            var templateParser = this.getTemplateParser();
            this._templateBlocks = templateParser.parse(this._template);
        }
        return this._templateBlocks;
    },

    /**
     * Returns if the given value is a selector
     *
     * @param {*} value
     * @returns {boolean}
     * @private
     */
    _isSelector: function (value) {
        if (typeof value !== 'string') {
            return false;
        }
        if (value.indexOf('<') !== -1 || value.indexOf('{') !== -1) {
            return false;
        }
        var firstChar = value.charAt(0);
        return firstChar === '#' || firstChar === '.' || /^[a-z]/i.test(firstChar);
    },

    /**
     * Returns the template for the given selector
     *
     * @param {String} selector
     * @returns {String}
     * @private
     */
    _getTemplateForSelector: function (selector) {
        var templateElement = document.querySelector(selector),
            templateHtml;
        if (!templateElement) {
            return null;
        }
        templateHtml = templateElement.innerHTML;
        return templateHtml ? templateHtml.trim() : null;
    },

    /**
     * Returns the template parser interface
     *
     * @returns {IrLib.View.Parser.Interface}
     */
    getTemplateParser: function () {
        if (!this._templateParser) {
            this._templateParser = new IrLib.View.Parser.Parser();
        }
        return this._templateParser;
    },

    /**
     * Returns a clone of this object
     *
     * @returns {*}
     */
    clone: function () {
        var _clone = this._super();
        _clone._subviewPlaceholders = new IrLib.Dictionary();
        _clone._lastConditionStateStack = [];
        return _clone;
    }
});


}());



/**
 * A loop based view
 *
 * @implements EventListener
 * @implements IrLib.View.Interface
 * @implements IrLib.View.ContextInterface
 * @implements IrLib.View.SubViewInterface
 */
IrLib.View.LoopView = IrLib.View.AbstractDomView.extend({
    needs: ['serviceLocator'],

    /**
     * @type {IrLib.ServiceLocator}
     */
    serviceLocator: null,

    /**
     * Content to loop over
     *
     * @type {Array}
     */
    _content: null,

    /**
     * Template to repeat
     *
     * @type {IrLib.View.Interface}
     */
    _templateView: null,

    /**
     * Original template input
     *
     * @type {String}
     */
    _originalTemplate: '',

    /**
     * Key to use to access the current iteration value
     *
     * @type {String}
     */
    _asKey: 'this',

    init: function (template, content, asKey) {
        this._super();
        if (template) { // Check if the template argument is given
            this.setTemplate(template);
        } else if (typeof this.template === 'string') { // Check if a template string is inherited
            this.setTemplate(this.template.slice(0));
        }

        if (content) { // Check if the content is given
            this.setContent(content);
        } else if (this.content) { // Check if a content is inherited
            this.setContent(this.content);
        }

        if (asKey) { // Check if the as-key is given
            this._asKey = asKey;
        } else if (typeof this.asKey === 'string') { // Check if the as-key is inherited
            this.setAsKey(this.asKey);
        }

        if (typeof this.context !== 'undefined') { // Check if a context is inherited
            this._context = this.context;
        }

        this.defineProperties({
            'content': {
                enumerable: true,
                get: this.getContent,
                set: this.setContent
            },
            'asKey': {
                enumerable: true,
                get: this.getAsKey,
                set: this.setAsKey
            },
            'needsRedraw': {
                enumerable: true,
                get: this.getNeedsRedraw
            },
            'template': {
                enumerable: true,
                get: this.getTemplateView,
                set: this.setTemplate
            }
        });
    },

    /**
     * Renders the template
     *
     * @return {Node|HTMLElement}
     */
    render: function () {
        if (this._needsRedraw) {
            delete this._dom;

            //this._dom = this._createDom(this.toString());

            var domNode = this._createDom();
            this._render(domNode);
            this._dom = domNode;

            this._needsRedraw = false;
        }
        return this._dom;
    },

    /**
     * Returns the string representation of the rendered template
     *
     * @returns {String}
     */
    toString: function () {
        return this._render();
    },

    /**
     * Loop over to content, render the template and append to the node (if given)
     *
     * @param {Node|HTMLElement} [appendToNode]
     * @returns {string}
     * @private
     */
    _render: function (appendToNode) {
        var content = this._content;
        if (content === null) {
            throw new ReferenceError('No content defined');
        }

        var contentLength = content.length,
            _template = this.getTemplateView(),
            _asKey = this.getAsKey(),
            renderedContent = '',
            templateCopy, currentVariables, scope, i;

        if (!_template) {
            throw new ReferenceError('Template not specified');
        }

        _template.setContext(this);
        for (i = 0; i < contentLength; i++) {
            //templateCopy = IrLib.Utility.GeneralUtility.clone(_template, 12);
            templateCopy = _template.clone();

            currentVariables = content[i];
            scope = {
                _meta: {
                    iteration: i,
                    first: (i === 0),
                    last: (i === contentLength)
                }
            };
            scope[_asKey] = currentVariables;
            templateCopy.setVariables(scope);

            if(appendToNode) {
                appendToNode.appendChild(templateCopy.render());
                if (templateCopy instanceof IrLib.View.Template || typeof templateCopy.replaceSubviewPlaceholders === 'function') {
                    templateCopy.replaceSubviewPlaceholders();
                }
            } else {
                renderedContent += templateCopy.toString();
            }
        }
        return renderedContent;
    },

    /**
     * Sets the content to loop over
     *
     * @param {Array} content
     * @returns {IrLib.View.LoopView}
     */
    setContent: function (content) {
        if (!Array.isArray(content)) {
            throw new TypeError('Argument "content" has to be of type object, ' + (typeof content) + ' given');
        }
        this._content = content;
        this._needsRedraw = true;
        return this;
    },

    /**
     * Returns the content to loop over
     *
     * @returns {Array}
     */
    getContent: function () {
        return this._content;
    },

    /**
     * Set the variables
     *
     * @param {Object|IrLib.Dictionary} data
     * @return {IrLib.View.Interface}
     * @abstract
     */
    setVariables: function (data) {
        this._super(data);
        if (typeof data.content !== 'undefined') {
            this.setContent(data.content);
            //    throw new TypeError('Loop View only accepts variables with a property called "content". See setContent()');
        }
        return this;
    },

    /**
     * Sets the key to use to access the current iteration value
     *
     * @param {String} asKey
     * @returns {IrLib.View.LoopView}
     */
    setAsKey: function (asKey) {
        this._asKey = asKey;
        return this;
    },

    /**
     * Returns the key to use to access the current iteration value
     *
     * @returns {String}
     */
    getAsKey: function () {
        return this._asKey;
    },

    /**
     * Sets the template
     *
     * @param {IrLib.View.Interface|String} template
     * @returns {IrLib.View.LoopView}
     */
    setTemplate: function (template) {
        if (!(template instanceof IrLib.View.Interface) && typeof template !== 'string') {
            throw new TypeError('Invalid type for template, ' + (typeof content) + ' given');
        }
        this._originalTemplate = template;
        return this;
    },

    /**
     * Returns the template
     *
     * @returns {IrLib.View.Interface}
     */
    getTemplateView: function () {
        if (!this._templateView) {
            this._templateView = this._createTemplateViewFromTemplate();
        }
        return this._templateView;
    },

    /**
     * Create the actual template view from the input template
     *
     * @returns {IrLib.View.Interface}
     * @private
     */
    _createTemplateViewFromTemplate: function () {
        var _serviceLocator = this.serviceLocator,
            _originalTemplate = this._originalTemplate,
            templateView;

        if (typeof _originalTemplate == 'string') {
            templateView = new IrLib.View.Template(_originalTemplate);
            if (_serviceLocator) {
                _serviceLocator.resolveDependencies(templateView, IrLib.View.Template);
            }
        } else if (_originalTemplate instanceof IrLib.View.Interface) {
            templateView = _originalTemplate;
        } else {
            throw new TypeError('Invalid type for template, ' + (typeof content) + ' given');
        }

        return templateView;
    },

    /**
     * Returns the View's context
     *
     * @returns {IrLib.View.Interface}
     */
    getContext: function () {
        return this._context;
    },

    /**
     * Sets the View's context
     *
     * @param {IrLib.View.Interface} context
     * @returns {IrLib.View.Interface}
     */
    setContext: function (context) {
        this._context = context;
        return this;
    }
});


/**
 * Created by COD on 25.06.15.
 */

IrLib.View = IrLib.View || {};

/**
 * Current template block information
 *
 * @param {Number} index
 * @param {Block[]} blockStream
 * @constructor
 */
IrLib.View.State = function (index, blockStream) {
    this.index = index|0;
    this.blockStream = blockStream;
};


/**
 * Created by COD on 25.06.15.
 */

IrLib.View = IrLib.View || {};

/**
 * Defines the interface for Views that can be used as subview inside another View
 *
 * @interface
 */
IrLib.View.SubViewInterface = function () {
};

/**
 * Returns the string representation of the rendered template
 *
 * @returns {String}
 */
IrLib.View.SubViewInterface.prototype.toString = function () {
    throw new IrLib.MissingImplementationError('toString');
};


/**
 * Created by COD on 25.06.15.
 */

IrLib.View = IrLib.View || {};

/**
 * Defines a common interface for Views with variables
 *
 * @interface
 */
IrLib.View.VariableViewInterface = function () {
};


/**
 * Sets the variables
 *
 * @param {Object|IrLib.Dictionary} data
 * @returns {IrLib.View.Interface}
 */
IrLib.View.VariableViewInterface.prototype.setVariables = function (data) {
    throw new IrLib.MissingImplementationError('setVariables');
};

/**
 * Adds the variable with the given key and value
 *
 * @param {String} key
 * @param {*} value
 * @returns {IrLib.View.Interface}
 */
IrLib.View.VariableViewInterface.prototype.assignVariable = function (key, value) {
    throw new IrLib.MissingImplementationError('assignVariable');
};

/**
 * Returns the currently assigned variables
 *
 * @returns {IrLib.Dictionary}
 */
IrLib.View.VariableViewInterface.prototype.getVariables = function () {
    throw new IrLib.MissingImplementationError('getVariables');
};


}());


(function() {/*    require('view\/parser\/*');// */

/**
 * Created by daniel on 05.07.15.
 */
IrLib.View.Parser = IrLib.View.Parser || {};

IrLib.View.Parser.BlockType = {
    STATIC: 'STA',
    VARIABLE: 'VAR',
    REPEATING: 'REP',
    EXPRESSION: 'EXP',
    CONDITIONAL: 'CON'
};


/**
 * Created by daniel on 05.07.15.
 */
IrLib.View.Parser = IrLib.View.Parser || {};

/**
 * Definition of a template block
 *
 * @param {String} type Block type as one of the BlockType constants
 * @param {String} content Inner content of the block
 * @param {Object} [meta] Metadata needed to render this block
 * @constructor
 */
IrLib.View.Parser.Block = function(type, content, meta) {
    this.type = type;
    this.content = content;
    this.meta = meta || {};
};


/**
 * Created by daniel on 05.07.15.
 */
IrLib.View.Parser = IrLib.View.Parser || {};

IrLib.View.Parser.ExpressionType = {
    UNKNOWN: 'UNK',

    VIEW: 'view',

    REPEATING_START: 'for',
    REPEATING_END: 'endfor',
    CONDITIONAL_START: 'if',
    CONDITIONAL_END: 'endif',

    ELSE: 'else',

    /**
     * Returns the keyword if it is a valid type, or UNKNOWN otherwise
     *
     * @param {String} keyword
     * @returns {String}
     */
    getTypeForKeyword: function(keyword) {
        return this.isKeyword(keyword) ? keyword : this.UNKNOWN;
    },

    /**
     * Returns if the given value is a valid type
     *
     * @param {String} keyword
     * @returns {Boolean}
     */
    isKeyword: function(keyword) {
        if (typeof keyword !== 'string') {
            return false;
        }
        var objectKeys = Object.keys(this),
            objectKeysLength = objectKeys.length;


        for (var i = 0; i < objectKeysLength; i++) {
            if (this[objectKeys[i]] === keyword) {
                return true;
            }
        }
        return false;
    }
};


/**
 * Created by COD on 25.06.15.
 */

IrLib.View.Parser = IrLib.View.Parser || {};

/**
 * Interface for template parsers
 *
 * @interface
 */
IrLib.View.Parser.Interface = IrLib.CoreObject.extend({
    /**
     * Parses the given input string and returns a sequence of Blocks
     *
     * @param {String} input
     * @return {Block[]}
     */
    parse: function(input) {
        throw new IrLib.MissingImplementationError('parse');
    }
});


/**
 * Created by COD on 25.06.15.
 */

/**
 * @abstract
 * @type {{}}
 */
IrLib.View.Template = IrLib.View.Template || {};

/**
 * Interface for template parsers
 *
 * @interface
 */
IrLib.View.Template.ParserInterface = IrLib.CoreObject.extend({
    /**
     * Parses the given input string and returns a sequence of Blocks
     *
     * @param {String} input
     * @return {Block[]}
     */
    parse: function(input) {
        throw new IrLib.MissingImplementationError('parse');
    }
});


/**
 * Created by COD on 25.06.15.
 */
(function() {/*require('view\/parser\/interface');// */

}());



/**
 * Template Parser implementation
 */
IrLib.View.Parser.Parser = IrLib.View.Parser.Interface.extend({
    /**
     * Start of an expression
     */
    EXPRESSION_START: '{%',

    /**
     * End of an expression
     */
    EXPRESSION_END: '%}',

    /**
     * Start character of a block
     */
    BLOCK_START_CHAR: '{',

    /**
     * End character of a block
     */
    BLOCK_END_CHAR: '}',

    /**
     * Number the block start and end characters have to occur to build an un-safe block
     */
    BLOCK_DELIMITER_REPEAT_NO_SAFE: 2,

    /**
     * Number the block start and end characters have to occur to build an safe block
     */
    BLOCK_DELIMITER_REPEAT_SAFE: 3,

    /**
     * Regular expression to match variable blocks
     */
    PATTERN_VARIABLE: /^\{{2,3}\s*[a-zA-Z0-9\-_\.]+\s*}{2,3}$/,

    /**
     * Parses the given input string and returns a sequence of Blocks
     *
     * @param {String} input
     * @return {Block[]}
     */
    parse: function (input) {
        if (typeof input !== 'string') {
            throw new TypeError('Expected argument "input" to be of type string, ' + (typeof input) + ' given');
        }

        var tokens = this._tokenize(input);
        return this._analyze(tokens);
    },

    /**
     * Analyzes and classifies the tokens
     *
     * @param {String[]} tokens
     * @return {Block[]}
     * @private
     */
    _analyze: function (tokens) {
        var Block = IrLib.View.Parser.Block,
            BlockType = IrLib.View.Parser.BlockType,
            ExpressionType = IrLib.View.Parser.ExpressionType,
            _PATTERN_VARIABLE = this.PATTERN_VARIABLE,
            _BLOCK_START_CHAR = this.BLOCK_START_CHAR,
            _BLOCK_END_CHAR = this.BLOCK_END_CHAR,
            _BLOCK_DELIMITER_REPEAT_NO_SAFE = this.BLOCK_DELIMITER_REPEAT_NO_SAFE,
            _BLOCK_DELIMITER_REPEAT_SAFE = this.BLOCK_DELIMITER_REPEAT_SAFE,
            _EXPRESSION_START = this.EXPRESSION_START,
            _EXPRESSION_END = this.EXPRESSION_END,
            blockStartString = new Array(_BLOCK_DELIMITER_REPEAT_NO_SAFE + 1).join(_BLOCK_START_CHAR),
            expressionLength = _EXPRESSION_START.length,
            tokensLength = tokens.length,
            blocks = [],
            startsWithBlockStart,
            currentToken,
            currentTokenLength,
            currentContent,
            i;

        for (i = 0; i < tokensLength; i++) {
            currentToken = tokens[i];
            currentTokenLength = currentToken.length;

            // Don't check for brackets for tokens that are too short
            if (currentTokenLength > 2) {
                startsWithBlockStart = currentToken.substr(0, 1) === _BLOCK_START_CHAR;
            } else {
                startsWithBlockStart = false;
            }

            if (startsWithBlockStart && currentToken.substr(0, _BLOCK_DELIMITER_REPEAT_NO_SAFE) === blockStartString &&
                _PATTERN_VARIABLE.test(currentToken)) {
                currentContent = currentToken.substring(
                    _BLOCK_DELIMITER_REPEAT_NO_SAFE,
                    currentTokenLength - _BLOCK_DELIMITER_REPEAT_NO_SAFE
                );

                var contentFirstCharacterIsBlockStart = currentContent.charAt(0) === _BLOCK_START_CHAR;
                if (
                    contentFirstCharacterIsBlockStart &&
                    (currentContent.charAt(
                        currentTokenLength - _BLOCK_DELIMITER_REPEAT_NO_SAFE - _BLOCK_DELIMITER_REPEAT_NO_SAFE - 1
                    ) === _BLOCK_END_CHAR)
                ) { // Case 1 = safe: {{{varName}}}
                    blocks[i] = new Block(
                        BlockType.VARIABLE,
                        currentToken.substring(_BLOCK_DELIMITER_REPEAT_SAFE, currentTokenLength - _BLOCK_DELIMITER_REPEAT_SAFE).trim(),
                        {isSafe: true}
                    );
                } else if (contentFirstCharacterIsBlockStart) { // Case 2 = invalid: {{varName}
                    blocks[i] = new Block(BlockType.STATIC, currentToken);
                } else { // Case 3 = not safe: {{varName}}
                    blocks[i] = new Block(
                        BlockType.VARIABLE,
                        currentContent.trim(),
                        {isSafe: false}
                    );
                }

            } else if (startsWithBlockStart &&
                currentToken.substr(0, expressionLength) === _EXPRESSION_START &&
                currentToken.substr(currentTokenLength - expressionLength) == _EXPRESSION_END
            ) {
                var expressionType, currentContentTrimmed;
                currentContent = currentToken.substring(expressionLength, currentTokenLength - expressionLength);
                currentContentTrimmed = currentContent.trim();
                if (ExpressionType.isKeyword(currentContentTrimmed)) {
                    expressionType = currentContentTrimmed;
                } else if (ExpressionType.isKeyword(currentContentTrimmed.substring(0, currentContentTrimmed.indexOf(' ')))) {
                    expressionType = currentContentTrimmed.substring(0, currentContentTrimmed.indexOf(' '));
                } else {
                    expressionType = ExpressionType.UNKNOWN;
                }
                blocks[i] = new Block(BlockType.EXPRESSION, currentContentTrimmed, {
                    expressionType: expressionType
                });


                /* handle other cases */
            } else {
                blocks[i] = new Block(BlockType.STATIC, currentToken);
            }

            //console.log('TYPE:', blocks[i].type, blocks[i].content);
        }
        return blocks;
    },

    /**
     * Splits the input into an array of tokens
     *
     * @param {String} input
     * @returns {String[]}
     * @private
     */
    _tokenize: function (input) {
        var inputLength = input.length,
            _BLOCK_START_CHAR = this.BLOCK_START_CHAR,
            _BLOCK_END_CHAR = this.BLOCK_END_CHAR,
            tokens = [],
            startCursor = 0,
            endCursor = 0,
            currentBlockIndex = 0,
            i = 0,
            nextStartCursor,
            content;

        do {
            // If the first character is a bracket look for the ending one
            if (input.charAt(startCursor) === _BLOCK_START_CHAR) {
                endCursor = input.indexOf(
                    _BLOCK_END_CHAR,
                    startCursor
                );
                while (input.charAt(endCursor + 1) === _BLOCK_END_CHAR && endCursor < inputLength) {
                    endCursor++;
                }

                nextStartCursor = endCursor + 1;
            } else { // Look for the beginning of the next block
                nextStartCursor = input.indexOf(_BLOCK_START_CHAR, startCursor + 1);
                if (nextStartCursor === -1) {
                    endCursor = inputLength;
                } else {
                    endCursor = nextStartCursor - 1;
                }
            }

            content = input.substr(startCursor, endCursor - startCursor + 1);

            tokens[currentBlockIndex++] = content;

            if (++i > 100000) {
                throw new Error('Infinite loop?');
            }
            startCursor = nextStartCursor;
        } while (startCursor !== -1);
        return tokens;
    }
});


}());



})(typeof exports === 'undefined'? this.IrLib = {}: exports);

// require('additional files')

