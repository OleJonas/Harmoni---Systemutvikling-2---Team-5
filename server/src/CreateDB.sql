drop table if exists Comment;
drop table if exists Contact_Info;
drop table if exists Event_Ticket;
drop table if exists Event;
drop table if exists Category;
drop table if exists Ticket_Category;
drop table if exists User;
drop table if exists Role;


create table Event
(
  event_id   int auto_increment not null,
  name varchar(45) not null,
  description text not null,
  date datetime not null,
  place varchar(40) not null,
  category_id int not null,
  img_url text,
  artists varchar(100) not null,
  tech_rider longtext not null,
  hospitality_rider longtext,
  contract longtext,
  personnel text,
  filed tinyint not null default 0,
  pending tinyint not null default 1,
  canceled tinyint not null default 0,
  constraint event_pk primary key (event_id)
);

create table Ticket_Category
(
  ticket_category_id int auto_increment not null,
  name varchar(45) not null,
  constraint ticket_category_pk primary key (ticket_category_id)
);

create table Event_Ticket
(
  event_id int not null,
  ticket_category_id int not null,
  price int not null,
  number int not null,
  constraint event_ticket_pk primary key (event_id, ticket_category_id)
);

create table Role
(
  role_id int auto_increment not null,
  role varchar(45) not null,
  constraint role_pk primary key (role_id)
);

-- should User have phone-numbers, since the information is 1-to-1

create table User
(
  user_id int auto_increment not null,
  name varchar(100) not null,
  email varchar(320) not null unique,
  phone varchar(12) not null unique,
  profile_photo longtext,
  password_hash varchar(128) not null,
  role_id int,
  approved tinyint not null default 0,
  constraint user_pk primary key (user_id)
)engine=InnoDB;

create table Category
(
  category_id int auto_increment not null,
  name varchar(45) not null,
  constraint category_pk primary key (category_id)
);

create table Comment
(
  event_id int not null,
  user_id int not null,
  comment text not null,
  date datetime not null,
  constraint comment_pk primary key (event_id, user_id)
);


create table Contact_Info
(
  contact_info_id int auto_increment not null,
  name varchar(100) not null,
  phone varchar(12) not null,
  email varchar(320) not null,
  event_id int not null,
  constraint contact_info_pk primary key (contact_info_id)
);


alter table Event
  add foreign key (category_id) references Category(category_id);

alter table Comment
  add foreign key (user_id) references User(user_id),
  add foreign key (event_id) references Event(event_id);

alter table Event_Ticket
  add foreign key (event_id) references Event(event_id),
  add foreign key (ticket_category_id) references Ticket_Category(ticket_category_id);

alter table User
  add foreign key (role_id) references Role(role_id);

alter table Contact_Info
  add foreign key (event_id) references Event(event_id);



insert into Role(role) values ('admin');
insert into Role(role) values ('Sceneansvarlig');
insert into Role(role) values ('Økonomisjef');
insert into Role(role) values ('Barsjef');
insert into Role(role) values ('Bartender');
insert into Role(role) values ('Handyman');
insert into Role(role) values ('Fotograf');
insert into Role(role) values ('Markedsfører');
insert into Role(role) values ('SoMe-ansvarlig');
insert into Role(role) values ('Ølbrygger');
insert into Role(role) values ('Lydteknikker');
insert into Role(role) values ('Lystekniker');
insert into Role(role) values ('Scenerigger');
insert into Role(role) values ('Artistbooker');
insert into Role(role) values ('Artistkontakt');
insert into Role(role) values ('Konseptutvikler');
insert into Role(role) values ('Quizmaster');
insert into Role(role) values ('Festplanlegger');


-- passwords 'testing'
insert into User(name, email, phone, password_hash, role_id) values ('test1', 'test1@tester.no', '12345678','3856f5086eb7138f2e4e3d42d8569ce4f4b66a83cbce3192da65ee129e8c01d2832057b4bd8f124a2a47d376de0c1808cabc2e467275cc9f7b8a059d618c04bd', 1);
insert into User(name, email, phone, password_hash, role_id) values ('test2', 'test2@tester.no', '87654321','75cf568134bd7a6a937592fb8f9aa5425a03e8d36edb2e894b187b4d0893d2e2eac917768a56a3fb16bdc7055d603e3be23ccb8e97c9cb5612d345218ec96279', 3);
insert into User(name, email, phone, password_hash, role_id) values ('test3', 'test3@tester.no', '98765432','75cf568134bd7a6a937592fb8f9aa5425a03e8d36edb2e894b187b4d0893d2e2eac917768a56a3fb16bdc7055d603e3be23ccb8e97c9cb5612d345218ec96279', 7);


insert into Category(name) values ('forelesning');
insert into Category(name) values ('konsert');
insert into Category(name) values ('kul');


insert into Ticket_Category(name) values ('Standard');
insert into Ticket_Category(name) values ('Gratis');
insert into Ticket_Category(name) values ('VIP');
insert into Ticket_Category(name) values ('GoldenCircle');
insert into Ticket_Category(name) values ('EarlyBird');


insert into Event(name, description, date, place, category_id, artists, tech_rider, hospitality_rider, personnel, filed, pending, canceled)
values ('the Donn party', 'Donn holder repetisjonsforelesning i OS', '2020-02-03 20:30:00', 'Sukkerhuset', 1, 'Donn Morrison', 'speakers 2x\n vocal solo mic 1x\n soundtrack with playback player 1x\n projector to show lectures\n all with linux', 'give him a beer or something to put an OS in, and compliment his lectures... just do it', 'an audience', 0, 0,0),
('Metallica metal', 'Metallica kommer til Sukkerhuset!', '2020-01-09 14:30:00', 'Sukkerhuset', 2, 'Metallica' , 'speakers 6x\n vocal solo mic 1x\n more speakers', 'lots of cool looking drinks and beer', 'has their own', 0, 0, 0);

insert into Contact_Info( name, phone, email, event_id) values ('Donn team', '1991', 'Donn@linux.OS', 1);
insert into Contact_Info( name, phone, email, event_id) values ('Metallica', '2386724692', 'metallica@metal.band', 1);


insert into Event_Ticket(event_id, ticket_category_id, price, number) values (1, 4, 0, 95);
insert into Event_Ticket(event_id, ticket_category_id, price, number) values (2, 1, 850, 200);
insert into Event_Ticket(event_id, ticket_category_id, price, number) values (2, 3, 1000, 2);


insert into Comment(event_id, user_id, comment, date) values (1,1,'this is a test comment', now());
insert into Comment(event_id, user_id, comment, date) values (1,2,'this is also a test comment', now());