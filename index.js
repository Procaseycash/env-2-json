const fs = require('fs');

const getArg = (name) => {
	const argvs = process.argv;
	
	for (let arg of argvs) {
		if (arg.toLowerCase().includes(name.toLowerCase())) {
			const pos = arg.indexOf("=");
			const key = arg.substring(0, pos);
			const value = arg.substring(pos + 1);
			return [key, value];
		}
	}

	return [];
}

const getDir = path => {
	const currentDirectory = process.cwd();
	return path[0] !== '/' ? currentDirectory + '/' + path : currentDirectory + path;
};

const castObjToEnv = (parentKey, data) => {
  let envData = '';
  const recursiveEnv = (key, obj) => {
  	if (typeof obj !== 'object') return envData += `${key}=${obj}\n`;
    if (Array.isArray(obj)) {
    	if (typeof obj[0] !== 'object') {
    		return envData += `${key}=${obj.toString()}\n`;
    	}
      	obj.forEach((r) => recursiveEnv(key, r));
    } else {
     	Object.keys(obj).forEach(k => recursiveEnv(`${key}.${k}`, obj[k]) );
    }
  };

  try {
    recursiveEnv(parentKey, data);
    return envData;
  } catch (e) {
    return `${parentKey}=${data}\n`;
  }

};

const convertJsonStringToEnv = (jsonString) => {
	const records = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
	let jsonEnv = '';
	for (let key in records) {
		let value = records[key];

		if (key === "" || value === "") continue;

		if (typeof value === 'object') {
		 	jsonEnv += castObjToEnv(key, value);
		 } else {
			jsonEnv += `${key}=${value}\n`;
		}
	}
	return { jsonEnv, location: process.cwd() } ;
}

const convertJsonToEnv = (path) => {
	const location = getDir(path);
	if (!location.includes('.json')) throw new Error ('File type must be a .json');
	const json = fs.readFileSync(location, 'utf8');
	const { jsonEnv } = convertJsonStringToEnv(json);
	return { jsonEnv, location } ;
}


const convertEnvStringToJson = (env) => {
	const records = env.split(/\\n|;|\\r|\n/g);
	const jsonEnv = {};
	for (let i = 0; i < records.length; i++) {
		const pos = records[i].indexOf("=");
		const key = records[i].substring(0, pos)?.trim();
		const value = records[i].substring(pos + 1)?.trim();
		if (key === "" || value === "") continue;
		jsonEnv[key] = value;
	}

	return { jsonEnv, location: process.cwd() } ;
}

const convertEnvToJson = (path) => {
	const location = getDir(path);
	if (!location.includes('.env')) throw new Error ('File type must be a .env');
	const env = fs.readFileSync(location, 'utf8');
	const { jsonEnv } = convertEnvStringToJson(env);
	return { jsonEnv, location } ;
}

const convertEnvJsonViaCMD = () => {
	const filePath = getArg('--file')[1]?.trim();
	const envString = getArg('--env')[1]?.trim();
	const isConsole = getArg('--csl')[1]?.trim();	
	const isWriteToRoot = getArg('--wtr')[1]?.trim();
	const outputPath = getArg('--out')[1]?.trim();
	
	if (!filePath && !envString) throw new Error ('FilePath or envString not supplied');

	const toEnv = filePath?.endsWith('.json');
	
	let result = { location: null, jsonEnv: null };

	if (toEnv) {
		result = convertJsonToEnv(filePath);
	} else {
		result = envString ? convertEnvStringToJson(envString) : convertEnvToJson(filePath);
	}
	
	const { jsonEnv, location } = result;
	
	const data = toEnv ? jsonEnv.trim() : JSON.stringify(jsonEnv, null, 2);

	const fileType = toEnv ? '.env' : '.json';

	if (outputPath) {
		
		if (!outputPath.includes(fileType)) throw new Error (`File type must be a ${fileType}`);

		const ouputFullPath = getDir(outputPath);
		fs.writeFileSync(ouputFullPath, data , { flag: 'w', encoding: 'utf8' });
		process.exit(0);
	}

	if (isWriteToRoot === 'true' || isWriteToRoot === '1' ) {
		const newLocation = toEnv ? '.' + location.replace('.json', '') : location.replace('.env', 'env') + '.json';
		fs.writeFileSync(newLocation, data, { flag: 'w', encoding: 'utf8' });
		process.exit(0);
	}

	if (isConsole !== 'false' || isConsole !== '0') {
		console.log('\n\n*******************************START*******************************\n\n' + data + '\n\n********************************END********************************\n\n');

		process.exit(0);
	}
}


module.exports = { envFromPathToJson: convertEnvToJson, envFromStringToJson: convertEnvStringToJson, getArg, jsonFromPathToEnv: convertJsonToEnv };

if (require.main === module) {
	convertEnvJsonViaCMD();
}
