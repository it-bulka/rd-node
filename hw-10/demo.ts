import { productRepo } from './src/repositories/product.repo';
import { initDb } from './src/db/init';

async function demo() {
  const saved = await productRepo.save({
    name: 'Test product',
    price: 789.90,
    description: 'Sample product description',
  })
  console.log('1. Saved record (save):', saved);

  const foundAll = await productRepo.find({ name: 'Test product' })
  console.log('2. Array of records (find):', foundAll)

  const updated = await productRepo.update(saved.id, { price: 999.99 })
  console.log('3. Updated record (update):', updated)

  await productRepo.delete(saved.id)
  const foundAfterDelete = await productRepo.findOne(saved.id)
  console.log(`4. Empty result after delete record with ID ${saved.id} (findOne)`, foundAfterDelete)
}

initDb()
  .then(()=> demo())
  .catch(err => {
    console.error('Demo error:', err);
    process.exit(1);
  })
