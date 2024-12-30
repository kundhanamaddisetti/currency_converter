const express = require('express');
const app= express();
const axios = require('axios');
const bp = require('body-parser');
const port=3001;
app.use(bp.json());
app.use(bp.urlencoded({extended:false}));
const ejs = require('ejs');
app.set("view engine","ejs");
const url="http://api.exchangeratesapi.io/v1/latest?access_key=34fe87dcdea192209939c74ba2446e07&format=1";
let data;
app.get("/",(req,res)=>{
  res.render('index',{r:null,rates:data.rates});
});
axios.get(url).then(response=>{
  data=response.data;
  console.log(data);
});
app.post('/index',(req,res)=>{
  const a = req.body.value1;
  const d1 = req.body.d1;
  const d2 = req.body.d2;
  const r1 = data.rates[d1];
  const r2 = data.rates[d2];
  const r = (r2/r1)*a;
  const rates = data.rates;
  res.render('index',{r:r,rates:data.rates});
  console.log(r);
})

app.listen(port,()=>{
  console.log('server started');
});