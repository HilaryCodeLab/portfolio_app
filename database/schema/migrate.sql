alter table `baddy_attendances` add constraint `baddy_attendances_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on delete cascade;
alter table `members` add `amount` decimal(8, 2) not null default '0' ;
alter table `members` add `total` decimal(8, 2) not null default '0'  ;
alter table `members` add `addOnAmount` decimal(8, 2) not null default '0';