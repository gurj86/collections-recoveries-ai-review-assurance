const cases=[
{ id:"CR-001", customer:"A. Patel", product:"Personal loan", arrears:"£1,460", support:"Bereavement / reduced income", outcome:"Further Work", title:"Affordability arrangement after bereavement",
rationale:"Customer has missed three payments. We offered a six-month repayment arrangement which the customer accepted. The payment is lower than the contractual amount and therefore I am satisfied we have treated the customer fairly.",
summary:"The conclusion may be reasonable, but the rationale does not show how affordability was assessed or how the customer's bereavement and reduced income affected the chosen arrangement.",
findings:[
["high","Affordability evidence is not demonstrated","The rationale states the arrangement is lower than the contractual payment, but it does not evidence that the amount is sustainable based on the customer's current circumstances.","https://handbook.fca.org.uk/handbook/conc7/conc7s3"],
["high","Vulnerability support is not addressed","Bereavement is recorded in the case notes, but the rationale does not explain whether additional support, communication preferences or signposting were considered.","https://handbook.fca.org.uk/handbook/conc7/conc7s2?timeline=true"],
["low","Outcome rationale needs strengthening","The file should explain why the selected treatment is likely to support a good customer outcome rather than only recording that the customer agreed.","https://handbook.fca.org.uk/handbook/conc7/conc7s3?timeline=true"]
]},
{ id:"CR-002", customer:"J. Morgan", product:"Credit card", arrears:"£780", support:"None recorded", outcome:"Pass", title:"Short-term arrears and payment plan",
rationale:"The customer had a temporary income interruption. Income resumed this month. We confirmed essential expenditure and disposable income before agreeing a three-month plan. No vulnerability indicators were identified and the customer confirmed the plan was affordable.",
summary:"The rationale links the customer's circumstances, affordability information and selected treatment. No material assurance gap is identified in the fictional evidence.",
findings:[
["low","No material exception identified","The rationale records the relevant circumstances and explains why the treatment was considered appropriate. Human QA should still confirm the supporting evidence.","https://handbook.fca.org.uk/handbook/conc7/conc7s3"]
]},
{ id:"CR-003", customer:"S. Williams", product:"Motor finance", arrears:"£2,240", support:"Mental health / communication need", outcome:"Escalate", title:"Repeated collections contact despite support need",
rationale:"Multiple contact attempts were required because the account remained in arrears and the customer had not maintained the previous arrangement. Collections activity followed the standard contact strategy.",
summary:"The rationale relies on the standard process but does not address recorded mental-health information, the request for written communication, or whether repeated contact caused foreseeable harm.",
findings:[
["high","Communication preference may not have been followed","The fictional notes record a request for written communication, but the rationale does not explain why repeated telephone contact continued.","https://handbook.fca.org.uk/handbook/conc7/conc7s2?timeline=true"],
["high","Foreseeable harm has not been considered","The rationale focuses on process compliance rather than the effect of the contact strategy on this particular customer.","https://handbook.fca.org.uk/handbook/PRIN/2A/"],
["high","Potential escalation required","Because the recorded support need and contact approach appear inconsistent, a human reviewer should inspect the underlying interaction history before reaching an outcome.","https://handbook.fca.org.uk/handbook/conc7/conc7s3?timeline=true"]
]},
{ id:"CR-004", customer:"L. Chen", product:"Overdraft", arrears:"£520", support:"Financial difficulty", outcome:"Further Work", title:"Fees and persistent overdraft use",
rationale:"The account remained overdrawn for several months. The customer was advised to reduce usage and make regular credits to the account. No refund was offered because the charges were correctly applied.",
summary:"Correct application of charges does not by itself demonstrate a fair outcome. The review should consider the customer's financial difficulty, the effect of charges and whether further support was appropriate.",
findings:[
["high","Process accuracy is being used as the outcome test","The rationale confirms that charges were contractually applied but does not assess whether the customer received appropriate support in persistent financial difficulty.","https://handbook.fca.org.uk/handbook/conc7/conc7s3?timeline=true"],
["low","Support options are not evidenced","The file should show what support options were considered and why the selected action was appropriate for the customer's circumstances.","https://handbook.fca.org.uk/handbook/conc7/conc7s3"]
]}
];

const themes=[
["Affordability rationale",7],["Vulnerability / support needs",6],["Customer-specific outcome evidence",5],["Communication preferences",4],["Process-led rather than outcome-led rationale",4]
];

let current=cases[0], reviewed=false;
const $=id=>document.getElementById(id);
function statusClass(v){return v.replaceAll(" ","-")}
function renderCaseList(){
 const f=$("filter").value;
 $("caseButtons").innerHTML="";
 cases.filter(c=>f==="all"||c.outcome===f).forEach(c=>{
  const b=document.createElement("button"); b.className="case-btn"+(c.id===current.id?" active":"");
  b.innerHTML="<strong>"+c.id+" · "+c.title+"</strong><span>"+c.customer+" · "+c.outcome+"</span>";
  b.onclick=()=>{current=c;reviewed=false;render()};
  $("caseButtons").appendChild(b);
 });
}
function render(){
 $("caseTitle").textContent=current.id+" · "+current.title;
 $("caseOutcome").textContent=current.outcome;
 $("caseOutcome").className="status "+statusClass(current.outcome);
 $("customer").textContent=current.customer;$("product").textContent=current.product;$("arrears").textContent=current.arrears;$("supportNeed").textContent=current.support;
 $("rationale").textContent=current.rationale;
 $("aiSummary").textContent=reviewed?current.summary:"Select “Run AI assurance check” to compare the rationale with the fictional case evidence.";
 $("findings").innerHTML=reviewed?current.findings.map(f=>{
 const ruleLabel =
   f[1].toLowerCase().includes("afford") ? "CONC 7.3.4B / 7.3.5" :
   f[1].toLowerCase().includes("vulnerab") ? "CONC 7.2.1 / 7.2.2A" :
   f[1].toLowerCase().includes("communication") ? "CONC 7.3.13A" :
   f[1].toLowerCase().includes("support") ? "CONC 7.3.7A" :
   f[1].toLowerCase().includes("outcome") || f[1].toLowerCase().includes("process") ? "CONC 7.3.4B / Consumer Duty" :
   "Relevant FCA rule / guidance";
 return '<div class="finding '+f[0]+'"><strong>'+f[1]+'</strong><p>'+f[2]+'</p><a href="'+f[3]+'" target="_blank" rel="noreferrer">View FCA reference: '+ruleLabel+' →</a></div>'
}).join(""):'';
 document.querySelectorAll(".decision-buttons button").forEach(b=>b.classList.toggle("selected",b.dataset.decision===current.outcome));
 renderCaseList();
}
$("runReview").onclick=()=>{reviewed=true;render()};
$("filter").onchange=renderCaseList;
document.querySelectorAll(".decision-buttons button").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".decision-buttons button").forEach(x=>x.classList.remove("selected"));
 b.classList.add("selected");
 $("decisionNote").textContent="Reviewer selected: "+b.dataset.decision+". In a production workflow this decision would be recorded with rationale and audit history.";
});
$("themeBars").innerHTML=themes.map(t=>'<div class="theme-row"><strong>'+t[0]+'</strong><div class="bar"><i style="width:'+Math.min(100,t[1]*12)+'%"></i></div><span>'+t[1]+'</span></div>').join("");
render();


const refs={
 consumerDuty:"https://handbook.fca.org.uk/handbook/conc7/conc7s3?timeline=true",
 conc:"https://handbook.fca.org.uk/handbook/conc7/conc7s3",
 vuln:"https://handbook.fca.org.uk/handbook/conc7/conc7s2?timeline=true",
 prin:"https://handbook.fca.org.uk/handbook/PRIN/2A/"
};

document.querySelectorAll(".tab").forEach(tab=>tab.onclick=()=>{
 document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
 document.querySelectorAll(".view").forEach(v=>v.classList.remove("active-view"));
 tab.classList.add("active");
 $(tab.dataset.view).classList.add("active-view");
});

function containsAny(text, terms){return terms.some(t=>text.includes(t))}
function addFlag(flags,severity,title,detail,url){flags.push([severity,title,detail,url])}

$("loadDemoCase").onclick=()=>{
 $("inputCircumstances").value="Customer lost their job six weeks ago and is now receiving Universal Credit. They have missed three payments and say they are struggling with food and energy costs.";
 $("inputNotes").value="Customer became upset during the call. They said they are overwhelmed by repeated phone calls and asked to be contacted by email only.";
 $("inputVulnerability").value="Recent bereavement and signs of financial difficulty. Customer says they are struggling to cope.";
 $("inputActions").value="Agent agreed a six-month payment plan of £120 per month and kept the standard outbound call strategy in place.";
 $("inputRationale").value="The customer accepted the payment plan and it is lower than the normal monthly payment, so I believe we treated the customer fairly.";
};

$("runFreeformReview").onclick=()=>{
 const circumstances=$("inputCircumstances").value.trim();
 const notes=$("inputNotes").value.trim();
 const vulnerability=$("inputVulnerability").value.trim();
 const actions=$("inputActions").value.trim();
 const rationale=$("inputRationale").value.trim();

 if(!circumstances && !notes && !vulnerability && !actions && !rationale){
   $("freeformEmpty").innerHTML="<strong>Add some fictional case information first</strong><span>The demo needs case evidence or an agent rationale to review.</span>";
   return;
 }

 const all=(circumstances+" "+notes+" "+vulnerability+" "+actions+" "+rationale).toLowerCase();
 const evidence=(circumstances+" "+notes+" "+vulnerability+" "+actions).toLowerCase();
 const rat=rationale.toLowerCase();
 const flags=[];

 const affordabilityEvidence=containsAny(all,["income and expenditure","i&e","disposable income","afford","essential expenditure","budget","income","expenditure"]);
 const arrangement=containsAny(all,["payment plan","arrangement","repayment","monthly payment","per month"]);
 if(arrangement && !affordabilityEvidence){
   addFlag(flags,"high","Affordability evidence may be missing","A repayment arrangement is recorded, but the information entered does not clearly show how sustainable affordability was assessed for this customer.",refs.conc);
 }

 const vulnTerms=["bereavement","mental health","depression","anxiety","disability","illness","cancer","dementia","vulnerab","struggling to cope","suicid","language","hearing","learning difficulty"];
 const hasVuln=containsAny(evidence,vulnTerms);
 const vulnAddressed=containsAny(rat,["vulnerab","support","bereav","communication","adjustment","signpost","extra help"]);
 if(hasVuln && !vulnAddressed){
   addFlag(flags,"high","Recorded vulnerability is not reflected in the rationale","The case evidence includes a potential support need, but the final rationale does not explain how that information affected the treatment or outcome.",refs.vuln);
 }

 const asksWritten=containsAny(evidence,["email only","written communication","do not call","stop calling","contact by email","letter only"]);
 const continuedCalls=containsAny(actions.toLowerCase(),["call strategy","outbound call","phone call","continued calls","telephone"]);
 if(asksWritten && continuedCalls){
   addFlag(flags,"high","Communication preference may not have been followed","The customer appears to have requested a different contact method while the recorded action suggests telephone contact continued. This should be checked by a human reviewer.",refs.vuln);
 }

 const weakAgreement=containsAny(rat,["customer accepted","customer agreed","they agreed","accepted the plan"]);
 const goodOutcomeReasoning=containsAny(rat,["affordable","circumstances","sustainable","support need","foreseeable harm","good outcome","appropriate because","evidence"]);
 if(weakAgreement && !goodOutcomeReasoning){
   addFlag(flags,"medium","Customer agreement is being used as the main fairness test","Agreement to an arrangement does not by itself demonstrate that the customer received an appropriate outcome. The rationale should link the decision to the customer's circumstances and evidence.",refs.consumerDuty);
 }

 const processLed=containsAny(rat,["standard process","standard contact","policy followed","correctly applied","procedure followed","terms and conditions"]);
 const customerSpecific=containsAny(rat,["because the customer","their circumstances","customer's circumstances","specific need","individual"]);
 if(processLed && !customerSpecific){
   addFlag(flags,"medium","Rationale appears process-led rather than outcome-led","Following a standard process is not the same as evidencing a good customer outcome. The reviewer should explain why the treatment was appropriate for this individual customer.",refs.prin);
 }

 const hardship=containsAny(evidence,["food","energy","rent","mortgage","essential bills","universal credit","lost job","unemployed","financial difficulty","struggling"]);
 const supportAction=containsAny(actions.toLowerCase(),["breathing space","signpost","debt advice","forbearance","freeze","reduced payment","payment holiday","support"]);
 if(hardship && !supportAction){
   addFlag(flags,"medium","Wider financial-difficulty support is not clearly evidenced","The evidence suggests financial pressure, but the actions entered do not clearly show whether appropriate support options or signposting were considered.",refs.conc);
 }

 if(rationale.length<90){
   addFlag(flags,"medium","Final rationale may be too brief","The rationale is short and may not sufficiently evidence the key facts, judgement and customer-outcome reasoning needed for robust assurance.",refs.consumerDuty);
 }

 if(flags.length===0){
   addFlag(flags,"pass","No obvious rule-based exception identified","Based only on the fictional text entered, the demo did not identify an obvious assurance gap. A human reviewer should still validate the evidence and final judgement.",refs.consumerDuty);
 }

 const highCount=flags.filter(f=>f[0]==="high").length;
 const materialCount=flags.filter(f=>f[0]!=="pass").length;
 const outcome=highCount>=2?"Escalate":materialCount>0?"Further Work":"Pass";

 $("freeformEmpty").classList.add("hidden");
 $("freeformResults").classList.remove("hidden");
 $("freeformOutcome").textContent=outcome;
 $("freeformFlagCount").textContent=materialCount+" flag"+(materialCount===1?"":"s");
 $("freeformSummary").textContent=outcome==="Pass"
   ?"No obvious exception was detected by the demonstration rules. Human QA should still confirm that the evidence supports the conclusion."
   :outcome==="Escalate"
   ?"Multiple potentially material gaps were detected. The case should be reviewed against the underlying evidence before a final customer-outcome conclusion is reached."
   :"The rationale may need strengthening before the case can be passed. The assurance checks below show where the entered evidence and final reasoning may not fully align.";
 $("freeformFindings").innerHTML=flags.map(f=>{
 const ruleLabel =
   f[1].toLowerCase().includes("afford") ? "CONC 7.3.4B / 7.3.5" :
   f[1].toLowerCase().includes("vulnerab") ? "CONC 7.2.1 / 7.2.2A" :
   f[1].toLowerCase().includes("communication") ? "CONC 7.3.13A" :
   f[1].toLowerCase().includes("support") ? "CONC 7.3.7A" :
   f[1].toLowerCase().includes("agreement") || f[1].toLowerCase().includes("process") ? "CONC 7.3.4B / Consumer Duty" :
   "Relevant FCA rule / guidance";
 return '<div class="finding '+f[0]+'"><strong>'+f[1]+'</strong><p>'+f[2]+'</p><a href="'+f[3]+'" target="_blank" rel="noreferrer">View FCA reference: '+ruleLabel+' →</a></div>'
}).join("");
 document.querySelectorAll(".freeform-decisions button").forEach(b=>b.classList.remove("selected"));
};

document.querySelectorAll(".freeform-decisions button").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".freeform-decisions button").forEach(x=>x.classList.remove("selected"));
 b.classList.add("selected");
 $("freeformDecisionNote").textContent="Human reviewer selected: "+b.dataset.freeformDecision+". In a real control framework this would be stored with rationale, reviewer ID and audit history.";
});
