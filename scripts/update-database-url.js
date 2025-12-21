const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');

console.log('🔧 DATABASE_URL Neon Connection Fix\n');

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');

    let updated = false;
    const newLines = lines.map(line => {
        if (line.startsWith('DATABASE_URL=')) {
            let currentUrl = line.substring('DATABASE_URL='.length).replace(/"/g, '').trim();

            console.log('📋 Current DATABASE_URL:');
            console.log('   ' + currentUrl.substring(0, 60) + '...\n');

            // Parse URL to check existing parameters
            const [baseUrl, existingParams] = currentUrl.split('?');
            const params = new URLSearchParams(existingParams || '');

            console.log('Current parameters:');
            for (const [key, value] of params) {
                console.log(`   ${key}=${value}`);
            }
            console.log('');

            // Add required Neon pooling parameters if missing
            const requiredParams = {
                'sslmode': 'require',
                'pgbouncer': 'true',
                'connect_timeout': '15',
                'pool_timeout': '15'
            };

            let addedParams = false;
            for (const [key, value] of Object.entries(requiredParams)) {
                if (!params.has(key)) {
                    params.set(key, value);
                    console.log(`➕ Adding: ${key}=${value}`);
                    addedParams = true;
                }
            }

            if (addedParams) {
                const newUrl = `${baseUrl}?${params.toString()}`;
                updated = true;

                console.log('\n✅ Updated DATABASE_URL with pooling parameters\n');
                return `DATABASE_URL="${newUrl}"`;
            } else {
                console.log('✓ All required parameters already present\n');
                return line;
            }
        }
        return line;
    });

    if (updated) {
        // Backup the original file
        const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
        fs.writeFileSync(`${envPath}.backup-${timestamp}`, envContent, 'utf8');
        console.log(`💾 Backup created: .env.local.backup-${timestamp}\n`);

        // Write the updated content
        fs.writeFileSync(envPath, newLines.join('\n'), 'utf8');
        console.log('✅ .env.local has been updated!\n');
        console.log('═══════════════════════════════════════');
        console.log('Next steps:');
        console.log('1. I will restart your dev server now');
        console.log('2. Then test the admin login');
        console.log('═══════════════════════════════════════\n');
    } else {
        console.log('ℹ️  DATABASE_URL already has all required parameters.\n');
        console.log('The connection issue might be due to:');
        console.log('1. Neon database paused (check Neon dashboard)');
        console.log('2. Network connectivity');
        console.log('3. Try using direct connection (remove -pooler from hostname)\n');
    }

} catch (error) {
    console.error('❌ Error:', error.message);
}
