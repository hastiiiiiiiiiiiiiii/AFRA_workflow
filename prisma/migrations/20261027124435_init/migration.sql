-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Request" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "project" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "invoice" TEXT,
    "requestNumber" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "department" TEXT NOT NULL,
    "purchaseType" TEXT NOT NULL,
    "description" TEXT,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "statusType" TEXT NOT NULL,
    "currentStage" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "createdById" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Request_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Request" ("amount", "createdAt", "createdById", "currentStage", "date", "department", "description", "id", "invoice", "priority", "project", "purchaseType", "requestNumber", "status", "statusType", "supplier", "updatedAt") SELECT "amount", "createdAt", "createdById", "currentStage", "date", "department", "description", "id", "invoice", "priority", "project", "purchaseType", "requestNumber", "status", "statusType", "supplier", "updatedAt" FROM "Request";
DROP TABLE "Request";
ALTER TABLE "new_Request" RENAME TO "Request";
CREATE UNIQUE INDEX "Request_requestNumber_key" ON "Request"("requestNumber");
CREATE INDEX "Request_status_idx" ON "Request"("status");
CREATE INDEX "Request_currentStage_idx" ON "Request"("currentStage");
CREATE INDEX "Request_createdById_idx" ON "Request"("createdById");
CREATE INDEX "Request_date_idx" ON "Request"("date");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "mobile" TEXT,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "roleKey" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("active", "createdAt", "id", "jobTitle", "mobile", "name", "passwordHash", "roleKey", "updatedAt", "username") SELECT "active", "createdAt", "id", "jobTitle", "mobile", "name", "passwordHash", "roleKey", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE INDEX "User_mobile_idx" ON "User"("mobile");
CREATE INDEX "User_roleKey_active_idx" ON "User"("roleKey", "active");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
