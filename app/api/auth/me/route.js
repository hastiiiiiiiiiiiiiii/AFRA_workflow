import { getCurrentUser, publicUser } from "@/lib/server/auth";
import { ok } from "@/lib/server/response";
export async function GET() { return ok(publicUser(await getCurrentUser())); }
