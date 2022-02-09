const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');
const slugify = require('slugify');

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8")
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8")
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8")

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map(ele => slugify(ele.productName, {lower: true}));
console.log(slugs);
// const replaceTemplate = 
// fs.readFile(`${__dirname}/data.json`, {encoding:'utf-8'}, (err, data) => {
        //     res.end(data);
        // });

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview'){

        const cardsHtml = dataObj.map(ele => replaceTemplate(tempCard, ele)).join('');
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml)
        
        res.writeHead(200, {"Content-type": "text/html"});
        res.end(output);
    }
    else if(pathName.includes('/product')){
        const queryObj = url.parse(pathName, true).query;

        const productHtml = replaceTemplate(tempProduct, dataObj[queryObj.id]);
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, productHtml);

        res.writeHead(200 ,{"Content-type": "text/html"});
        res.end(output);
    }
    else if(pathName === '/api'){
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(data);
    }
    else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end("<h1>Page not found!</h1>");
    }
});

server.listen(8000, '127.0.0.1', (e)=>{
    console.log("Listening on port 8000");
    
});
