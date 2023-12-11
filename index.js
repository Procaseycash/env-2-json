const fs = require('fs');

const getArg = (name) => {
	const argvs = process.argv;
	
	for (let arg of argvs) {
		if (arg.toLowerCase().includes(name.toLowerCase())) {
			const data = [];	
			const pos = arg.indexOf("=");
			data[0] = arg.substring(0, pos);
			data[1] = arg.substring(pos + 1);
			return data;
		}
	}

	return [];
}

const getDir = path => {
	const currentDirectory = process.cwd();
	return path[0] !== '/' ? currentDirectory + '/' + path : currentDirectory + path;
};



const convertEnvStringToJson = (env, delimiter = '\n') => {
	const records = env.split(delimiter);
	const jsonEnv = {};
	for (let i  = 0; i < records.length; i++) {
		const pos = records[i].indexOf("=");
		const data = [];
		data[0] = records[i].substring(0, pos);
		data[1] = records[i].substring(pos + 1);
		if (data[1] === "" || data[0] === "") continue;
		jsonEnv[data[0].trim()] = data[1].trim();
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


const convertEnvToJsonViaCMD = () => {
	const filePath = getArg('--file')[1]?.trim();
	const envString = getArg('--env')[1]?.trim();
	const isConsole = getArg('--csl')[1]?.trim();	
	const isWriteToRoot = getArg('--wtr')[1]?.trim();
	const outputPath = getArg('--out')[1]?.trim();
	
	if (!filePath && !envString) throw new Error ('FilePath or envString not supplied');

	console.log('envString=', envString);
	
	const { location, jsonEnv } =  envString ? convertEnvStringToJson(envString, ";") : convertEnvToJson(filePath);

	const data = JSON.stringify(jsonEnv, null, 2);

	if (outputPath) {
		
		if (!outputPath.includes('.json')) throw new Error ('File type must be a .json');

		const ouputFullPath = getDir(outputPath);
		fs.writeFileSync(ouputFullPath, data , { flag: 'w', encoding: 'utf8' });
		process.exit(0);
	}

	if (isWriteToRoot === 'true' || isWriteToRoot === '1' ) {
		fs.writeFileSync(location.replace('.env', 'env') + '.json', data, { flag: 'w', encoding: 'utf8' });
		process.exit(0);
	}

	if (isConsole !== 'false' || isConsole !== '0') {
		console.log('\n\n***************************************START***************************************\n\n', data, '\n\n***************************************END***************************************\n\n', );
		process.exit(0);
	}
}

convertEnvToJsonViaCMD();


module.exports = { envFromPathToJson: convertEnvToJson, envFromStringToJson: convertEnvStringToJson, getArg };

