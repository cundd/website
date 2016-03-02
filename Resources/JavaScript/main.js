if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

(function (exports) {
    var Cundd = exports;

    Cundd.config = {
        prompt: '> '
    };

    Cundd.Buffer = IrLib.CoreObject.extend({
        _content: '',
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
            this.defineProperty('content', {
                enumerable: true,
                get: this.getContent,
                set: this.setContent
            });
        },

        addLine: function (line) {
            this._content += line + "\n";
        },

        getContent: function () {
            return this._content;
        },

        setContent: function (newContent) {
            this._content = newContent;
        },

        clear: function () {
            this._content = '';
        },

        toString: function () {
            return this.getContent();
        }
    });

    Cundd.CommandHandler = IrLib.CoreObject.extend({
        needs: ['appView:view', 'contentBuffer'],
        /**
         * @type {Cundd.Buffer}
         */
        contentBuffer: null,

        commandHistoryPosition: 0,
        commandHistory: [],

        /**
         *
         * @param {String} direction
         * @param {Cundd.AppView|IrLib.View.Template|IrLib.View.AbstractVariableView} view
         */
        handleArrow: function (direction, view) {
            if (direction === 'up') {
                if (this.commandHistoryPosition < this.commandHistory.length) {
                    this.commandHistoryPosition++;
                } else {
                    IrLib.Logger.debug('Already at the earliest command history');
                    return;
                }
            } else if (direction === 'down') {
                if (this.commandHistoryPosition > 0) {
                    this.commandHistoryPosition--;
                } else {
                    IrLib.Logger.debug('Already at the newest command history');
                    return;
                }
            }

            var index = this.commandHistory.length - this.commandHistoryPosition;
            if (this.commandHistoryPosition === 0) {
                view.assignVariable('inputLine', '');
            } else if (this.commandHistory[index]) {
                view.assignVariable('inputLine', this.commandHistory[index]);
            }
            view.reloadAndSetCursor();
        },

        handleHotKey: function (keyCode, event) {
            switch (keyCode) {
                case 75: // Meta+K Ctrl+K
                    this.contentBuffer.clear();
                    this.view.reloadAndSetCursor();
                    break;
            }
        },

        _autoComplete: function (value) {
            var commandLineParts = value.split(' '),
                commandLinePartsLength = commandLineParts.length,
                matches, prefix, options, firstMatch;

            if (commandLinePartsLength > 1) {
                options = this.files.keys();
            } else {
                options = this._getCommands();
            }

            prefix = commandLineParts[commandLinePartsLength - 1];
            if (prefix.trim()) {
                matches = options.filter(function (item) {
                    return item.startsWith(prefix);
                });
            } else {
                matches = options;
            }

            if (matches.length === 0) {
                return value;
            }

            firstMatch = matches[0];
            if (commandLinePartsLength > 1) {
                return commandLineParts[0].trim() + ' ' + firstMatch;
            }

            return firstMatch.trim() + ' ';
        },

        handleTab: function () {
            var _view = this.view,
                value = _view.inputValue().trim();
            if (value) {
                _view
                    .assignVariable('inputLine', this._autoComplete(value))
                    .reloadAndSetCursor();
            }
        },

        _getCommands: function () {
            var commands = [];
            for (var propertyName in this) {
                if (propertyName.endsWith('Command')
                    && typeof this[propertyName] === 'function') {
                    commands.push(propertyName.slice(0, -7));
                }
            }
            return commands;
        },

        handleCommandLine: function (commandLine, view) {
            var commandParts, command, commandImpl;

            commandLine = commandLine.trim();
            if (!commandLine) {
                this.echo(Cundd.config.prompt);
                return;
            }
            commandParts = commandLine.split(' ');
            command = commandParts[0];
            commandImpl = this[command + 'Command'];

            this.echo(Cundd.config.prompt + commandLine);
            this.commandHistory.push(commandLine);
            if (typeof commandImpl === 'function') {
                commandParts.shift();
                commandImpl.apply(this, commandParts);
            } else {
                this.echo('cunddsh: command not found: ' + command);
            }
            view.assignVariable('inputLine', '');
        },

        _trimQuotes: function (message) {
            return message.replace(/^"|"$|^'|'$/gm, '');
        },

        echo: function (message) {
            var _argumentCount = arguments.length,
                fullOutput = '',
                i;
            for (i = 0; i < _argumentCount; i++) {
                message = arguments[i];
                IrLib.Logger.debug(message);
                fullOutput += message + " ";
            }
            this.contentBuffer.addLine(
                '<code>' + fullOutput + '</code>'
            );
        },

        echoCommand: function (message) {
            this.echo.apply(this, Array.prototype.map.call(arguments, this._trimQuotes));
        },

        files: new IrLib.Dictionary({
            "README": {
                "stats": "-rw-r--r--  3 cundd staff  102B Feb 27 13:06",
                "content": "My name is Daniel. I'm a web developer living in Vorarlberg in Austria."
            },
            "REST-for-TYPO3-rest.cundd.net": {
                "stats": "drwxr-xr-x  3 cundd staff  102B Feb 27 13:06",
                "url": "http://rest.cundd.net"
            },
            "Composer-for-TYPO3": {
                "stats": "drwxr-xr-x  3 cundd staff  102B Feb 27 13:06",
                "url": "https://github.com/cundd/CunddComposer"
            },
            "Assetic-for-TYPO3": {
                "stats": "drwxr-xr-x  3 cundd staff  102B Feb 27 13:06",
                "url": "https://github.com/cundd/CunddAssetic"
            },
            "noshi.cundd.net": {
                "stats": "drwxr-xr-x  3 cundd staff  102B Feb 27 13:06",
                "url": "http://noshi.cundd.net"
            },
            "stairtower.cundd.net": {
                "stats": "drwxr-xr-x  3 cundd staff  102B Feb 27 13:06",
                "url": "http://stairtower.cundd.net"
            },
            "github.com": {
                "stats": "drwxr-xr-x  3 cundd staff  102B Feb 27 13:06",
                "url": "https://github.com/cundd"
            }
        }),

        cdCommand: function (directory) {
            var fileStat = this.files[directory];

            if (fileStat && fileStat.url) {
                window.location.href = '' + fileStat.url;
            } else if (fileStat) {
                this.echo('cd: not a directory: ' + directory);
            } else {
                this.echo('cd: no such file or directory: ' + directory);
            }
        },

        catCommand: function (file) {
            var fileStat = this.files[file];

            if (fileStat && fileStat.content) {
                this.echo(fileStat.content)
            } else if (fileStat) {
                this.echo('cat: not a directory: ' + file);
            } else {
                this.echo('cat: no such file or directory: ' + file);
            }
        },

        pwdCommand: function () {
            this.echo('/');
        },

        _filterFiles: function (filter) {
            var _files = this.files,
                filteredFiles = new IrLib.Dictionary();
            if (!filter) {
                return _files;
            }

            _files.forEach(function (data, fileName) {
                //console.log(fileName, fileName === filter)
                if (fileName === filter) {
                    filteredFiles[fileName] = data;
                }
            });

            return filteredFiles;
        },

        lsCommand: function (filter, list) {
            var _this = this,
                _files = this._filterFiles(filter),
                separator = list ? "\n" : ' ',
                content = [];

            if (filter && _files.keys().length === 0) {
                this.echo('ls: ' + filter + ': No such file or directory')
            }

            if (list) {
                content.push("total " + _files.keys().length);
            }
            _files.forEach(function (data, key) {
                content.push(_this._fileRow(data, key, list));
            });

            this.echo(content.join(separator));
        },

        _linkWrap: function (data, key) {
            if (data.url) {
                return '<a href="' + data.url + '" target="_blank">' + key + '</a>';
            }
            return key;
        },

        _fileRow: function (data, key, listStyle) {
            if (!listStyle) {
                return this._linkWrap(data, key);
            }

            return data.stats + ' ' + this._linkWrap(data, key);
        },

        llCommand: function (filter) {
            this.lsCommand(filter, true);
        }


    });

    Cundd.AppController = IrLib.Controller.extend({
        needs: ['appView:view', 'commandHandler'],
        commandHandler: null,

        /**
         * @type {Cundd.AppView}
         */
        _view: null,

        KEY_CODE_ENTER: 13,
        KEY_CODE_ARROW_UP: 38,
        KEY_CODE_ARROW_LEFT: 37,
        KEY_CODE_ARROW_RIGHT: 39,
        KEY_CODE_ARROW_DOWN: 40,
        KEY_CODE_TAB: 9,

        init: function () {
            this._super();

            this.defineProperty('view', {});
            this.defineProperty('view', {
                enumerable: true,
                get: this.getView,
                set: this.setView
            });
        },

        getView: function () {
            return this._view;
        },

        /**
         * @param {Cundd.AppView|IrLib.View.Template} view
         */
        setView: function (view) {
            this._view = view;
            view.setVariables({
                buffer: function () {
                    return sl.get('contentBuffer')
                },
                inputLine: ''
            });
            view.appendTo(document.getElementById('app-root'));
            view.reloadAndSetCursor();
        },

        handleTab: function (event) {
            this.commandHandler.handleTab();
            event.preventDefault();
        },

        handleArrow: function (keyCode, event) {
            var _view = this.view,
                direction = keyCode === this.KEY_CODE_ARROW_UP ? 'up' : 'down';

            this.commandHandler.handleArrow(direction, _view, event.target);
            event.preventDefault();
            _view.reloadAndSetCursor();
        },

        handleCommandLine: function (command, event) {
            var _view = this.view;
            this.commandHandler.handleCommandLine(command, _view);
            _view.reloadAndSetCursor();
        },

        handleHotKey: function (keyCode, event) {
            var _view = this.view;
            this.commandHandler.handleHotKey(keyCode, event);
        },

        events: {

//                click: function (e) {
////                    IrLib.Logger.log('Clicked element', e.target);
////                    IrLib.Logger.log('attached to view', e.irTarget);
//
//                    if (e.target.id === 'save') {
//                        this.view.assignVariable('saved', this.view.variables.saved + 1);
//                        this.view.reload();
//                    }
//
//                    if (e.target.id === 'delete') {
//                        this.view.assignVariable('saved', 0);
//                        this.view.reload();
//                    }
//                },

            'keydown': function (event) {
                var _keyCode = event.keyCode;
                //console.log(_keyCode, event);
                if (_keyCode === this.KEY_CODE_TAB) {
                    this.handleTab(event);
                }
                if (event.metaKey || event.ctrlKey) {
                    this.handleHotKey(_keyCode, event);
                }
                if (_keyCode === this.KEY_CODE_ARROW_UP || _keyCode === this.KEY_CODE_ARROW_DOWN) {
                    this.handleArrow(_keyCode, event);
                }

                if (_keyCode === 13 && event.target) {
                    this.handleCommandLine(event.target.value, event);
                }
            }
        }
    });

    Cundd.AppView = IrLib.View.Template.extend({
        template: '#app-template',
        input: function () {
            return this._dom ? this._dom.querySelector('input') : undefined;
        },

        inputValue: function() {
            var _input = this.input();
            return _input ? _input.value : '';
        },

        reloadAndSetCursor: function (cursorPosition) {
            this.reload(true);

            var viewInput = this.input();
            viewInput.focus();

            if (!cursorPosition) {
                cursorPosition = viewInput.value.length;
            }
            viewInput.setSelectionRange(cursorPosition, cursorPosition);
        }
    });


    var sl = new IrLib.ServiceLocator();
    sl.registerMultiple({
        contentBuffer: Cundd.Buffer,
        commandHandler: Cundd.CommandHandler,
        appView: Cundd.AppView,

        'view/textField': IrLib.View.Template.extend({
            template: Cundd.config.prompt + '<input type="text" autofocus value="{{inputLine}}">'
        }),
        appController: Cundd.AppController
    });

    var controller = sl.get('appController');
    controller.initializeEventListeners();

    document.querySelector('body').addEventListener('click', function () {
        controller.view.input().focus();
    });
})(typeof exports === 'undefined' ? this.Cundd = {} : exports);
