import { DataSource } from 'typeorm';
import { getTypeOrmConfig } from './typeorm.options';

const options = getTypeOrmConfig()
const dataSource = new DataSource(options)

export default dataSource