CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "book" (
	"id" serial NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"imageUrl" varchar(255),
	"publish_date" varchar(255),
	"isbn" varchar(255),
	"user_id" int NOT NULL,
	CONSTRAINT "book_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "book" ADD CONSTRAINT "book_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");


INSERT INTO "book" ("title", "author", "imageUrl", "publish_date", "isbn", "user_id") VALUES ('Inifite Jest', 'David Foster Wallace', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1446876799l/6759._SX98_.jpg', '01/02/1996', '9780316921176', 1), ('A Planet Called Treason', 'Orson Scott Card', 'https://upload.wikimedia.org/wikipedia/en/d/dc/A_planet_called_treason.jpg', '1979', '0312613954', 1);
