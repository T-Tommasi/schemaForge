/**
 * XML Parser using fast-xml-parser
 * @module utils/parsers/xml
 * @description Provides XML parsing capabilities for both Node.js and browser environments.
 */

import { XMLParser } from 'fast-xml-parser';

/**
 * Configuration options for XML parsing
 */
export interface XMLParseOptions {
  /** Trim whitespace from values (default: true) */
  trimWhitespace?: boolean;
  /** Ignore XML attributes (default: true) */
  ignoreAttributes?: boolean;
  /** Prefix for attribute names (default: '@_') */
  attributeNamePrefix?: string;
  /** Text node name (default: '#text') */
  textNodeName?: string;
}

const defaultOptions: XMLParseOptions = {
  trimWhitespace: true,
  ignoreAttributes: true,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
};

/**
 * Parse XML string or file into array of record objects
 * @param filePathOrData - XML string content or file path
 * @param options - Parsing configuration options
 * @returns Promise resolving to array of parsed records
 * @example
 * ```ts
 * const records = await parseXML('<root><item><name>Test</name></item></root>');
 * const fileRecords = await parseXML('./data.xml');
 * ```
 */
export async function parseXML(
  filePathOrData: string,
  options: XMLParseOptions = {},
): Promise<Record<string, unknown>[]> {
  const data = filePathOrData.trim();

  let xmlContent: string;

  if (data.startsWith('<')) {
    // Direct XML content
    xmlContent = data;
  } else if (typeof window === 'undefined') {
    // Node.js environment - read from file system
    const fs = await import('fs');
    xmlContent = await fs.promises.readFile(filePathOrData, 'utf-8');
  } else {
    // Browser environment - fetch from URL
    const response = await fetch(filePathOrData);
    xmlContent = await response.text();
  }

  return parseXMLString(xmlContent, options);
}

/**
 * Parse XML string to record array using fast-xml-parser
 * @param xml - Raw XML string content
 * @param options - Parser configuration options
 * @returns Array of parsed record objects
 */
function parseXMLString(xml: string, options: XMLParseOptions): Record<string, unknown>[] {
  const parserOptions = {
    ignoreAttributes: options.ignoreAttributes ?? defaultOptions.ignoreAttributes,
    attributeNamePrefix: options.attributeNamePrefix ?? defaultOptions.attributeNamePrefix,
    textNodeName: options.textNodeName ?? defaultOptions.textNodeName,
    trimValues: options.trimWhitespace ?? defaultOptions.trimWhitespace,
    isArray: () => true,
  };

  const parser = new XMLParser(parserOptions);
  const parsed = parser.parse(xml);

  // Normalize output to always be an array of records
  if (Array.isArray(parsed)) {
    return parsed as Record<string, unknown>[];
  }

  const rootKey = Object.keys(parsed)[0];
  const rootValue = parsed[rootKey];

  if (Array.isArray(rootValue)) {
    return rootValue as Record<string, unknown>[];
  }

  return [rootValue as Record<string, unknown>];
}
