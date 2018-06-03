import * as YAML from 'yamljs';
import { join } from 'path';

// Path being two levels up from utils (in the project directory)
var config = YAML.load(join(__dirname,'../../','config.yaml'));

export default config;