export interface XMLParseOptions {
	trimWhitespace?: boolean;
}

export async function parseXML(
	filePathOrData: string,
	_options: XMLParseOptions = {}
): Promise<Record<string, unknown>[]> {
	const data = filePathOrData.trim();

	if (data.startsWith('<')) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(data, 'text/xml');
		return xmlToRecords(doc);
	}

	const response = await fetch(filePathOrData);
	const text = await response.text();
	const parser = new DOMParser();
	const doc = parser.parseFromString(text, 'text/xml');
	return xmlToRecords(doc);
}

function xmlToRecords(doc: Document): Record<string, unknown>[] {
	const records: Record<string, unknown>[] = [];
	const elements = doc.documentElement.children;

	for (const element of elements) {
		const record: Record<string, unknown> = {};
		for (const child of element.children) {
			record[child.tagName] = child.textContent?.trim() ?? '';
		}
		records.push(record);
	}

	return records;
}