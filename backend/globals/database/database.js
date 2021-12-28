var mysql      = require('mysql');
var mysqlConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password: 'root',
});

mysqlConnection.connect( function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("database is conected");
    mysqlConnection.query("CREATE SCHEMA IF NOT EXISTS `zarego` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci");
    mysqlConnection.query("USE zarego")
    mysqlConnection.query("CREATE TABLE IF NOT EXISTS `tasks`(`id` int(10) unsigned NOT NULL AUTO_INCREMENT,`title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,`description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,`status` int(255) COLLATE utf8mb4_unicode_ci NOT NULL,`created_at` timestamp NULL DEFAULT NULL,`updated_at` timestamp NULL DEFAULT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci")
  }
});
module.exports = mysqlConnection;

// const { Sequelize } = require('sequelize');

// const sequelize =  new Sequelize('zarego', 'root', 'root', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// try {
//   sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }