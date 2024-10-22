/*
  Warnings:

  - You are about to drop the column `title` on the `Proposition` table. All the data in the column will be lost.
  - Added the required column `content` to the `Proposition` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Proposition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "Proposition_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Proposition" ("createdAt", "id", "ip", "postId") SELECT "createdAt", "id", "ip", "postId" FROM "Proposition";
DROP TABLE "Proposition";
ALTER TABLE "new_Proposition" RENAME TO "Proposition";
CREATE UNIQUE INDEX "Proposition_postId_content_key" ON "Proposition"("postId", "content");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
