// const fs = require("fs");
// const xml2js = require("xml2js");

// const parser = new xml2js.Parser();

// fs.readFile("data-dictionary.xml", "utf-8", (err, data) => {
//   if (err) {
//     console.error("Error reading XML file:", err);
//     return;
//   }

//   parser.parseString(data, (err, result) => {
//     if (err) {
//       console.error("Error parsing XML:", err);
//       return;
//     }

//     let graphData = { nodes: [], links: [] };
//     const tables = result["data-dictionary"]["table"];

//     let tableIndex = {};

//     tables.forEach((table, index) => {
//       let tableName = table.$.name;
//       graphData.nodes.push({ id: tableName, group: 1 });
//       tableIndex[tableName] = index;

//       if (table["foreign-keys"]) {
//         table["foreign-keys"][0]["foreign-key"].forEach((fk) => {
//           let referenceTable = fk.$["reference-table-name"];
//           fk["fk-columns"][0]["fk-column"].forEach((fkColumn) => {
//             let localColumn = fkColumn["fk-local-column"][0];
//             let refColumn = fkColumn["fk-reference-column"][0];

//             graphData.links.push({
//               source: tableName,
//               target: referenceTable,
//               value: 1,
//               label: `${localColumn} → ${refColumn}`,
//             });
//           });
//         });
//       }
//     });

//     fs.writeFile("data-dictionary.json", JSON.stringify(graphData, null, 2), (err) => {
//       if (err) {
//         console.error("Error writing JSON file:", err);
//         return;
//       }
//       console.log("D3.js data saved as data-dictionary.json");
//     });
//   });
// });



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

    // Initialize Graphviz DOT structure
    let dotOutput = `digraph DatabaseSchema {
  rankdir=LR;
  node [shape=box, style=filled, fillcolor=lightgray, fontname=Arial];

`;

    const tables = result["data-dictionary"]["table"];
    let relationships = [];

    tables.forEach((table) => {
      let tableName = table.$.name;
      let columns = table.columns[0].column.map(col => col.$.name).join("\\n");

      // Add table node with its columns
      dotOutput += `  ${tableName} [label="${tableName}\\n-------------------\\n${columns}"];\n`;

      // Process Foreign Key Relationships
      if (table["foreign-keys"]) {
        table["foreign-keys"][0]["foreign-key"].forEach((fk) => {
          let referenceTable = fk.$["reference-table-name"];

          fk["fk-columns"][0]["fk-column"].forEach((fkColumn) => {
            let localColumn = fkColumn["fk-local-column"][0];
            let refColumn = fkColumn["fk-reference-column"][0];

            relationships.push(`  ${tableName} -> ${referenceTable} [label="${localColumn} → ${refColumn}", fontsize=10];\n`);
          });
        });
      }
    });

    // Append relationships to the DOT file
    dotOutput += "\n" + relationships.join("") + "}\n";

    // Write the DOT file
    fs.writeFile("data-dictionary.dot", dotOutput, (err) => {
      if (err) {
        console.error("Error writing DOT file:", err);
        return;
      }
      console.log("Graphviz file saved as data-dictionary.dot");
    });
  });
});
