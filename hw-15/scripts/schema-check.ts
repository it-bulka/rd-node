import * as spawn from 'cross-spawn'
import dataSource from '../src/config/data-source';

const matchRed = '\x1b[31m'
const defaultStyle = '\x1b[0m'
const consoleErr = (...args: any[]) => {
  const [first, ...rest] = args
  console.log(matchRed, first, defaultStyle, ...rest)
};


const schemaCheck = async () => checkVariant1()
schemaCheck().catch(err => {
  consoleErr('Error running schema:log:', err);
  process.exit(1);
})

async function checkVariant1() {
  const result = spawn.sync('npm', ['run', 'schema:log'], {
    stdio: 'pipe',
    encoding: 'utf8',
  })

  if (result.error) {
    consoleErr('Error running schema:log:', result.error);
    process.exit(1);
  }

  if (result.status !== 0) {
    consoleErr('Command failed with exit code', result.status)
    consoleErr('error:', result.stderr || result.stdout)
    process.exit(result.status)
  }

  const output = result.stdout.trim();
  if (output.length > 0) {
    consoleErr('Schema mismatch! SQL queries needed to sync:', output);
    process.exit(1);
  } else {
    console.log('Database schema is up to date with entities.');
    process.exit(0);
  }
}

async function checkVariant2() {
  await dataSource.initialize();
  const sql = await dataSource.driver.createSchemaBuilder().log();
  await dataSource.destroy();

  if (sql.upQueries.length > 0) {
    consoleErr('Schema mismatch! SQL needed to sync:');
    sql.upQueries.forEach(q => console.log(q.query));
    process.exit(1);
  } else {
    console.log('Database schema is up to date with entities.');
    process.exit(0);
  }
}
