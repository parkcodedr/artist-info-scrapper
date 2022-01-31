const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const PORT = process.env.PORT||5000;
const app = express();


axios("https://en.wikipedia.org/wiki/2Baba").then(res=>{
    const htmlData = res.data;
    const $ = cheerio.load(htmlData);
    const articles =[];
    const scrapedData = [];
    const tableHeaders = [];
    const tableRow = {};
        $("table > tbody > tr").each((index,element)=>{
                const ths = $(element).find("th");
                const tds = $(element).find("td");
                if(tds==""){
                    tableHeaders.push(
                        "Artist"
                      );
                }else{
                    tableHeaders.push(
                        $(ths)
                          .text()
                          .toLowerCase()
                      );
                }

              console.log(index);
              if(index==0){
                tableRow[tableHeaders[index]] = $(ths).text();
              }else{
                tableRow[tableHeaders[index]] = $(tds).text();
              }
              
                });
    console.log(tableRow);

}).catch(error=>console.log(error));





app.listen(PORT,()=>{
    console.log('app running');
})
