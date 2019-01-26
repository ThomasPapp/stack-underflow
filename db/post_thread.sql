insert into thread (title, author, forum, date, content)
values
($1, $2, $3, $4, $5)
returning *;