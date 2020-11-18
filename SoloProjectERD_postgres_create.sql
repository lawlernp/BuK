CREATE TABLE "user" (
	"id" serial NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
	"password" varchar(1000) NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "library" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"book_id" int NOT NULL,
	"comments" varchar(255) NOT NULL,
	CONSTRAINT "library_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "book" (
	"id" serial NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"imageUrl" varchar(255),
	"publish_date" varchar(255),
	"isbn" integer(255),
	CONSTRAINT "book_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "library" ADD CONSTRAINT "library_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "library" ADD CONSTRAINT "library_fk1" FOREIGN KEY ("book_id") REFERENCES "book"("id");


