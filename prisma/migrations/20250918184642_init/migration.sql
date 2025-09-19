-- CreateTable
CREATE TABLE "public"."station" (
    "id" TEXT NOT NULL,
    "metro_route_id" TEXT NOT NULL,
    "isTransfer" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."metro_route" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "metro_route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."transfers" (
    "id" TEXT NOT NULL,
    "from_station_id" TEXT NOT NULL,
    "to_station_id" TEXT NOT NULL,

    CONSTRAINT "transfers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."station_translation" (
    "id" TEXT NOT NULL,
    "station_id" TEXT NOT NULL,
    "lang" TEXT NOT NULL DEFAULT 'uz',
    "name" TEXT NOT NULL,

    CONSTRAINT "station_translation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."station" ADD CONSTRAINT "station_metro_route_id_fkey" FOREIGN KEY ("metro_route_id") REFERENCES "public"."metro_route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transfers" ADD CONSTRAINT "transfers_from_station_id_fkey" FOREIGN KEY ("from_station_id") REFERENCES "public"."station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transfers" ADD CONSTRAINT "transfers_to_station_id_fkey" FOREIGN KEY ("to_station_id") REFERENCES "public"."station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."station_translation" ADD CONSTRAINT "station_translation_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "public"."station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
