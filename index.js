/*jslint
    fudge, node
*/

import {
    appendFile,
    close,
    open,
    read,
    readdir,
    readFile,
    unlink,
    writeFile
} from "fs";

const append_file = function (options) {
    return function (path) {
        return function append_file_requestor(callback) {

            const node_callback = function (err) {
                return (
                    err
                    ? callback(undefined, err.message)
                    : callback(true)
                );
            };

            return function (data) {
                try {
                    if (options === undefined) {
                        appendFile(path, data, node_callback);
                    } else {
                        appendFile(path, data, options, node_callback);
                    }
                } catch (exception) {
                    callback(undefined, exception.message);
                }
            };
        };
    };
};

const close_file = function (callback) {
    return function (fd) {

        const node_callback = function (err) {
            return (
                err
                ? callback(undefined, err.message)
                : callback(fd)
            );
        };

        try {
            close(fd, node_callback);
        } catch (exception) {
            callback(undefined, exception.message);
        }
    };
};

const open_file = function (options = {}) {
    return function open_requestor(callback) {
        return function (path) {
            let args = [path];

            const node_callback = function (err, fd) {
                return (
                    err
                    ? callback(undefined, err)
                    : callback(fd)
                );
            };

            if (options.flags !== undefined) {
                args.push(options.flags);
            }

            if (options.mode !== undefined) {
                args.push(options.mode);
            }

            args.push(node_callback);

            try {
                open(...args);
            } catch (exception) {
                callback(undefined, exception.message);
            }
        };
    };
};

const read_from_file = function ({buffer, offset, length, position}) {
    return function (callback) {
        return function (fd) {

// Create a buffer of appropriate size if none passed in
            if ((
                buffer === undefined
            ) && (
                offset === undefined
            ) && (
                length !== undefined
            )) {
                offset = 0;
                buffer = Buffer.alloc(length);
            }

            const node_callback = function (err, bytes_read, buffer) {
                return (
                    err
                    ? callback(undefined, err.message)
                    : callback({
                        fd,
                        bytes_read,
                        buffer,
                        offset,
                        position
                    })
                );
            };

            try {
                read(fd, {buffer, offset, length, position}, node_callback);
            } catch (exception) {
                callback(undefined, exception.message);
            }
        };
    };
};

const read_directory = function (options) {
    return function read_directory_requestor(callback) {

        const node_callback = function (err, files) {
            return (
                err
                ? callback(undefined, err.message)
                : callback(files)
            );
        };

        return function (path) {
            try {
                if (options === undefined) {
                    readdir(path, node_callback);
                } else {
                    readdir(path, options, node_callback);
                }
            } catch (exception) {
                callback(undefined, exception.message);
            }
        };
    };
};

const read_file = function (options) {
    return function read_file_requestor(callback) {

        const node_callback = function (err, data) {
            return (
                err
                ? callback(undefined, err.message)
                : callback(data)
            );
        };

        return function (path) {
            try {
                if (options === undefined) {
                    readFile(path, node_callback);
                } else {
                    readFile(path, options, node_callback);
                }
            } catch (exception) {
                callback(undefined, exception.message);
            }
        };
    };
};

const unlink_file = function unlink_file_requestor(callback) {
    return function (path) {

        const node_callback = function (err) {
            return (
                err
                ? callback(undefined, err.message)
                : callback(true)
            );
        };

        try {
            unlink(path, node_callback);
        } catch (exception) {
            callback(undefined, exception.message);
        }
    };
};

const write_file = function (options) {
    return function (path) {
        return function write_file_requestor(callback) {

            const node_callback = function (err) {
                return (
                    err
                    ? callback(undefined, err.message)
                    : callback(path)
                );
            };

            return function (data) {
                try {
                    if (options === undefined) {
                        writeFile(path, data, node_callback);
                    } else {
                        writeFile(path, data, options, node_callback);
                    }
                } catch (exception) {
                    callback(undefined, exception.message);
                }
            };
        };
    };
};

export {
    append_file,
    close_file,
    open_file,
    read_from_file,
    read_directory,
    read_file,
    unlink_file,
    write_file
};
