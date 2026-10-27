import { getCurrentUser } from "@/lib/auth/session";
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
} from "@/lib/constants/roles";

export function getCurrentUserRole() {
  const user = getCurrentUser();

  return user?.roleKey || null;
}

export function can(permission) {
  const roleKey = getCurrentUserRole();

  if (!roleKey) {
    return false;
  }

  return hasPermission(roleKey, permission);
}

export function canAny(permissions = []) {
  const roleKey = getCurrentUserRole();

  if (!roleKey) {
    return false;
  }

  return hasAnyPermission(roleKey, permissions);
}

export function canAll(permissions = []) {
  const roleKey = getCurrentUserRole();

  if (!roleKey) {
    return false;
  }

  return hasAllPermissions(roleKey, permissions);
}