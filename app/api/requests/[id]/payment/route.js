import crypto from "node:crypto";
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { prisma } from "@/lib/server/db";
import { getCurrentUser } from "@/lib/server/auth";
import { fail, ok, unauthorized } from "@/lib/server/response";

export async function POST(request,{params}){
 const user=await getCurrentUser(); if(!user)return unauthorized();
 if(user.roleKey!=="PAYMENT_OFFICER")return fail("فقط مسئول پرداخت می‌تواند پرداخت را ثبت کند.",403);
 const {id}=await params; const row=await prisma.request.findUnique({where:{id},include:{payment:true}});
 if(!row)return fail("درخواست پیدا نشد.",404); if(row.status!=="PENDING_PAYMENT")return fail("این درخواست در مرحله پرداخت نیست.",409);
 const form=await request.formData(); const paidAmount=Number(form.get("paidAmount")); const paidAt=form.get("paidAt"); const note=String(form.get("note")||""); const file=form.get("receipt");
 if(!Number.isInteger(paidAmount)||paidAmount!==row.amount)return fail("مبلغ پرداخت‌شده باید دقیقاً برابر مبلغ درخواست باشد.",400);
 if(!file||typeof file.arrayBuffer!=="function")return fail("رسید PDF الزامی است.",400);
 if(file.type!=="application/pdf")return fail("فقط فایل PDF قابل بارگذاری است.",400);
 if(file.size<=0||file.size>10*1024*1024)return fail("حجم فایل باید بیشتر از صفر و حداکثر ۱۰ مگابایت باشد.",400);
 const buffer=Buffer.from(await file.arrayBuffer()); const safeName=`${id}-${crypto.randomUUID()}.pdf`; const dir=path.join(process.cwd(),"public","uploads","receipts"); await mkdir(dir,{recursive:true}); await writeFile(path.join(dir,safeName),buffer);
 const receiptPath=`/uploads/receipts/${safeName}`;
 try{
  await prisma.$transaction(async tx=>{
   await tx.payment.upsert({where:{requestId:id},update:{amount:row.amount,paidAmount,status:"PAID",paidAt:paidAt?new Date(String(paidAt)):new Date(),receiptName:file.name,receiptSize:String(file.size),receiptPath},create:{requestId:id,amount:row.amount,paidAmount,status:"PAID",paidAt:paidAt?new Date(String(paidAt)):new Date(),receiptName:file.name,receiptSize:String(file.size),receiptPath}});
   await tx.request.update({where:{id},data:{status:"PENDING_PAYMENT_VERIFICATION",statusType:"warning",currentStage:"PAYMENT_VERIFICATION"}});
   await tx.task.updateMany({where:{requestId:id,completed:false},data:{completed:true}});
   const controller=await tx.user.findFirst({where:{roleKey:"PAYMENT_CONTROLLER",active:true},orderBy:{createdAt:"asc"}});
   if(!controller)throw new Error("NO_CONTROLLER");
   await tx.task.create({data:{requestId:id,assigneeId:controller.id,title:row.project,stage:"PAYMENT_VERIFICATION",stageType:"warning",action:"PAYMENT_VERIFY"}});
   await tx.activity.create({data:{userId:user.id,requestId:id,action:"تکمیل پرداخت",description:`پرداخت درخواست ${id} ثبت شد.${note?` ${note}`:""}`,type:"PAYMENT"}});
  });
 }catch(e){return fail(e.message==="NO_CONTROLLER"?"کاربر کنترل پرداخت فعال وجود ندارد.":"ثبت پرداخت ناموفق بود.",500)}
 return ok({requestId:id,paidAmount,receiptName:file.name,receiptUrl:receiptPath,status:"PENDING_PAYMENT_VERIFICATION"});
}
