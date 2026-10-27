import { prisma } from "@/lib/server/db";
import { getCurrentUser } from "@/lib/server/auth";
import { fail, ok, unauthorized } from "@/lib/server/response";
import { serializeRequest } from "@/lib/server/workflow";

export async function GET(_request,{params}){
 const user=await getCurrentUser(); if(!user)return unauthorized(); const {id}=await params;
 const row=await prisma.request.findUnique({where:{id},include:{createdBy:true,items:true,payment:true,approvals:{include:{user:true},orderBy:{createdAt:"asc"}},activities:{include:{user:true},orderBy:{createdAt:"desc"}},tasks:{include:{assignee:true},orderBy:{createdAt:"desc"}}});
 if(!row)return fail("درخواست پیدا نشد.",404);
 return ok({...serializeRequest(row),createdBy:{id:row.createdBy.id,name:row.createdBy.name,jobTitle:row.createdBy.jobTitle},items:row.items,payment:row.payment?{...row.payment,paidAt:row.payment.paidAt?.toISOString()||null,verifiedAt:row.payment.verifiedAt?.toISOString()||null}:null,approvals:row.approvals.map(a=>({id:a.id,userId:a.userId,user:a.user.name,role:a.roleKey,action:a.action,status:a.status,date:a.createdAt.toISOString(),description:a.description,returnTarget:a.returnTarget})),activities:row.activities.map(a=>({id:a.id,title:a.action,user:a.user.name,time:a.createdAt.toISOString(),type:a.type,description:a.description})),tasks:row.tasks.map(t=>({id:t.id,assigneeId:t.assigneeId,assignee:t.assignee.name,stage:t.stage,action:t.action,completed:t.completed,createdAt:t.createdAt.toISOString()})),canEdit:user.roleKey==="ACCOUNTANT"&&row.createdById===user.id&&["DRAFT","REJECTED"].includes(row.status)});
}
