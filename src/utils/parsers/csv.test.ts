/**
 * Tests for CSV parser
 */

import { describe, it, expect } from 'vitest';
import { parseCSV } from './csv';

describe('parseCSV', () => {
  it('parses basic CSV with headers', async () => {
    const data = 'name,age\nJohn,30';
    const results = await parseCSV(data);
    expect(results[0].name).toBe('John');
    expect(results[0].age).toBe(30);
  });

  it('parses multiple rows', async () => {
    const data = 'name,age\nJohn,30\nJane,25';
    const results = await parseCSV(data);
    expect(results).toHaveLength(2);
  });

  it('handles empty cell values', async () => {
    const data = 'name,value\nJohn,';
    const results = await parseCSV(data);
    expect(results[0].value).toBeNull();
  });

  it('skips empty rows', async () => {
    const data = 'name,value\nJohn,1\n\nJane,2';
    const results = await parseCSV(data);
    expect(results).toHaveLength(2);
    expect(results[0].name).toBe('John');
    expect(results[1].name).toBe('Jane');
  });

  it('handles quoted values with commas', async () => {
    const data = 'name,value\nJohn,"1,000"';
    const results = await parseCSV(data);
    expect(results[0].value).toBe('1,000');
  });
});
