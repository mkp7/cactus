CREATE TABLE "_collections" (
	"id"	TEXT NOT NULL,
	"name"	TEXT NOT NULL UNIQUE,
	"schema"	JSON NOT NULL DEFAULT [],
	PRIMARY KEY("id")
);