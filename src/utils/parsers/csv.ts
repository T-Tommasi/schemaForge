import Papa from 'papaparse';
import type { ParseResult } from 'papaparse';

export interface CSVParseOptions {
  header?: boolean;
  delimiter?: string;
  skipEmptyLines?: boolean;
}

export function parseCSV(
  filePathOrData: string,
  options: CSVParseOptions = {}
): Promise<Record<string, unknown>[]> {
  return new Promise((resolve, reject) => {
    const isFilePath = !filePathOrData.includes('\n') && filePathOrData.trim().length > 0;

    if (isFilePath) {
      Papa.parse(filePathOrData, {
        header: options.header ?? true,
        delimiter: options.delimiter ?? ',',
        skipEmptyLines: options.skipEmptyLines ?? true,
        dynamicTyping: true,
        complete: (results: ParseResult<Record<string, unknown>>) => {
          if (results.errors.length > 0) {
            reject(new Error(results.errors.map((e) => e.message).join(', ')));
          }
          resolve(results.data as Record<string, unknown>[]);
        },
        error: (error: Error) => {
          reject(error);
        },
      });
    } else {
      Papa.parse(filePathOrData, {
        header: options.header ?? true,
        delimiter: options.delimiter ?? ',',
        skipEmptyLines: options.skipEmptyLines ?? true,
        dynamicTyping: true,
        complete: (results: ParseResult<Record<string, unknown>>) => {
          if (results.errors.length > 0) {
            reject(new Error(results.errors.map((e) => e.message).join(', ')));
          }
          resolve(results.data as Record<string, unknown>[]);
        },
        error: (error: Error) => {
          reject(error);
        },
      });
    }
  });
}
