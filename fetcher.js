const info = process.argv.slice(2);
const readline = require("readline");
const fs = require("fs");
const request = require("request");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

if (info[1]) {
  rl.question(
    "This file already exists\n type 'Y + enter' to overwrite the file or 'E' to exit\n",
    (answer) => {
      if (answer === "Y") {
        const result = request(info[0], (error, response, body) => {
          //console.log("Writing...");
          fs.writeFile(info[1], body, "utf8", (error) => {
            // CHANGE: Pass data into callback instead of returning it directly

            if (error) console.log(error);
            console.log(
              `Downloaded and saved ${body.length} bytes to ${info[1]}`
            );
          });
        });
      } else if (answer === "E") {
        rl.close();
      }
    }
  );
}
