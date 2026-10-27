export const WORKFLOW_ACTIONS = {
  EDIT_REQUEST: "EDIT_REQUEST",

  FIRST_REVIEW_APPROVE: "FIRST_REVIEW_APPROVE",
  FIRST_REVIEW_RETURN: "FIRST_REVIEW_RETURN",

  PAYMENT_COMPLETE: "PAYMENT_COMPLETE",
  PAYMENT_RETURN: "PAYMENT_RETURN",

  PAYMENT_VERIFY: "PAYMENT_VERIFY",
  PAYMENT_VERIFY_RETURN: "PAYMENT_VERIFY_RETURN",

  FINAL_REVIEW_APPROVE: "FINAL_REVIEW_APPROVE",
  FINAL_REVIEW_RETURN: "FINAL_REVIEW_RETURN",

  FINAL_APPROVE: "FINAL_APPROVE",
  FINAL_RETURN: "FINAL_RETURN",
};

export const WORKFLOW_ACTION_CONFIG = {
  [WORKFLOW_ACTIONS.FIRST_REVIEW_APPROVE]: {
    label: "تأیید بررسی اولیه",
    buttonLabel: "تأیید و ارسال به پرداخت",
    type: "approve",
  },

  [WORKFLOW_ACTIONS.FIRST_REVIEW_RETURN]: {
    label: "برگشت برای اصلاح",
    buttonLabel: "برگشت برای اصلاح",
    type: "return",
  },

  [WORKFLOW_ACTIONS.PAYMENT_COMPLETE]: {
    label: "ثبت پرداخت",
    buttonLabel: "ثبت پرداخت و ادامه",
    type: "approve",
  },

  [WORKFLOW_ACTIONS.PAYMENT_RETURN]: {
    label: "برگشت برای اصلاح",
    buttonLabel: "برگشت برای اصلاح",
    type: "return",
  },

  [WORKFLOW_ACTIONS.PAYMENT_VERIFY]: {
    label: "تأیید پرداخت",
    buttonLabel: "تأیید پرداخت",
    type: "approve",
  },

  [WORKFLOW_ACTIONS.PAYMENT_VERIFY_RETURN]: {
    label: "برگشت پرداخت",
    buttonLabel: "برگشت برای اصلاح",
    type: "return",
  },

  [WORKFLOW_ACTIONS.FINAL_REVIEW_APPROVE]: {
    label: "تأیید بررسی نهایی",
    buttonLabel: "تأیید بررسی نهایی",
    type: "approve",
  },

  [WORKFLOW_ACTIONS.FINAL_REVIEW_RETURN]: {
    label: "برگشت برای اصلاح",
    buttonLabel: "برگشت برای اصلاح",
    type: "return",
  },

  [WORKFLOW_ACTIONS.FINAL_APPROVE]: {
    label: "تأیید نهایی",
    buttonLabel: "تأیید نهایی درخواست",
    type: "approve",
  },

  [WORKFLOW_ACTIONS.FINAL_RETURN]: {
    label: "برگشت برای اصلاح",
    buttonLabel: "برگشت برای اصلاح",
    type: "return",
  },

  [WORKFLOW_ACTIONS.EDIT_REQUEST]: {
    label: "ویرایش درخواست",
    buttonLabel: "ویرایش درخواست",
    type: "edit",
  },
};

export function getWorkflowActionConfig(action) {
  return WORKFLOW_ACTION_CONFIG[action] || null;
}