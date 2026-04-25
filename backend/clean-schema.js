const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// Remove MySQL specific types
schema = schema.replace(/@db\.\w+(\(\d+\))?/g, '');

// Remove map: "..." from @relation
schema = schema.replace(/,\s*map:\s*"[^"]+"/g, '');

// Remove mapped index names if any map: "..." inside @index(...) or @unique(...)
// Actually, it's safer to just let Prisma generate them.
// Let's replace `map: "..."` inside @index and @unique but keep @@map for table names.
schema = schema.replace(/@index\(\[([^\]]+)\],\s*map:\s*"[^"]+"\)/g, '@index([$1])');
schema = schema.replace(/@unique\(\[([^\]]+)\],\s*map:\s*"[^"]+"\)/g, '@unique([$1])');
schema = schema.replace(/@unique\(map:\s*"[^"]+"\)/g, '@unique');

fs.writeFileSync(schemaPath, schema, 'utf8');
console.log('Schema cleaned!');
