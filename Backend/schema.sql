
CREATE TABLE  users(
    id INT AUTO_INCREMENT  PRIMARY KEY,
    user_name VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password_user VARCHAR(250) NOT NULL,
    photo VARCHAR(250) ,
    role_user ENUM('user','company','admin'),
       UNIQUE KEY email 
);

CREATE TABLE products(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    product_name VARCHAR(250) NOT NULL,
    description  VARCHAR(2000) NOT NULL,
    price INT NOT NULL
    add_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    photo VARCHAR(250) ,
    company_id INT NOT NULL,
       UNIQUE KEY product_name 
       FOREIGN KEY (company_id) REFERENCES users(id)
);
CREATE TABLE orders(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    adress  VARCHAR(255) NOT NULL,
    phone INT(15) NOT NULL,
    product_id int(250) ,
    user_id INT 
         FOREIGN KEY (user_id) REFERENCES users(id)
         FOREIGN KEY (product_id) REFERENCES products(id)
);
