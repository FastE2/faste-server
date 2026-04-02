/*
  Warnings:

  - A unique constraint covering the columns `[ip,userAgent]` on the table `Device` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Device_ip_userAgent_key" ON "public"."Device"("ip", "userAgent");
