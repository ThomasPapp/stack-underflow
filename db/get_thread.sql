select thread.*, users.username, users.avatar, users.rank, users.reputation
from thread
join users
on cast(thread.author as int) = users.user_id
where thread.thread_id = $1;