import { prisma } from "./db";

export const STATUS={DRAFT:"DRAFT",PENDING_FIRST_REVIEW:"PENDING_FIRST_REVIEW",PENDING_PAYMENT:"PENDING_PAYMENT",PENDING_PAYMENT_VERIFICATION:"PENDING_PAYMENT_VERIFICATION",PENDING_FINAL_REVIEW:"PENDING_FINAL_REVIEW",PENDING_FINAL_APPROVAL:"PENDING_FINAL_APPROVAL",COMPLETED:"COMPLETED",REJECTED:"REJECTED"};
export const STAGE={DRAFT:"DRAFT",FIRST_REVIEW:"FIRST_REVIEW",PAYMENT:"PAYMENT",PAYMENT_VERIFICATION:"PAYMENT_VERIFICATION",FINAL_REVIEW:"FINAL_REVIEW",FINAL_APPROVAL:"FINAL_APPROVAL",COMPLETED:"COMPLETED"};
export const ROLE={ACCOUNTANT:"ACCOUNTANT",FIRST_REVIEWER:"FIRST_REVIEWER",PAYMENT_OFFICER:"PAYMENT_OFFICER",PAYMENT_CONTROLLER:"PAYMENT_CONTROLLER",FINAL_AUTHORITY:"FINAL_AUTHORITY"};
const labels={DRAFT:"پیش‌نویس",PENDING_FIRST_REVIEW:"در انتظار بررسی اولیه",PENDING_PAYMENT:"در انتظار پرداخت",PENDING_PAYMENT_VERIFICATION:"در انتظار کنترل پرداخت",PENDING_FINAL_REVIEW:"در انتظار بررسی نهایی",PENDING_FINAL_APPROVAL:"در انتظار تأیید نهایی",COMPLETED:"تکمیل‌شده",REJECTED:"برگشت‌خورده"};
const types={DRAFT:"info",PENDING_FIRST_REVIEW:"warning",PENDING_PAYMENT:"warning",PENDING_PAYMENT_VERIFICATION:"warning",PENDING_FINAL_REVIEW:"info",PENDING_FINAL_APPROVAL:"info",COMPLETED:"success",REJECTED:"danger"};
const texts={EDIT_REQUEST:"ارسال درخواست برای بررسی اولیه",FIRST_REVIEW_APPROVE:"تأیید بررسی اولیه",FIRST_REVIEW_RETURN:"برگشت برای اصلاح در بررسی اولیه",PAYMENT_COMPLETE:"تکمیل پرداخت",PAYMENT_RETURN:"برگشت در مرحله پرداخت",PAYMENT_VERIFY:"تأیید کنترل پرداخت",PAYMENT_VERIFY_RETURN:"برگشت در کنترل پرداخت",FINAL_REVIEW_APPROVE:"تأیید بررسی نهایی",FINAL_REVIEW_RETURN:"برگشت از بررسی نهایی",FINAL_APPROVE:"تأیید نهایی",FINAL_RETURN:"برگشت از تأیید نهایی"};
const rules={
 EDIT_REQUEST:{roles:[ROLE.ACCOUNTANT],from:[STATUS.DRAFT,STATUS.REJECTED],to:STATUS.PENDING_FIRST_REVIEW,stage:STAGE.FIRST_REVIEW,nextRole:ROLE.FIRST_REVIEWER},
 FIRST_REVIEW_APPROVE:{roles:[ROLE.FIRST_REVIEWER],from:[STATUS.PENDING_FIRST_REVIEW],to:STATUS.PENDING_PAYMENT,stage:STAGE.PAYMENT,nextRole:ROLE.PAYMENT_OFFICER},
 FIRST_REVIEW_RETURN:{roles:[ROLE.FIRST_REVIEWER],from:[STATUS.PENDING_FIRST_REVIEW],to:STATUS.REJECTED,stage:STAGE.DRAFT,returnTarget:STAGE.DRAFT,returnRole:ROLE.ACCOUNTANT},
 PAYMENT_COMPLETE:{roles:[ROLE.PAYMENT_OFFICER],from:[STATUS.PENDING_PAYMENT],to:STATUS.PENDING_PAYMENT_VERIFICATION,stage:STAGE.PAYMENT_VERIFICATION,nextRole:ROLE.PAYMENT_CONTROLLER},
 PAYMENT_RETURN:{roles:[ROLE.PAYMENT_OFFICER],from:[STATUS.PENDING_PAYMENT],to:STATUS.REJECTED,stage:STAGE.PAYMENT,returnTarget:STAGE.PAYMENT,returnRole:ROLE.PAYMENT_OFFICER},
 PAYMENT_VERIFY:{roles:[ROLE.PAYMENT_CONTROLLER],from:[STATUS.PENDING_PAYMENT_VERIFICATION],to:STATUS.PENDING_FINAL_REVIEW,stage:STAGE.FINAL_REVIEW,nextRole:ROLE.FINAL_AUTHORITY},
 PAYMENT_VERIFY_RETURN:{roles:[ROLE.PAYMENT_CONTROLLER],from:[STATUS.PENDING_PAYMENT_VERIFICATION],to:STATUS.REJECTED,stage:STAGE.PAYMENT,returnTarget:STAGE.PAYMENT,returnRole:ROLE.PAYMENT_OFFICER},
 FINAL_REVIEW_APPROVE:{roles:[ROLE.FINAL_AUTHORITY],from:[STATUS.PENDING_FINAL_REVIEW],to:STATUS.PENDING_FINAL_APPROVAL,stage:STAGE.FINAL_APPROVAL,nextRole:ROLE.FINAL_AUTHORITY},
 FINAL_REVIEW_RETURN:{roles:[ROLE.FINAL_AUTHORITY],from:[STATUS.PENDING_FINAL_REVIEW],to:STATUS.REJECTED,stage:STAGE.PAYMENT_VERIFICATION,returnTarget:STAGE.PAYMENT_VERIFICATION,returnRole:ROLE.PAYMENT_CONTROLLER},
 FINAL_APPROVE:{roles:[ROLE.FINAL_AUTHORITY],from:[STATUS.PENDING_FINAL_APPROVAL],to:STATUS.COMPLETED,stage:STAGE.COMPLETED},
 FINAL_RETURN:{roles:[ROLE.FINAL_AUTHORITY],from:[STATUS.PENDING_FINAL_APPROVAL],to:STATUS.REJECTED,stage:STAGE.FINAL_REVIEW,returnTarget:STAGE.FINAL_REVIEW,returnRole:ROLE.FINAL_AUTHORITY},
};
export function canAction(roleKey,action){return Boolean(rules[action]?.roles.includes(roleKey))}
async function findAssignee(tx,roleKey,createdById){
 if(roleKey===ROLE.ACCOUNTANT && createdById)return tx.user.findUnique({where:{id:createdById}});
 return tx.user.findFirst({where:{roleKey,active:true},orderBy:{createdAt:"asc"}});
}
export async function applyAction({requestId,user,action,note,payment}){
 const rule=rules[action]; if(!rule||!canAction(user.roleKey,action))throw new Error("FORBIDDEN");
 return prisma.$transaction(async tx=>{
  const request=await tx.request.findUnique({where:{id:requestId},include:{payment:true}});
  if(!request)throw new Error("NOT_FOUND");
  if(!rule.from.includes(request.status))throw new Error("INVALID_STAGE");
  if((action.includes("RETURN")||action==="FIRST_REVIEW_RETURN")&&!String(note||"").trim())throw new Error("RETURN_REASON_REQUIRED");
  if(action==="PAYMENT_COMPLETE"){
   const paidAmount=Number(payment?.paidAmount??request.payment?.paidAmount??0); const receiptName=payment?.receiptName??request.payment?.receiptName??null;
   if(paidAmount!==request.amount)throw new Error("PAYMENT_AMOUNT_MISMATCH"); if(!receiptName)throw new Error("RECEIPT_REQUIRED");
   await tx.payment.upsert({where:{requestId},update:{amount:request.amount,paidAmount,status:"PAID",paidAt:payment?.paidAt?new Date(payment.paidAt):new Date(),receiptName,receiptSize:payment?.receiptSize??null},create:{requestId,amount:request.amount,paidAmount,status:"PAID",paidAt:payment?.paidAt?new Date(payment.paidAt):new Date(),receiptName,receiptSize:payment?.receiptSize??null}});
  }
  if(action==="PAYMENT_VERIFY"){
   if(!request.payment)throw new Error("PAYMENT_REQUIRED");
   await tx.payment.update({where:{requestId},data:{verifiedAt:new Date(),verifiedById:user.id,status:"VERIFIED"}});
  }
  const updated=await tx.request.update({where:{id:requestId},data:{status:rule.to,statusType:types[rule.to],currentStage:rule.stage}});
  await tx.approval.create({data:{requestId,userId:user.id,roleKey:user.roleKey,action,status:action.includes("RETURN")?"RETURNED":"APPROVED",description:note||texts[action],returnTarget:action.includes("RETURN")?rule.returnTarget||null:null}});
  await tx.activity.create({data:{userId:user.id,requestId,action:texts[action],description:`${texts[action]} برای درخواست ${requestId} توسط ${user.name}${note?` — ${note}`:""}.`,type:action.includes("RETURN")?"REJECTION":action.startsWith("PAYMENT")?"PAYMENT":"APPROVAL"}});
  await tx.task.updateMany({where:{requestId,completed:false},data:{completed:true}});
  const targetRole=rule.nextRole||rule.returnRole;
  if(targetRole){const target=await findAssignee(tx,targetRole,request.createdById); if(target)await tx.task.create({data:{requestId,assigneeId:target.id,title:request.project,stage:rule.stage,stageType:types[rule.to],action:action.includes("RETURN")?"EDIT_REQUEST":rule.nextRole===ROLE.FINAL_AUTHORITY&&rule.to===STATUS.PENDING_FINAL_APPROVAL?"FINAL_APPROVE":rule.nextRole===ROLE.FINAL_AUTHORITY?"FINAL_REVIEW_APPROVE":action}});}
  return updated;
 });
}
export function serializeRequest(request){return{id:request.id,project:request.project,supplier:request.supplier,invoice:request.invoice,requestNumber:request.requestNumber,date:request.date.toISOString(),department:request.department,purchaseType:request.purchaseType,description:request.description,amount:request.amount,status:request.status,statusLabel:labels[request.status]||request.status,statusType:request.statusType,currentStage:request.currentStage,priority:request.priority,createdById:request.createdById,createdAt:request.createdAt?.toISOString?.()||null,updatedAt:request.updatedAt?.toISOString?.()||null}}
