const {
  envFromPathToJson,
  envFromStringToJson,
  jsonFromPathToEnv,
} = require("./index.min.js");

console.log("// ENV2JSON: location here is the part from the app root.");

const { jsonEnv: env1, location: loc1 } = envFromPathToJson(
  "./examples/.env-sample"
);
console.log("location: " + loc1 + " ENV: \n");
console.log(env1);

console.log(`\n// ENV2JSON: Or use below approach
// location here is always current app directory where this method is used and env data are always separated by newline.\n`);

const env = `BASE_URL=http://example.com
			 APP_PATH=/api/v1/users
			 `;
const { jsonEnv: env2, location: loc2 } = envFromStringToJson(env);
console.log("location: " + loc2 + " ENV: \n");
console.log(env2);


console.log(`\n// ENV2JSON: Or use below approach
// location here is always current app directory where this method is used and env data are always separated by semi-colon with end of line.;\n`);
const env_ = `BASE_URL=http://example.com;endpoint=efhfet;\nAPP_PATH=/api/v1/users`;
const { jsonEnv: v1, location: l2 } = envFromStringToJson(env_);
console.log("location: " + l2 + " ENV: \n");
console.log(v1);


console.log("\n// JSON2ENV: location here is the part from the app root.\n");

const { jsonEnv: env3, location: loc3 } = jsonFromPathToEnv(
  "examples/env-sample.json"
);
console.log("location: " + loc3 + " ENV: \n");
console.log(env3);
