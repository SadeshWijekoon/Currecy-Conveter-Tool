const express = require('express');
const cors = require('cors'); // importing installed libary by using require function //
const axios = require('axios'); 

const app = express();

// middle wares
app.use(express.json())
app.use(cors())

// all currencies
app.get('/getCurrencies',async(req,res)=>{
   
  const nameURL = 'https://openexchangerates.org/api/currencies.json?app_id=171e57a9e30a4343b74450c653df70c7'

  try{
  const nameResponse = await axios.get(nameURL)
  const nameData = nameResponse.data
   return res.json(nameData)

  }catch(err){
    console.error(err)
  }

})

app.get('/convert',async(req,res)=>{
  const {
    date,
    sourceCurrency,
    targetCurrency,
    amountInSoursecurrency,} = req.query

    try{
      
      const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=171e57a9e30a4343b74450c653df70c7`
      
      const dataRes = await axios.get(dataURL)
      const rates = dataRes.data.rates

      // rates 
      const sourceRate = rates[sourceCurrency]
      const targetRate = rates[targetCurrency]
      
      // final value 
      const targetAmount = (targetRate/sourceRate)* amountInSoursecurrency
       
       
       return res.json(targetAmount.toFixed(2))
    }catch(err){
      console.error(err)
    }

})

// listed to a port 
app.listen(5000,()=>{
    console.log('SERVER STARTED');  
})


