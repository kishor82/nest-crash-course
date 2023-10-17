import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: 'db',
  username: 'local',
  password: 'evsbvFm3QR',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
