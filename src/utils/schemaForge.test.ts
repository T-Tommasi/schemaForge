/**
 * Tests for core schemaForge function
 */

import { describe, it, expect } from 'vitest';
import { schemaForge } from './schemaForge';

describe('schemaForge', () => {
  it('generates UUIDs for each row', async () => {
    const csvData = 'CODICE,DESCRIZIONE\n2,002-Test';
    const result = await schemaForge({
      origin: csvData,
      target: 'specie_pesce',
      normalizers: ['trim'],
      transformers: [],
      uuid: { type: 'v4' },
      exportFormat: 'json',
      valueFields: ['CODICE', 'DESCRIZIONE'],
    });

    expect(result[0].id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it('generates deterministic UUIDs with v5', async () => {
    const csvData = 'CODICE,DESCRIZIONE\n2,002-Test';
    const result = await schemaForge({
      origin: csvData,
      target: 'specie_pesce',
      normalizers: [],
      transformers: [],
      uuid: { type: 'v5', fields: ['CODICE'] },
      exportFormat: 'json',
      valueFields: ['CODICE'],
    });

    // Same input produces same UUID
    const result2 = await schemaForge({
      origin: csvData,
      target: 'specie_pesce',
      normalizers: [],
      transformers: [],
      uuid: { type: 'v5', fields: ['CODICE'] },
      exportFormat: 'json',
      valueFields: ['CODICE'],
    });

    expect(result[0].id).toBe(result2[0].id);
  });

  it('applies normalizers in sequence', async () => {
    const csvData = 'NAME\n  TEST  ';
    const result = await schemaForge({
      origin: csvData,
      target: 'item',
      normalizers: ['trim', 'lowercase'],
      transformers: [],
      uuid: { type: 'v4' },
      exportFormat: 'json',
      valueFields: ['NAME'],
    });

    expect(result[0].values[0].value).toBe('test');
  });

  it('applies transformers to values', async () => {
    const csvData = 'NUM\n42';
    const result = await schemaForge({
      origin: csvData,
      target: 'item',
      normalizers: [],
      transformers: ['toNumber'],
      uuid: { type: 'v4' },
      exportFormat: 'json',
      valueFields: ['NUM'],
    });

    expect(result[0].values[0].value).toBe(42);
  });
});
