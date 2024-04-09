CREATE TABLE public.users
(
    username character varying(20) NOT NULL,
    password character varying(20) NOT NULL,
    email character varying(100),
    PRIMARY KEY (username)
);

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;