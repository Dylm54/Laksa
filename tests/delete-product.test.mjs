import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const id = '11111111-1111-4111-8111-111111111111';
const source = fs.readFileSync(path.join(testDirectory, '../app/(main)/(protected)/seller/dashboard/produk/delete-product.ts'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;

function setup(overrides = {}) {
  const config = { user: { id: 'current-seller' }, product: { id }, count: 0, deleted: { id }, ...overrides };
  const calls = { admin: 0, deletes: [], invalidations: [], lookup: [] };
  const client = {
    auth: { getUser: async () => ({ data: { user: config.user }, error: config.authError }) },
    from: (table) => {
      assert.equal(table, 'products');
      return {
        select: () => {
          const query = { eq: (key, value) => { calls.lookup.push([key, value]); return query; }, maybeSingle: async () => ({ data: config.product, error: config.productError }) };
          return query;
        },
        delete: () => {
          const filters = []; calls.deletes.push(filters);
          const query = { eq: (key, value) => { filters.push([key, value]); return query; }, select: () => query, maybeSingle: async () => ({ data: config.deleted, error: config.deleteError }) };
          return query;
        },
      };
    },
  };
  const exports = {};
  vm.runInNewContext(compiled, { exports, require: (name) => {
    if (name === 'next/cache') return { revalidatePath: (...args) => calls.invalidations.push(args) };
    if (name === '@/lib/supabase/server') return { createClient: async () => client };
    if (name === '@/lib/supabase/admin') return { createAdminClient: () => {
      calls.admin++;
      return { from: table => {
        assert.equal(table, 'order_items');
        return { select: () => ({ eq: async (key, value) => {
          assert.equal(key, 'product_id'); assert.equal(value, id);
          return { count: config.count, error: config.orderError };
        } }) };
      } };
    } };
    throw new Error(`Unexpected import ${name}`);
  } });
  return { run: exports.deleteSellerProduct, calls };
}

test('deletes only the authenticated seller product and invalidates views after success', async () => {
  const { run, calls } = setup();
  assert.equal((await run(id)).success, true);
  assert.deepEqual(calls.lookup, [['id', id], ['seller_id', 'current-seller']]);
  assert.deepEqual(calls.deletes, [[['id', id], ['seller_id', 'current-seller']]]);
  assert.deepEqual(calls.invalidations, [['/', 'layout']]);
});

test('invalid ids never access data', async () => {
  const {run, calls} = setup();
  for (const input of ['bad-id', null, { id }, '11111111-1111-4111-8111-111111111111,other']) assert.equal((await run(input)).success, false);
  assert.equal(calls.lookup.length, 0); assert.equal(calls.admin, 0);
});

test('anonymous, expired sessions and non-owned products cannot use admin or delete', async () => {
  for (const config of [{user: null}, {authError: {message:'expired'}}, {product: null}, {productError:{message:'offline'}}]) {
    const {run, calls} = setup(config);
    assert.equal((await run(id)).success, false);
    assert.equal(calls.admin, 0); assert.equal(calls.deletes.length, 0);
  }
});

test('existing orders or an unavailable order check prevent deletion', async () => {
  for (const config of [{count:1}, {count:null}, {orderError:{message:'offline'}}]) {
    const {run, calls} = setup(config);
    assert.equal((await run(id)).success, false);
    assert.equal(calls.deletes.length, 0); assert.equal(calls.invalidations.length, 0);
  }
});

test('constraint failures and zero affected rows never report success', async () => {
  for (const config of [{deleteError:{code:'23503'}}, {deleteError:{code:'42501'}}, {deleted:null}]) {
    const {run, calls} = setup(config);
    assert.equal((await run(id)).success, false);
    assert.equal(calls.invalidations.length, 0);
  }
});
