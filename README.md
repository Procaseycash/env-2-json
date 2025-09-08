# EnvTwoJson

This package allows `env-to-json` and `json-to-env` on CMD and code level usage

## Installation Setup

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

| Options    | Description | Value                                                           |
|------------|-------------|-----------------------------------------------------------------|
| `--file`   | Most important, providing the file path to the `.env-sample` or `env-sample.json`, e.g. `--file=examples/.env-sample` or `--file=examples/env-sample.json` | `users/configs/.env-sample` or `src/.env-sample` etc.           |
| `--env`    | Most important if `--file` is not provided, e.g. `--env=BASE_URL="https://we.com;API_URL=https://api.example.com/v1/"`. Values are separated with semicolon at end of line (`;\n` or `;\r`) or newline (`\n` or `\r`). | `--env="API_BASE_URL=users/configs/.env-sample; CARD_NO=13313"` |
| `--wtr`    | Write to root is a boolean type to generate equivalent `.json` version of same name. `.env-sample` will be `env.json`. | `true\|false` or `1\|0`, e.g. `--wtr=true`                      |
| `--out`    | Output allows you to provide the path to write into. This will write from current directory plus the path provided. | `--out=/users/configs`                                          |
| `--cls`    | This option is the default without needing to provide the flag. If none of the above is provided, it writes to console. It is a boolean type. | `--cls=true`                                                    |


See use case below, you can either use `etwoj` or `envtwojson` for command name, you can as well change `--file` for `--env` to use string type as seen below but separated delimiter is used as semicolon with end of line (`;\n|;\r`) or newline (`\n|\r`)

```sh
 ## Default to console
$ envtwojson --file=examples/.env-sample 

 ## Default to console
$ envtwojson --env='URL=https://we.com;\nAPI_URL=https://api.example.com/v1/'

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

**OR**


```sh
 ## Default to console
$ etwoj --file=examples/.env-sample 

 ## Default to console
$ etwoj --env='URL=https://we.com;\nAPI_URL=https://api.example.com/v1/'

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
