const cases=[
{ id:"CR-001", customer:"A. Patel", product:"Personal loan", arrears:"£1,460", support:"Bereavement / reduced income", outcome:"Further Work", title:"Affordability arrangement after bereavement",
rationale:"Customer has missed three payments. We offered a six-month repayment arrangement which the customer accepted. The payment is lower than the contractual amount and therefore I am satisfied we have treated the customer fairly.",
summary:"The conclusion may be reasonable, but the rationale does not show how affordability was assessed or how the customer's bereavement and reduced income affected the chosen arrangement.",
findings:[
["high","Affordability evidence is not demonstrated","The rationale states the arrangement is lower than the contractual payment, but it does not evidence that the amount is sustainable based on the customer's current circumstances.","https://handbook.fca.org.uk/handbook/CONC/7/"],
["high","Vulnerability support is not addressed","Bereavement is recorded in the case notes, but the rationale does not explain whether additional support, communication preferences or signposting were considered.","https://www.fca.org.uk/publications/finalised-guidance/guidance-firms-fair-treatment-vulnerable-customers"],
["low","Outcome rationale needs strengthening","The file should explain why the selected treatment is likely to support a good customer outcome rather than only recording that the customer agreed.","https://www.fca.org.uk/firms/consumer-duty"]
]},
{ id:"CR-002", customer:"J. Morgan", product:"Credit card", arrears:"£780", support:"None recorded", outcome:"Pass", title:"Short-term arrears and payment plan",
rationale:"The customer had a temporary income interruption. Income resumed this month. We confirmed essential expenditure and disposable income before agreeing a three-month plan. No vulnerability indicators were identified and the customer confirmed the plan was affordable.",
summary:"The rationale links the customer's circumstances, affordability information and selected treatment. No material assurance gap is identified in the fictional evidence.",
findings:[
["low","No material exception identified","The rationale records the relevant circumstances and explains why the treatment was considered appropriate. Human QA should still confirm the supporting evidence.","https://handbook.fca.org.uk/handbook/CONC/7/"]
]},
{ id:"CR-003", customer:"S. Williams", product:"Motor finance", arrears:"£2,240", support:"Mental health / communication need", outcome:"Escalate", title:"Repeated collections contact despite support need",
rationale:"Multiple contact attempts were required because the account remained in arrears and the customer had not maintained the previous arrangement. Collections activity followed the standard contact strategy.",
summary:"The rationale relies on the standard process but does not address recorded mental-health information, the request for written communication, or whether repeated contact caused foreseeable harm.",
findings:[
["high","Communication preference may not have been followed","The fictional notes record a request for written communication, but the rationale does not explain why repeated telephone contact continued.","https://www.fca.org.uk/publications/finalised-guidance/guidance-firms-fair-treatment-vulnerable-customers"],
["high","Foreseeable harm has not been considered","The rationale focuses on process compliance rather than the effect of the contact strategy on this particular customer.","https://handbook.fca.org.uk/handbook/PRIN/2A/"],
["high","Potential escalation required","Because the recorded support need and contact approach appear inconsistent, a human reviewer should inspect the underlying interaction history before reaching an outcome.","https://www.fca.org.uk/firms/consumer-duty"]
]},
{ id:"CR-004", customer:"L. Chen", product:"Overdraft", arrears:"£520", support:"Financial difficulty", outcome:"Further Work", title:"Fees and persistent overdraft use",
rationale:"The account remained overdrawn for several months. The customer was advised to reduce usage and make regular credits to the account. No refund was offered because the charges were correctly applied.",
summary:"Correct application of charges does not by itself demonstrate a fair outcome. The review should consider the customer's financial difficulty, the effect of charges and whether further support was appropriate.",
findings:[
["high","Process accuracy is being used as the outcome test","The rationale confirms that charges were contractually applied but does not assess whether the customer received appropriate support in persistent financial difficulty.","https://www.fca.org.uk/firms/consumer-duty"],
["low","Support options are not evidenced","The file should show what support options were considered and why the selected action was appropriate for the customer's circumstances.","https://handbook.fca.org.uk/handbook/CONC/7/"]
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
 $("findings").innerHTML=reviewed?current.findings.map(f=>'<div class="finding '+f[0]+'"><strong>'+f[1]+'</strong><p>'+f[2]+'</p><a href="'+f[3]+'" target="_blank" rel="noreferrer">Open public FCA reference →</a></div>').join(""):'';
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
