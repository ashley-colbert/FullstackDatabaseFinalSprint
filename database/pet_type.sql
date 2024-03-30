CREATE TABLE IF NOT EXISTS public.pet_type
(
    type_id integer NOT NULL DEFAULT nextval('pet_type_type_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default",
    life_expectancy integer,
    scientific_name character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT pet_type_pkey PRIMARY KEY (type_id)
)

ALTER TABLE IF EXISTS public.pet_type
    OWNER to postgres;