import { NextResponse } from "next/server";
export function ok(data, init = {}) { return NextResponse.json({ ok: true, data }, init); }
export function fail(message, status = 400, details) { return NextResponse.json({ ok: false, error: message, ...(details ? { details } : {}) }, { status }); }
export function unauthorized() { return fail("احراز هویت الزامی است.", 401); }
export function forbidden() { return fail("شما دسترسی انجام این عملیات را ندارید.", 403); }
