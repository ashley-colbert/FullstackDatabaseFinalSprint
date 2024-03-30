CREATE TABLE public.pets
(
    pet_id serial NOT NULL,
    pet_name character varying(100),
    age integer,
    type_id integer,
    owner_id integer,
    PRIMARY KEY (pet_id)
);

ALTER TABLE IF EXISTS public.pets
    OWNER to postgres;

ALTER TABLE pets
ADD CONSTRAINT FKey1
FOREIGN KEY (type_id) REFERENCES pet_type(type_id);

ALTER TABLE pets;
ADD CONSTRAINT FKey2
FOREIGN KEY (owner_id) REFERENCES owner(owner_id);