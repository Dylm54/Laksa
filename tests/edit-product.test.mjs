import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const directory = path.dirname(fileURLToPath(import.meta.url));
const source = fs.readFileSync(path.join(directory, '../app/(main)/(protected)/seller/dashboard/produk/edit-produk/[id]/actions.ts'), 'utf8');
const compiled = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
function setup(options = {}) {
  const calls = [];
  const config = {user:{id:'seller'},product:{id:'product'},currentFile:{id:'file'},...options};
  const query = {select:()=>query,eq:(key,value)=>{calls.push(['filter',key,value]);return query;},maybeSingle:async()=>({data:config.product})};
  const record = name => async (...args) => {calls.push([name,...args]);if(config.fail===name)throw new Error('Failed');};
  const exports = {};
  vm.runInNewContext(compiled, {exports, File, require:name=> {
    if(name==='next/navigation')return {redirect:url=>{calls.push(['redirect',url]);throw new Error(`REDIRECT:${url}`);}};
    if(name==='next/cache')return {revalidatePath:record('invalidate')};
    if(name==='@/lib/supabase/server')return {createClient:async()=>({auth:{getUser:async()=>({data:{user:config.user}})},from:()=>query})};
    if(name==='@/lib/utils')return {slugify:title=>title.toLowerCase().replaceAll(' ','-')};
    if(name==='@/lib/data/storage')return {uploadCover:async()=>{calls.push(['uploadCover']);return 'new-cover';},uploadFileProduk:async()=>{calls.push(['uploadFile']);return 'new-file';}};
    if(name==='@/lib/data/products')return {updateProduct:record('updateProduct'),updateCoverProduct:record('updateCover'),getProductFile:async()=>config.currentFile,updateProductFile:record('updateFile'),addProductFile:record('addFile')};
    throw new Error(`Unexpected ${name}`);
  }});
  return {save:exports.saveProductChanges,calls};
}
function form() { const data=new FormData();for(const [key,value] of Object.entries({title:'Portfolio Kit',description:'Product description',category_id:'template',price_idr:'299000',price_usd:'19.99'}))data.set(key,value);return data; }

test('editing details retains existing cover and file when no replacement is selected',async()=>{
  const {save,calls}=setup();
  await assert.rejects(save('product',form()),/REDIRECT:\/seller\/dashboard\/produk/);
  assert.ok(calls.some(c=>c[0]==='filter'&&c[1]==='seller_id'&&c[2]==='seller'));
  assert.equal(calls.find(c=>c[0]==='updateProduct').at(-1),19.99);
  assert.equal(calls.some(c=>['uploadCover','uploadFile','updateFile','addFile'].includes(c[0])),false);
});

test('anonymous and non-owned products cannot be changed',async()=>{
  for(const config of [{user:null},{product:null}]){
    const {save,calls}=setup(config);await assert.rejects(save('product',form()));
    assert.equal(calls.some(c=>c[0]==='updateProduct'),false);
  }
});

test('a replacement file updates existing metadata or adds missing metadata',async()=>{
  for(const currentFile of [{id:'file'},null]){
    const {save,calls}=setup({currentFile});const data=form();data.set('file-produk',new File(['content'],'kit.zip',{type:'application/zip'}));
    await assert.rejects(save('product',data),/REDIRECT:/);
    assert.ok(calls.some(c=>c[0]===(currentFile?'updateFile':'addFile')));
    assert.equal(calls.some(c=>c[0]==='uploadCover'),false);
  }
});

test('invalid input and failed saves do not redirect as a successful save',async()=>{
  const invalid=setup();const data=form();data.set('price_idr','');await assert.rejects(invalid.save('product',data));
  assert.equal(invalid.calls.some(c=>c[0]==='updateProduct'),false);
  const failure=setup({fail:'updateProduct'});await assert.rejects(failure.save('product',form()),/Failed/);
  assert.equal(failure.calls.some(c=>['redirect','invalidate','uploadFile','uploadCover'].includes(c[0])),false);
});
