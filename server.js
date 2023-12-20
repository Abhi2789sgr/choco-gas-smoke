const express = require('express');
const app = express();
const fs = require('fs');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'content-type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// app.get('/services/api/utkalelectronics',(req,res)=>{
//     res.json({msg:'server test succesfull'});
// });

//gas value
app.get('/api/bivi/begb05/',(req,res)=>{
        fs.readFile('gas.json',
            // callback function that is called when reading file is done
            function(err, data) { 

                if(err){
                    return res.status(400).json(err);
                    console.log(err);
                }
                // json data
                var jsonData = data;
         
                // parse json
                var jsonParsed = JSON.parse(jsonData);
         
               res.send(jsonParsed);
               fs.unlink('gas.json',function(err){

             if(err){
                 return res.status(400).json(err);
             }
             // console.log("-> Gas data Deleted.  ")
            });
        });

    });
        
app.get('/api/biva/besb01/',(req,res)=>{
        fs.readFile('smoke.json',
         // callback function that is called when reading file is done
         function(err, data) { 

             if(err){
                 return res.status(400).json(err);
             }
             // json data
            var jsonData = data;
            var jsonParsed = JSON.parse(jsonData);
            res.send(jsonParsed);

            //delete file after data retrieved once
            fs.unlink('smoke.json',function(err){

             if(err){
                 return res.status(400).json(err);
             }
             // console.log("-> Smoke data Deleted.  ")
            });
        }); 
});

const port = 8190;
app.listen(port, () => console.log(`server running on port ${port}`));
