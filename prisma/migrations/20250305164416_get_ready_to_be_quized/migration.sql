/*
  Warnings:

  - The `quiz` column on the `lesson` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "lesson" ALTER COLUMN "contenturl" DROP NOT NULL,
ALTER COLUMN "contenturl" SET DEFAULT 'Z2N5a7XZWg8',
DROP COLUMN "quiz",
ADD COLUMN     "quiz" TEXT[];
