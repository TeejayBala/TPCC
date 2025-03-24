const fs = require("fs");
const xml2js = require("xml2js");

const parser = new xml2js.Parser();

fs.readFile("data-dictionary.xml", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading XML file:", err);
    return;
  }

  parser.parseString(data, (err, result) => {
    if (err) {
      console.error("Error parsing XML:", err);
      return;
    }

    let jsonOutput = { nodes: [], links: [] };
    const tables = result["data-dictionary"]["table"];

    tables.forEach((table) => {
      let tableName = table.$.name;
      let columns = [];

      // Check if the table has columns
      if (table.columns && table.columns[0].column) {
        columns = table.columns[0].column.map(col => col.$.name);
      }

      // Add table node with its columns
      jsonOutput.nodes.push({
        id: tableName,
        columns: columns,
      });

      // Process Foreign Key Relationships
      if (table["foreign-keys"]) {
        table["foreign-keys"][0]["foreign-key"].forEach((fk) => {
          let referenceTable = fk.$["reference-table-name"];

          fk["fk-columns"][0]["fk-column"].forEach((fkColumn) => {
            let localColumn = fkColumn["fk-local-column"][0];
            let refColumn = fkColumn["fk-reference-column"][0];

            jsonOutput.links.push({
              source: tableName,
              target: referenceTable,
              relationship: `${localColumn} → ${refColumn}`,
            });
          });
        });
      }
    });

    // Write the JSON file
    fs.writeFile("data-dictionary.json", JSON.stringify(jsonOutput, null, 2), (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
        return;
      }
      console.log("JSON file saved as data-dictionary.json");
    });
  });
});
