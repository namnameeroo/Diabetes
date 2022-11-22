INSERT INTO USERS (name, auth_id, email, status, roles, auth_provider, created_date, modified_date) VALUES ('hana', '12', 'hanah@example.com', 'NORMAL', 'USER', 'DEFAULT', now(), now());
INSERT INTO USERS (name, auth_id, email, status, roles, auth_provider, created_date, modified_date) values ('han3', '134', 'hanah2@example.com', 'NORMAL', 'USER', 'DEFAULT', now(), now());

INSERT INTO FOOD (user_id, name, provider) values (1, 'test', 'test');
INSERT INTO FOOD (user_id, name, provider) values (1, 'test2', 'test2');