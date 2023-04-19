-- CreateTable
CREATE TABLE "Bark" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "Bark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bark" ADD CONSTRAINT "Bark_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
