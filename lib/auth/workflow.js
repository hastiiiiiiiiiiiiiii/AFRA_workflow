import { getCurrentUser } from "@/lib/auth/session";
import {
  canPerformWorkflowAction,
} from "@/lib/constants/roles";

export function canPerformAction(action) {
  const user = getCurrentUser();

  if (!user?.roleKey) {
    return false;
  }

  return canPerformWorkflowAction(user.roleKey, action);
}

export function getWorkflowRole() {
  const user = getCurrentUser();

  return user?.roleKey || null;
}