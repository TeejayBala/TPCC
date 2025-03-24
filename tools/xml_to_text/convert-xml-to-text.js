const fs = require('fs');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

// Read XML File
fs.readFile('data-dictionary.xml', 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading XML file:', err);
        return;
    }

    // Parse XML
    parser.parseString(data, (err, result) => {
        if (err) {
            console.error('Error parsing XML:', err);
            return;
        }

        // Extract tables
        let output = 'Data Dictionary:\n\n';
        const tables = result['data-dictionary']['table'];
        
        tables.forEach(table => {
            output += `Table: ${table.$.name}\n`;
            output += `Description: ${table.description ? table.description[0] : 'N/A'}\n`;
            output += 'Columns:\n';

            table.columns[0].column.forEach(column => {
                output += `  - ${column.$.name}\n`;
                output += `    Type: ${column['data-type'][0]}\n`;
                output += `    Max Size: ${column['max-size'] ? column['max-size'][0] : 'N/A'}\n`;
                output += `    Nullable: ${column.nullable ? column.nullable[0] : 'N/A'}\n`;
                output += `    Description: ${column.description ? column.description[0] : 'N/A'}\n\n`;
            });

            output += '--------------------------\n';
        });

        // Save to text file
        fs.writeFile('data-dictionary.txt', output, (err) => {
            if (err) {
                console.error('Error writing text file:', err);
                return;
            }
            console.log('Data dictionary saved as data-dictionary.txt');
        });
    });
});