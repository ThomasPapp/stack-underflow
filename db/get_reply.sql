select post.*, users.username, users.avatar, users.rank, users.reputation
from post
join users
on post.post_author = users.user_id
where post.post_id=$1;