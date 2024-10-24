/*
  Warnings:

  - You are about to drop the column `downvotes` on the `Proposition` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `Proposition` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Proposition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "Proposition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Proposition_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Proposition" ("content", "createdAt", "id", "postId", "userId") SELECT "content", "createdAt", "id", "postId", "userId" FROM "Proposition";
DROP TABLE "Proposition";
ALTER TABLE "new_Proposition" RENAME TO "Proposition";
CREATE UNIQUE INDEX "Proposition_postId_content_key" ON "Proposition"("postId", "content");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
