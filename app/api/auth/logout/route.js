import { destroySession } from "@/lib/server/auth";
import { ok } from "@/lib/server/response";
export async function POST() { await destroySession(); return ok(null); }
