"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YAML = require("yamljs");
const path_1 = require("path");
// Path being two levels up from utils (in the project directory)
var config = YAML.load(path_1.join(__dirname, '../../', 'config.yaml'));
exports.default = config;
