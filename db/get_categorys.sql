select category.category_name, category.category_id, forum.forum_name, forum.forum_id from category
join forum 
on category.category_id = forum.category;