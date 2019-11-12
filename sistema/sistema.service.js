const csv = require("csv-parse");
const fs = require('fs');
module.exports = {
    csvParse
};
function csvParse(path, res) {
    return new Promise((res, rej) => {
        let results = [];
        let formateo = [];
        let parcer = csv(
            {
                headers: true,
                delimiter: ',',

            }
        )
        fs.createReadStream(path)
            .pipe(parcer)
            .on('data', (data) => {
                results.push(data);
            })
            .on('error', function(err){
                console.error(err.message)
              })
            .on('end', () => {
                if (results) {
                    let indices = [];
                    results.forEach((current, index, arr) => {
                        if (index == 0) {
                            indices = current.map((i) => {
                                return { key: i }
                            });
                        } else {
                            let objeto = new Object();
                            current.forEach((currentV, indexV) => {
                                objeto[indices[indexV]["key"]] = currentV.toLowerCase();
                            });
                            formateo[index - 1] = objeto;
                        }

                    });
                    fs.unlink(path, (err) => {
                        rej(err);
                    });
                    res({
                        index: indices,
                        data: formateo
                    });
                }
            });
    });
}