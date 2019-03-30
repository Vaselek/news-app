CREATE SCHEMA `blog` DEFAULT CHARACTER SET utf8 ;
USE `blog`;
CREATE TABLE `stories` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `image` VARCHAR(100) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE `comments` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `story_id` INT NOT NULL,
    `author` VARCHAR(100) DEFAULT 'Anonymous',
    `text` TEXT NOT NULL,
	INDEX `story_id_fk_idx` (`story_id` ASC) VISIBLE,
	CONSTRAINT `story_fk`
    FOREIGN KEY (`story_id`)
    REFERENCES `stories` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
INSERT INTO `stories` (id, title, description)
VALUES
	(1, 'Great story about table..', 'Some furniture like tables, cupboards...'),
    (2, 'Computer education', 'Like PC, monitors, printers etc...'),
    (3, 'Home applicances', 'Appliances like refrigerators, TV etc...');

INSERT INTO `comments` (id, story_id, author, text)
VALUES
	(1, 1, 'Jhon', 'Main Office'),
    (2, 2, 'Ivan', 'Director sits'),
    (3, 3, 'Han', 'Where teachers have coffee break');    
