const { PrismaClient } = require("@prisma/client");
const crypto = require("node:crypto");
const prisma = new PrismaClient();
function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) { return `${salt}:${crypto.scryptSync(password, salt, 64).toString("hex")}`; }
const PASSWORD = "123456";
const MOBILE = "09397439928";
const users = [
  { id:"user1", username:"farzane.danesh", mobile:MOBILE, name:"فرزانه دانشی", jobTitle:"کارشناس مالی", roleKey:"ACCOUNTANT" },
  { id:"user2", username:"saeed.foroutan", mobile:MOBILE, name:"سعید فروتن", jobTitle:"مدیر بازرگانی", roleKey:"FIRST_REVIEWER" },
  { id:"user3", username:"mohammad.esmaeili", mobile:MOBILE, name:"محمد اسماعیلی", jobTitle:"مدیر مالی", roleKey:"PAYMENT_OFFICER" },
  { id:"user4", username:"farzane.danesh2", mobile:MOBILE, name:"فرزانه دانشی", jobTitle:"کارشناس مالی", roleKey:"PAYMENT_CONTROLLER" },
  { id:"user5", username:"vahid.foroutan", mobile:MOBILE, name:"وحید فروتن", jobTitle:"مدیر عامل", roleKey:"FINAL_AUTHORITY" },
];
const requests = [
  {id:"AF-1024",project:"خرید تجهیزات پروژه پارس",supplier:"شرکت تجهیزات نوین",invoice:"INV-4582",department:"واحد مالی",purchaseType:"خرید تجهیزات",description:"تأمین تجهیزات مورد نیاز پروژه پارس",amount:250000000,status:"PENDING_PAYMENT_VERIFICATION",statusType:"warning",currentStage:"PAYMENT_VERIFICATION",createdById:"user1"},
  {id:"AF-1023",project:"تأمین تجهیزات اداری",supplier:"شرکت آریا",invoice:"INV-4579",department:"مالی",purchaseType:"خرید تجهیزات",description:"تأمین تجهیزات اداری",amount:180000000,status:"PENDING_PAYMENT",statusType:"warning",currentStage:"PAYMENT",createdById:"user1"},
  {id:"AF-1022",project:"خدمات پشتیبانی",supplier:"پارس سرویس",invoice:"INV-4571",department:"تدارکات",purchaseType:"خدمات",description:"خدمات پشتیبانی",amount:95000000,status:"PENDING_FINAL_REVIEW",statusType:"info",currentStage:"FINAL_REVIEW",createdById:"user2"},
  {id:"AF-1021",project:"خرید لوازم اداری",supplier:"شرکت آریا",invoice:"INV-4568",department:"پروژه‌ها",purchaseType:"خرید تجهیزات",description:"خرید لوازم اداری",amount:85000000,status:"REJECTED",statusType:"danger",currentStage:"DRAFT",createdById:"user2"},
  {id:"AF-1020",project:"خدمات فنی ساختمان",supplier:"نگین سازه",invoice:"INV-4562",department:"فناوری اطلاعات",purchaseType:"خدمات",description:"خدمات فنی ساختمان",amount:135000000,status:"COMPLETED",statusType:"success",currentStage:"COMPLETED",createdById:"user2"},
  {id:"AF-1019",project:"تأمین خدمات فنی",supplier:"نگین سازه",invoice:"INV-4559",department:"پروژه‌ها",purchaseType:"خدمات",description:"تأمین خدمات فنی",amount:140000000,status:"DRAFT",statusType:"info",currentStage:"DRAFT",createdById:"user1"},
];
async function main(){
  await prisma.task.deleteMany({}); await prisma.approval.deleteMany({}); await prisma.activity.deleteMany({}); await prisma.payment.deleteMany({}); await prisma.requestItem.deleteMany({}); await prisma.request.deleteMany({}); await prisma.session.deleteMany({});
  await prisma.user.deleteMany({where:{id:{in:["user01","user02","user03","user04","user05","user06"]}}});
  for(const u of users){await prisma.user.upsert({where:{id:u.id},update:{...u,passwordHash:hashPassword(PASSWORD),active:true},create:{...u,passwordHash:hashPassword(PASSWORD),active:true}});await prisma.userSetting.upsert({where:{userId:u.id},update:{},create:{userId:u.id}});}
  for(let i=0;i<requests.length;i++){const r=requests[i];await prisma.request.create({data:{...r,requestNumber:`REQ-1405-${r.id.slice(3)}`,date:new Date(2026,8,15-i),items:{create:[{title:i===0?"مانیتور حرفه‌ای":"تجهیزات مورد نیاز",quantity:i===0?4:1,unitPrice:i===0?30000000:r.amount,total:i===0?120000000:r.amount,description:r.description}]}}});}
  await prisma.payment.create({data:{requestId:"AF-1024",amount:250000000,paidAmount:250000000,status:"PAID",paidAt:new Date(2026,8,16,10,32),receiptName:"receipt-AF-1024.pdf",receiptSize:"240 KB"}});
  for(const [requestId,assigneeId,title,stage,stageType,action] of [["AF-1024","user4","کنترل پرداخت","PAYMENT_VERIFICATION","warning","PAYMENT_VERIFY"],["AF-1023","user3","ثبت پرداخت","PAYMENT","warning","PAYMENT_COMPLETE"],["AF-1022","user5","بررسی نهایی و تأیید نهایی","FINAL_REVIEW","info","FINAL_REVIEW_APPROVE"]])await prisma.task.create({data:{requestId,assigneeId,title,stage,stageType,action}});
  for(const [userId,requestId,action,description,type] of [["user5","AF-1020","تأیید نهایی","درخواست AF-1020 تکمیل شد","APPROVAL"],["user5","AF-1022","ورود به مرحله بررسی نهایی","درخواست AF-1022 به مدیرعامل ارجاع شد","APPROVAL"],["user4","AF-1024","در انتظار کنترل پرداخت","پرداخت درخواست AF-1024 برای کنترل ارسال شد","PAYMENT"],["user3","AF-1024","تکمیل پرداخت","پرداخت درخواست AF-1024 ثبت شد","PAYMENT"],["user2","AF-1024","تأیید بررسی اولیه","درخواست AF-1024 برای پرداخت تأیید شد","APPROVAL"],["user1","AF-1024","ایجاد درخواست","درخواست AF-1024 ایجاد شد","REQUEST"]])await prisma.activity.create({data:{userId,requestId,action,description,type}});
  console.log("AFRA seed completed with 5 users.");
}
main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>prisma.$disconnect());
