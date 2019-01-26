delete from thread_likes 
where 
user_id = $1 and thread_id = $2;