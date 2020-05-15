/*jslint
    fudge, node
*/

import {
    appendFile,
    readdir,
    readFile,
    unlink,
    writeFile
} from "fs";
import {
    object_has_property,
    is_object
} from "@jlrwi/esfunctions";

const append_file = function (options) {
    return function (path) {
        return function (callback) {

            const node_callback = function (err) {
                return (
                    err
                    ? callback (undefined, err.message)
                    : callback (true)
                );
            };

            return function (data) {
                if (is_object (options)) {
                    const options_param = (
                        object_has_property ("flag") (options)
                        ? options
                        : options.encoding
                    );
                    appendFile(path, data, options_param, node_callback);
                } else {
                    appendFile(path, data, node_callback);
                }
            };
        };
    };
};

const read_directory = function (options) {
    return function (callback) {

        const node_callback = function (err, files) {
            return (
                err
                ? callback (undefined, err.message)
                : callback (files)
            );
        };

        return function (path) {
            if (is_object (options)) {
                readdir(path, options, node_callback);
            } else {
                readdir(path, node_callback);
            }
        };
    };
};

const read_file = function (options) {
    return function (callback) {

        if (!object_has_property ("encoding") (options)) {
            return callback (undefined, "Invalid encoding");
        }

        const options_param = (
            object_has_property ("flag") (options)
            ? options
            : options.encoding
        );


        return function (path) {
            readFile(path, options_param, function (err, source) {
                return (
                    err
                    ? callback (undefined, err.message)
                    : callback (source)
                );
            });
        };
    };
};

const unlink_file = function (callback) {
    return function (path) {
        unlink(path, function (err) {
            return (
                err
                ? callback (undefined, err.message)
                : callback (true)
            );
        });
    };
};

const write_file = function (options) {
    return function (path) {
        return function (callback) {

            const node_callback = function (err) {
                return (
                    err
                    ? callback (undefined, err.message)
                    : callback (path)
                );
            };

            return function (data) {
                if (is_object (options)) {
                    const options_param = (
                        object_has_property ("flag") (options)
                        ? options
                        : options.encoding
                    );
                    writeFile(path, data, options_param, node_callback);
                } else {
                    writeFile(path, data, node_callback);
                }
            };
        };
    };
};

export {
    append_file,
    read_directory,
    read_file,
    unlink_file,
    write_file
};