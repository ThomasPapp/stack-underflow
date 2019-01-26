select thread.thread_id, thread.title, thread.author, thread.date
from forum
join thread
on forum.forum_id = thread.forum
where forum.forum_id = $1;