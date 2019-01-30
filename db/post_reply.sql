insert into post (post_author, date, thread, content)
values
($1, $2, $3, $4)
returning *;