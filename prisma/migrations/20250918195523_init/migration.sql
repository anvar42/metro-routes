-- CreateTable
CREATE TABLE "public"."metro_route_translation" (
    "id" TEXT NOT NULL,
    "metro_route_id" TEXT NOT NULL,
    "lang" TEXT NOT NULL DEFAULT 'uz',
    "name" TEXT NOT NULL,

    CONSTRAINT "metro_route_translation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."metro_route_translation" ADD CONSTRAINT "metro_route_translation_metro_route_id_fkey" FOREIGN KEY ("metro_route_id") REFERENCES "public"."metro_route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
