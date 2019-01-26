delete from thread_dislikes 
where 
user_id = $1 and thread_id = $2;