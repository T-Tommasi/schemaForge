import { schemaForge } from './src/utils/schemaForge';

const testData = `CODICE,DESCRIZIONE
2,002-Avannotti Mitili
3,003-Avannotti Mugilidi
4,004-Avannotti Spigola`;

async function runTest() {
	console.log('Testing schemaForge...\n');

	try {
		const result = await schemaForge({
			origin: testData,
			target: 'specie_pesce',
			normalizers: ['trim'],
			transformers: ['toNumber'],
			uuid: { type: 'v5', fields: ['CODICE', 'DESCRIZIONE'] },
			exportFormat: 'json',
			valueFields: ['CODICE', 'DESCRIZIONE'],
			plugin: 'csv'
		});

		console.log('Result:', JSON.stringify(result, null, 2));
		console.log('\nTotal rows:', result.length);
	} catch (error) {
		console.log('Error:', (error as Error).message);
	}
}

runTest();