import crypto from "node:crypto";
import { prisma } from "@/lib/server/db";
import { getCurrentUser } from "@/lib/server/auth";
import { fail, ok, unauthorized } from "@/lib/server/response";
import { serializeRequest } from "@/lib/server/workflow";

export async function GET(request){
 const user=await getCurrentUser(); if(!user)return unauthorized();
 const sp=new URL(request.url).searchParams; const status=sp.get("status"), search=sp.get("search");
 const rows=await prisma.request.findMany({where:{...(status&&status!=="ALL"?{status}:{}),...(search?{OR:[{id:{contains:search}},{project:{contains:search}},{supplier:{contains:search}},{requestNumber:{contains:search}}]}:{})},orderBy:{createdAt:"desc"}});
 return ok(rows.map(serializeRequest));
}

export async function POST(request){
 const user=await getCurrentUser(); if(!user)return unauthorized();
 if(user.roleKey!=="ACCOUNTANT")return fail("فقط کارشناس مالی می‌تواند درخواست ایجاد کند.",403);
 try{
  const body=await request.json();
  const items=(Array.isArray(body.items)?body.items:[]).map(x=>{const quantity=Number(x.quantity);const unitPrice=Number(x.unitPrice);if(!x.title||!Number.isInteger(quantity)||quantity<=0||!Number.isInteger(unitPrice)||unitPrice<0)throw new Error("INVALID_ITEM");return{title:String(x.title).trim(),quantity,unitPrice,total:quantity*unitPrice,description:x.description?String(x.description).trim():null}});
  if(!body.project||!body.supplier||!items.length)return fail("نام پروژه، تأمین‌کننده و حداقل یک قلم الزامی است.",400);
  const amount=items.reduce((s,x)=>s+x.total,0); if(amount<=0)return fail("مبلغ کل باید بیشتر از صفر باشد.",400);
  const id=`AF-${crypto.randomUUID().slice(0,8).toUpperCase()}`;
  const created=await prisma.request.create({data:{id,project:String(body.project).trim(),supplier:String(body.supplier).trim(),invoice:body.invoice?String(body.invoice).trim():null,requestNumber:`REQ-${new Date().getFullYear()}-${id.slice(3)}`,date:body.date?new Date(`${body.date}T00:00:00`):new Date(),department:body.department||"مالی",purchaseType:body.purchaseType||"خرید",description:body.description?String(body.description).trim():null,amount,status:"DRAFT",statusType:"info",currentStage:"DRAFT",priority:body.priority||"NORMAL",createdById:user.id,items:{create:items}}});
  await prisma.activity.create({data:{userId:user.id,requestId:id,action:"ایجاد درخواست",description:`درخواست ${id} ایجاد شد.`,type:"REQUEST"}});
  return ok(serializeRequest(created),{status:201});
 }catch(e){return fail(e.message==="INVALID_ITEM"?"اطلاعات اقلام درخواست معتبر نیست.":"ایجاد درخواست ناموفق بود.",400)}
}
