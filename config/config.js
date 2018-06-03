require('dotenv').config();

CONFIG = {}

CONFIG.app            = process.env.APP || 'development';
CONFIG.port           = process.env.PORT || '3000';

CONFIG.db_dialect     = process.env.DB_DIALECT || 'mysql';
CONFIG.db_host        = process.env.DB_HOST || 'localhost';
CONFIG.db_port        = process.env.DB_PORT || '3306';
CONFIG.db_name        = process.env.DB_NAME || 'picofu';
CONFIG.db_user        = process.env.DB_USER || 'root';
CONFIG.db_password    = process.env.DB_PASSWORD || 'root';

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'HS256';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '1000';

module.exports = CONFIG;
