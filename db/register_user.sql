insert into users
(username, email, password, rank, reputation)
values
($1, $2, $3, 0, 0)
returning *;