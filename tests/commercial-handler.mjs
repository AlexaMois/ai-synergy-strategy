import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
// No production credentials, no network. Every outbound request is intercepted.
process.env.BPIUM_BASE_URL="https://bpium.ci.invalid";
process.env.BPIUM_CATALOG_ID="81";
process.env.BPIUM_LOGIN="mock";
process.env.BPIUM_PASSWORD="mock";
process.env.NEUROSECRETARY_NOTIFY_URL="https://notify.ci.invalid";
process.env.NEUROSECRETARY_NOTIFY_SECRET="mock";
const captured=[],notified=[];
globalThis.fetch=async (url,init)=>{
  const u=new URL(url);
  if(u.origin==="https://bpium.ci.invalid"&&u.pathname==="/api/v1/catalogs/81/records"){captured.push(JSON.parse(init.body).values);return new Response(JSON.stringify({id:"mock-"+captured.length}),{status:200,headers:{"content-type":"application/json"}});}
  if(u.origin==="https://notify.ci.invalid"){notified.push(JSON.parse(init.body));return new Response(JSON.stringify({ok:true}),{status:200,headers:{"content-type":"application/json"}});}
  throw Error("Unexpected outbound request: "+u.origin);
};
const {handleRequest}=await import("../forms-handler/index.mjs");
const catalog=JSON.parse(await readFile(new URL("../src/data/commercialCatalog.json",import.meta.url),"utf8"));
const cases=[...catalog.mini.map(m=>[m.id,"connect","5",m.license==="standard"?"plus":undefined]),...catalog.hermes.map(h=>[h.id,h.fixed?"setup":"adaptation","5",undefined]),["product-neurotenderolog","demo","6"],["product-knowledge-management","demo","6"],["custom-agent","project","5"],["automation-process","project","5"],["automation-corporate-system","project","5"],["automation-integration","project","5"],["automation-custom-software","project","5"],["expert-onsite","onsite","2"],["expert-audit","audit","2"],["expert-training","training","3"]];
for(const [i,[offerId,format,category,licensePlan]] of cases.entries()){
 const sourcePath="/start";
 const body={name:"CI Mock",phone:"+7 (999) 000-00-00",task:"Synthetic test only",consent:true,offerId,format,licensePlan,sourcePath,formName:offerId,pageUrl:"https://aleksamois.ru/start"};
 const result=await handleRequest({path:"/short-lead",rawBody:JSON.stringify(body),headers:{"origin":"https://aleksamois.ru","x-forwarded-for":"192.0.2."+(i+1)}});
 assert.equal(result.statusCode,200,offerId+" "+result.body);
 const v=captured.at(-1);
 assert.equal(v["45"],category,offerId);
 assert.deepEqual(v["51"],["1"]);assert.equal(v["41"],"1");assert.deepEqual(v["42"],["1"]);assert.equal(v["44"],"2");
 assert(v["14"].includes("ID предложения: "+offerId));assert(v["14"].includes("Формат: "+format));assert(v["14"].includes("Источник: "+sourcePath));
 assert.equal(v["14"].includes("Лицензия: "),Boolean(licensePlan));assert(v["47"].length>10);assert.equal(v.intake_next_action,v["47"]);
 assert.deepEqual(Object.keys(notified.at(-1)).sort(),["createdAt","formName","pageUrl","recordId"]);
}
const old=await handleRequest({path:"/short-lead",rawBody:JSON.stringify({name:"CI Mock",phone:"+79990000000",task:"Legacy",consent:true}),headers:{"x-forwarded-for":"192.0.2.100"}});
assert.equal(old.statusCode,200);assert.equal(captured.at(-1)["45"],"6");assert.equal(captured.at(-1).intake_next_action,captured.at(-1)["47"]);
const invalid=await handleRequest({path:"/short-lead",rawBody:JSON.stringify({name:"CI Mock",phone:"+79990000000",task:"Invalid",consent:true,offerId:"unknown"}),headers:{"x-forwarded-for":"192.0.2.101"}});
assert.equal(invalid.statusCode,400);assert.equal(captured.length,cases.length+1);assert.equal(notified.length,captured.length);
console.log("PASS",cases.length,"commercial Bpium mock routes, legacy compatibility, invalid offer rejection, notification field contract; zero live requests");
