const fs = require('fs');

console.log('🚀 Starting Node.js FS Exercise 2...');

// 1. CREATE file - fs.writeFile()
console.log('1️⃣ Creating data.txt...');
fs.writeFile('data.txt', 'Hello Node.js FS!\nLine 1 created.', (err) => {
  if (err) {
    console.error('❌ CREATE error:', err.message);
    return;
  }
  console.log('✅ File created successfully');
  
  // 2. READ file - fs.readFile()
  console.log('2️⃣ Reading data.txt...');
  fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('❌ READ error:', err.message);
      return;
    }
    console.log('📖 File content:', data.trim());
    
    // 3. APPEND - fs.appendFile()
    console.log('3️⃣ Appending to data.txt...');
    fs.appendFile('data.txt', '\nLine 2 appended!', (err) => {
      if (err) {
        console.error('❌ APPEND error:', err.message);
        return;
      }
      console.log('✅ Data appended');
      
      // 4. READ updated file
      fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) console.error('❌ FINAL READ error:', err.message);
        else console.log('📖 Updated content:', data.trim());
        
        // 5. DELETE - fs.unlink()
        console.log('🗑️  Deleting data.txt...');
        fs.unlink('data.txt', (err) => {
          if (err) console.error('❌ DELETE error:', err.message);
          else console.log('✅ All FS operations complete! File removed.');
        });
      });
    });
  });
});