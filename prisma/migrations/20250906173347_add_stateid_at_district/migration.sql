-- AlterTable
ALTER TABLE "public"."District" ADD COLUMN     "stateId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."District" ADD CONSTRAINT "District_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "public"."State"("id") ON DELETE CASCADE ON UPDATE CASCADE;
