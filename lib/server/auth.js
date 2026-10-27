import crypto from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "./db";
const COOKIE_NAME=process.env.SESSION_COOKIE||"afra_session"; const SESSION_DAYS=7;
function hashToken(token){return crypto.createHash("sha256").update(token).digest("hex")}
export async function createSession(userId,remember=false){const token=crypto.randomBytes(32).toString("hex");const maxAge=(remember?30:SESSION_DAYS)*86400;const expiresAt=new Date(Date.now()+maxAge*1000);await prisma.session.create({data:{tokenHash:hashToken(token),userId,expiresAt}});const store=await cookies();store.set(COOKIE_NAME,token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge});return token}
export async function destroySession(){const store=await cookies();const token=store.get(COOKIE_NAME)?.value;if(token)await prisma.session.deleteMany({where:{tokenHash:hashToken(token)}});store.delete(COOKIE_NAME)}
export async function getCurrentUser(){const store=await cookies();const token=store.get(COOKIE_NAME)?.value;if(!token)return null;const session=await prisma.session.findUnique({where:{tokenHash:hashToken(token)},include:{user:true}});if(!session||session.expiresAt<=new Date()||!session.user.active){if(session)await prisma.session.delete({where:{id:session.id}}).catch(()=>{});return null}return session.user}
export function publicUser(user){if(!user)return null;return{id:user.id,username:user.username,mobile:user.mobile,name:user.name,jobTitle:user.jobTitle,roleKey:user.roleKey,role:roleLabel(user.roleKey)}}
export function roleLabel(roleKey){return({ACCOUNTANT:"حسابداری",FIRST_REVIEWER:"بررسی‌کننده اولیه",PAYMENT_OFFICER:"مسئول پرداخت",PAYMENT_CONTROLLER:"کنترل پرداخت",FINAL_AUTHORITY:"بررسی نهایی و تأیید نهایی"})[roleKey]||"کاربر سامانه"}
export async function requireUser(){const user=await getCurrentUser();if(!user)throw new Error("UNAUTHORIZED");return user}
export function verifyPassword(password,hash){const [salt,digest]=String(hash).split(":");if(!salt||!digest)return false;const actual=crypto.scryptSync(password,salt,64).toString("hex");return crypto.timingSafeEqual(Buffer.from(actual,"hex"),Buffer.from(digest,"hex"))}
export function hashPassword(password,salt=crypto.randomBytes(16).toString("hex")){return `${salt}:${crypto.scryptSync(password,salt,64).toString("hex")}`}
