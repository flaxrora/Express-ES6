/**
 * create singleton instances from here, it will be setted on application startup
 */

import container from '.';

container.create('typer', require('io-ts'));
