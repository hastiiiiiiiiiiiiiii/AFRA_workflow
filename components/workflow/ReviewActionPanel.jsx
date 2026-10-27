"use client";
import { useState } from "react";
import { CheckCircle2, RotateCcw, AlertTriangle, ShieldCheck } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/session";
import { ROLE_INFO } from "@/lib/constants/roles";

const ACTIONS={
 FIRST_REVIEW:["FIRST_REVIEW_APPROVE","FIRST_REVIEW_RETURN"],
 PAYMENT:["PAYMENT_COMPLETE","PAYMENT_RETURN"],
 PAYMENT_VERIFICATION:["PAYMENT_VERIFY","PAYMENT_VERIFY_RETURN"],
 FINAL_REVIEW:["FINAL_REVIEW_APPROVE","FINAL_REVIEW_RETURN"],
 FINAL_APPROVAL:["FINAL_APPROVE","FINAL_RETURN"],
};
const LABELS={FIRST_REVIEW_APPROVE:"تأیید بررسی اولیه",PAYMENT_COMPLETE:"تکمیل پرداخت",PAYMENT_VERIFY:"تأیید کنترل پرداخت",FINAL_REVIEW_APPROVE:"تأیید بررسی نهایی",FINAL_APPROVE:"تأیید نهایی"};
export default function ReviewActionPanel({requestId,stage,onActionComplete}){
 const [user]=useState(()=>getCurrentUser()); const [showReturn,setShowReturn]=useState(false); const [reason,setReason]=useState(""); const [loading,setLoading]=useState(false); const [error,setError]=useState(""); const [result,setResult]=useState(null);
 if(!user)return null;
 const pair=ACTIONS[stage]||[]; const canAct=(user.roleKey==="FIRST_REVIEWER"&&stage==="FIRST_REVIEW")||(user.roleKey==="PAYMENT_OFFICER"&&stage==="PAYMENT")||(user.roleKey==="PAYMENT_CONTROLLER"&&stage==="PAYMENT_VERIFICATION")||(user.roleKey==="FINAL_AUTHORITY"&&(stage==="FINAL_REVIEW"||stage==="FINAL_APPROVAL"));
 if(!canAct)return null;
 const [approveAction,returnAction]=pair;
 const handleAction=async(action)=>{setLoading(true);setError("");try{const r=await fetch(`/api/requests/${requestId}/actions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action,note:reason||undefined})});const j=await r.json();if(!r.ok||!j.ok)throw new Error(j.error||"ثبت عملیات ناموفق بود.");const returned=action.includes("RETURN");setResult(returned?"returned":"approved");onActionComplete?.(j.data);}catch(e){setError(e.message)}finally{setLoading(false)}};
 if(result)return <div className="rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] p-5"><div className={`flex h-11 w-11 items-center justify-center rounded-full ${result==="approved"?"bg-[var(--afra-success-soft)] text-[var(--afra-success)]":"bg-[var(--afra-danger-soft)] text-[var(--afra-danger)]"}`}>{result==="approved"?<CheckCircle2 size={21}/>:<RotateCcw size={21}/>}</div><h3 className="mt-4 text-sm font-bold">عملیات با موفقیت ثبت شد</h3><p className="mt-2 text-xs leading-6 text-[var(--afra-text-secondary)]">وضعیت درخواست در دیتابیس به مرحله بعدی فرآیند منتقل شد.</p></div>;
 return <div className="overflow-hidden rounded-[14px] border border-[var(--afra-border)] bg-[var(--afra-surface)] shadow-[var(--afra-shadow-sm)]">
  <div className="border-b border-[var(--afra-border)] px-5 py-4"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--afra-primary-soft)] text-[var(--afra-primary)]"><ShieldCheck size={18}/></div><div><h2 className="text-sm font-bold">اقدام مورد نیاز</h2><p className="mt-1 text-[10px] text-[var(--afra-text-muted)]">{ROLE_INFO[user.roleKey]?.label||"کاربر سامانه"}</p></div></div></div>
  <div className="p-5"><div className="rounded-[10px] bg-[var(--afra-surface-secondary)] p-3"><p className="text-[10px] text-[var(--afra-text-muted)]">مرحله فعلی</p><p className="mt-1 text-xs font-bold">{stage}</p></div>
   {error&&<div className="mt-3 rounded-[10px] bg-[var(--afra-danger-soft)] p-3 text-xs text-[var(--afra-danger)]">{error}</div>}
   {!showReturn?<div className="mt-4 grid gap-2"><button type="button" disabled={loading} onClick={()=>handleAction(approveAction)} className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[var(--afra-primary)] px-4 py-3 text-xs font-bold text-white disabled:opacity-50"><CheckCircle2 size={16}/>{loading?"در حال ثبت...":LABELS[approveAction]}</button><button type="button" disabled={loading} onClick={()=>setShowReturn(true)} className="flex w-full items-center justify-center gap-2 rounded-[10px] border border-[var(--afra-danger)] px-4 py-3 text-xs font-bold text-[var(--afra-danger)]"><RotateCcw size={16}/>برگشت برای اصلاح</button></div>:<div className="mt-4"><div className="flex items-center gap-2"><AlertTriangle size={15} className="text-[var(--afra-warning)]"/><p className="text-xs font-bold">دلیل برگشت</p></div><textarea value={reason} onChange={e=>setReason(e.target.value)} rows={4} placeholder="دلیل برگشت درخواست را وارد کنید..." className="mt-3 w-full resize-none rounded-[10px] border border-[var(--afra-border)] bg-[var(--afra-surface)] px-3 py-3 text-xs outline-none focus:border-[var(--afra-primary)]"/><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" onClick={()=>{setShowReturn(false);setReason("")}} className="rounded-[10px] border border-[var(--afra-border)] px-4 py-2.5 text-xs">انصراف</button><button type="button" disabled={!reason.trim()||loading} onClick={()=>handleAction(returnAction)} className="rounded-[10px] bg-[var(--afra-danger)] px-4 py-2.5 text-xs font-bold text-white disabled:opacity-50">{loading?"در حال ثبت...":"ثبت برگشت"}</button></div></div>}
  </div></div>;
}
