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

    let dotOutput = "digraph DatabaseSchema {\n  rankdir=LR;\n  node [shape=box, style=filled, fillcolor=lightgray];\n\n";
    const tables = result["data-dictionary"]["table"];
    
    let relationships = [];

    tables.forEach((table) => {
      let tableName = table.$.name;
      let columns = table.columns[0].column.map(col => col.$.name).join("\\n");

      dotOutput += `  ${tableName} [label="${tableName}\\n-------------------\\n${columns}"];\n`;

      if (table["foreign-keys"]) {
        table["foreign-keys"][0]["foreign-key"].forEach((fk) => {
          let referenceTable = fk.$["reference-table-name"];
          fk["fk-columns"][0]["fk-column"].forEach((fkColumn) => {
            let localColumn = fkColumn["fk-local-column"][0];
            let refColumn = fkColumn["fk-reference-column"][0];

            relationships.push(`  ${tableName} -> ${referenceTable} [label="${localColumn} → ${refColumn}"];\n`);
          });
        });
      }
    });

    dotOutput += "\n" + relationships.join("") + "}\n";

    fs.writeFile("data-dictionary.dot", dotOutput, (err) => {
      if (err) {
        console.error("Error writing DOT file:", err);
        return;
      }
      console.log("Graphviz file saved as data-dictionary.dot");
    });
  });
});
