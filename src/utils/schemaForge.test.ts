// Import vendors to register them before tests
import '../plugins/vendors/example';

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
      plugin: 'csv',
    });

    expect(result[0].id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
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
      plugin: 'csv',
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
      plugin: 'csv',
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
      plugin: 'csv',
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
      plugin: 'csv',
    });

    expect(result[0].values[0].value).toBe(42);
  });

  it('throws error when no plugin selected', async () => {
    const csvData = 'NAME\nTEST';
    await expect(
      schemaForge({
        origin: csvData,
        target: 'item',
        normalizers: [],
        transformers: [],
        uuid: { type: 'v4' },
        exportFormat: 'json',
        valueFields: ['NAME'],
      })
    ).rejects.toThrow('no plugin selected for parsing!');
  });

  it('passes options to transformers', async () => {
    const csvData = 'CODE,NAME\nABC,Test';
    const result = await schemaForge({
      origin: csvData,
      target: 'item',
      normalizers: [],
      transformers: ['toPrefix'],
      transformerOptions: {
        toPrefix: { prefix: 'SKU-' },
      },
      uuid: { type: 'v4' },
      exportFormat: 'json',
      valueFields: ['CODE'],
      plugin: 'csv',
    });

    expect(result[0].values[0].value).toBe('SKU-ABC');
  });

  it('uses vendor preset', async () => {
    const csvData = 'CODE\nitem';
    const result = await schemaForge({
      origin: csvData,
      target: 'item',
      normalizers: [],
      transformers: ['toPrefix'],
      transformerOptions: {
        toPrefix: { prefix: '[', suffix: ']' },
      },
      uuid: { type: 'v4' },
      exportFormat: 'json',
      valueFields: ['CODE'],
      vendor: 'example',
    });

    expect(result[0].type).toBe('item');
    // normalizers: trim + lowercase on 'item' = 'item'
    // transformer: toPrefix wraps in brackets
    expect(result[0].values[0].value).toBe('[item]');
  });
});
