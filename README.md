# EnvTwoJson

This package allows `env-to-json` and `json-to-env` on CMD and code level usage

## Install

```sh
 ## local use
 $ npm i envtwojson

  ## global use
 $ npm i -g envtwojson
```

## Example Usage By Code

```ts
const { envFromPathToJson, envFromStringToJson, jsonFromPathToEnv } = require("envtwojson");
// ENV2JSON: location here is the part from the app root.
const { jsonEnv, location } = envFromPathToJson('examples/.env-sample'); 

// ENV2JSON: Or use below approach
// location here is always current app directory where this method is used and env data are always separated by newline.
const env = `BASE_URL=http://example.com
			 APP_PATH=/api/v1/users
			 `			 
const { jsonEnv, location } = envFromStringToJson(env); 


// JSON2ENV: location here is the part from the app root.
const { jsonEnv, location } = jsonFromPathToEnv('examples/env-sample.json');
```



## Example Usage By CMD
 
Options supported are stated below

<table>
	<tr><th width="10%">Options</th> <th width="50%">Description</th> <th width="40%">Value</th></tr>
	<tr>
		<td>`--file`</td>
		<td>Most important, providing the file path to the `.env-sample` or `env-sample.json`,  eg: `--file=examples/.env-sample` or `--file=examples/env-sample.json`</td>
		<td>`users/configs/.env-sample` or `src/.env-sample` etc,</td>
	</tr>
	<tr>
		<td>`--env`</td>
		<td>Most important if `--file` is not provided eg: `--env=BASE_URL="https://we.com;API_URL=https://api.example.com/v1/"`, separated with semicolon(`;`) or newline (`\n`)</td>
		<td>`--env="API_BASE_URL=users/configs/.env-sample; CARD_NO=13313`</td>
	</tr>
	<tr>
		<td>`--wtr`</td>
		<td>Write to root is a boolean type to generate equivalent .json version of same name. `.env-sample` will be `env.json`</td> 
		<td>`true|false`  or `1|0`, eg: `--wtr=true`</td>
	</tr>
	<tr>
		<td>`--out`</td> 
		<td>Output allows you to provide the path to write into. this will write from current directory plus the path provided.</td> 
		<td>`--out=/users/configs`</td>
	</tr>
	<tr>
		<td>`--cls`</td> 
		<td>This options is the default option without needing to provide the flag, if any of the above isn't provided, it write to console and it is a boolean type</td>
		<td>`--cls=true`</td>
	</tr>
</table>
<br><br>


See use case below, you can either use `etwoj` or `envtwojson` for command name, you can as well change `--file` for `--env` to use string type as seen below but separated delimiter is used as semicolon (`;`) or newline (`\n`)

```sh
 ## Default to console
$ envtwojson --file=examples/.env-sample 

 ## Default to console
$ envtwojson --env='https://we.com;API_URL=https://api.example.com/v1/'

## Write to source directory env.json derived from filename of .env-sample
$ envtwojson --file=examples/.env-sample --wtr=true 

## Write to the location provided from a known directory.
$ envtwojson --file=examples/.env-sample --out=examples/env-sample.json 


## JSON2ENV: Write to the location provided from a known directory.
$ envtwojson --file=examples/env-sample.json --out=examples/.env-sample

## JSON2ENV: ## Default to console
$ envtwojson --file=examples/env-sample.json 

## JSON2ENV: Write to source directory env.json derived from filename of .env-sample
$ envtwojson --file=examples/env-sample.json --wtr=true 

```

<h3>OR</h3>


```sh
 ## Default to console
$ etwoj --file=examples/.env-sample 

 ## Default to console
$ etwoj --env='https://we.com;API_URL=https://api.example.com/v1/'

## Write to source directory env.json derived from filename of .env-sample
$ etwoj --file=examples/.env-sample --wtr=true 

## Write to the location provided from a known directory.
$ etwoj --file=examples/.env-sample --out=examples/env-sample.json 


## JSON2ENV: Write to the location provided from a known directory.
$ etwoj --file=examples/env-sample.json --out=examples/.env-sample-local

## JSON2ENV: ## Default to console
$ etwoj --file=examples/env-sample.json 


## JSON2ENV: Write to source directory env.json derived from filename of .env-sample
$ etwoj --file=examples/env-sample.json --wtr=true 
```
