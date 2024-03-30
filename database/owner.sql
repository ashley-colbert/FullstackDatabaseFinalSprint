CREATE TABLE public.owner
(
    owner_id serial NOT NULL,
    name character varying(100),
    age integer,
    email character varying(100),
    PRIMARY KEY (owner_id)
);

ALTER TABLE IF EXISTS public.owner
    OWNER to postgres;