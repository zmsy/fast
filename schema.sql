create table if not exists fantasy.fast (
	id serial primary key,
	host varchar,
	alive bool,
	numeric_host varchar,
	average numeric(6, 2),
	maximum numeric(6, 2),
	minimum numeric(6, 2)
);
grant all privileges on fantasy.fast to public;
grant all privileges on fantasy.fast_id_seq to public;
