-- CreateTable
CREATE TABLE "days" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habit_week_days" (
    "id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,

    CONSTRAINT "habit_week_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayHabit" (
    "day_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "days_date_key" ON "days"("date");

-- CreateIndex
CREATE UNIQUE INDEX "habit_week_days_habit_id_week_day_key" ON "habit_week_days"("habit_id", "week_day");

-- CreateIndex
CREATE UNIQUE INDEX "DayHabit_day_id_habit_id_key" ON "DayHabit"("day_id", "habit_id");
