const fs = require('fs');
const readFileData = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if(err){
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}
async function init() {
    try{
        const data1 = await readFileData('./data222.json');
        console.log(JSON.parse(data1));
        const data2 = await readFileData('./data2.json');
        console.log(JSON.parse(data2));
    }catch(err) {
        console.log(err);
    }
}
init();