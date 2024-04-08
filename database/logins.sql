CREATE TABLE public.logins
(
    username character varying(20) NOT NULL,
    date date NOT NULL
);

ALTER TABLE logins
ADD CONSTRAINT FKey3
FOREIGN KEY (username) REFERENCES users(username);