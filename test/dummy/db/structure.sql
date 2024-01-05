CREATE TABLE IF NOT EXISTS "schema_migrations" ("version" varchar NOT NULL PRIMARY KEY);
CREATE TABLE IF NOT EXISTS "ar_internal_metadata" ("key" varchar NOT NULL PRIMARY KEY, "value" varchar, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL);
CREATE TABLE IF NOT EXISTS "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "session_id" varchar NOT NULL, "count" integer DEFAULT 0 NOT NULL, "created_at" datetime(6) NOT NULL, "updated_at" datetime(6) NOT NULL, "name" varchar);
CREATE TABLE sqlite_sequence(name,seq);
CREATE INDEX "index_users_on_session_id" ON "users" ("session_id");
INSERT INTO "schema_migrations" (version) VALUES
('20221230164522'),
('20231004152703');


