const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path/posix");
const superagent = require("superagent");

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, res) => {
            if (err) return reject("Couldn't process file");
            resolve(res);
        })
    })
}

const fileWritePro = data =>  {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${__dirname}/dog-img.txt`, data, err => {
            if (err) return reject(err.message);
            console.log(data)
            resolve(data);
        })
    })
}

const getDogPic = async () => {
    try{
        const data = await readFilePro(`${__dirname}/dog.txt`);

        const imageUrl = await superagent.get(`https://api.thedogapi.com/v1/images/${data}`);

        await fileWritePro(imageUrl._body.url);
        console.log("Random image url has been written to file");
    }
    catch(err){
        console(err)
        throw err;
    }
    return '2: READY dog';
}

(async () => {
    try{
        console.log("1. Will get dog");
        const x = await getDogPic();
        console.log(x);
        console.log("Done getting dog");
    }
    catch(err){
        console.log("Error")
    }
})()


// console.log("1: WIll get dog");
// getDogPic().then(x => {
//     console.log(x);
//     console.log("3: Done getting dog");
// })
// .catch(err => {
//     console.log("Error")
// })

// readFilePro(`${__dirname}/dog.txt`)
// .then(data =>{ 
// return superagent.get(`https://api.thedogapi.com/v1/images/${data}`)
// })
// .then(res => {
//     return fileWritePro(res._body.url);
// })
// .then(() => {
//     console.log("Random image has been written to file");
// })
// .catch(err => {
//     console.log(err);
// })

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(res => {
//         console.log(res.body.message);

//         fs.writeFile('dog-img.txt', res.body.message, err =>{
//             if(err) return console.log(err.message);
//             console.log("Random dog image saved!");
  
//     })
//     .cathc(err => {
//      return console.log(err.message);
//     })
// })
// });
