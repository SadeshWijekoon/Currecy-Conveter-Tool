import React, { useEffect, useState } from 'react'
import axios from 'axios';



const MainPage = () => {

    const [date,setdate]=useState(null)
    const [sourceCurrency,setSourceCurrency]=useState('')
    const [targetCurrency,settargetCurrency]=useState('')
    const [amountInSoursecurrency,setAmountInSoursecurrency] = useState(0)
    const [amountInTargetcurrency,setAmountIntargetcurrency] = useState(0)
    const [currencyNames,setCurrencyNames]=useState([])
    const[loading,setLoading] = useState(true)
    // console.log(date);
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
           const response = await axios.get('http://localhost:5000/convert',{params:{
             date,
             sourceCurrency,
             targetCurrency,
             amountInSoursecurrency
           }})
            setAmountIntargetcurrency(response.data)
            setLoading(false)

        }catch(err){
          console.error(err)
        }
    }

    // get the currancy name  from the api 
    useEffect(()=>{
      const getCurrancyNames = async()=>{
        try{
         
           const res = await axios.get(
            'http://localhost:5000/getCurrencies'
           )
           setCurrencyNames(res.data)

        }catch(err){
          console.error(err)
        }
        
      }
      getCurrancyNames()
    },[])
    
  return (
    <div>
       <h1 className='lg:mx-32 text-5xl font-semibold text-yellow-600'>Convert Your Currencies Today</h1> 
       <p className='lg:mx-32 opacity-40 py-6'>Welcome to "Convert Your Currencies Today"! This application allows you
        to easily convert currencies based on the latest exchange rates. Whether
        you're planning a trip, managing your finances, or simply curious about
        the value of your money in different currencies, this tool is here to
        help.</p>
        <div className='mt-5 flex items-center justify-center flex-col'>
            <section className='w-full lg:w-1/2'>
                <form onSubmit={handleSubmit}>
                   
                   <div className="mb-4">
                        <label htmlFor={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Date</label>
                        <input 
                        onChange={(e)=>setdate(e.target.value)}
                        type="date" 
                        id={date} 
                        name={date}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-600 focus:border-yellow-600block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-600 dark:focus:border-yellow-600"  
                        required />
                    </div>
                   <div className="mb-4">
                        <label htmlFor={sourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Source Currency</label>
                        <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-600 focus:ring-border-yellow-800block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-600 dark:focus:border-yellow-600' 
                        name={sourceCurrency} 
                        id={sourceCurrency}
                        value={sourceCurrency}
                        onChange={(e)=>setSourceCurrency(e.target.value)}>
                           <option value=''>Select The Source Currency</option>
                           {Object.keys(currencyNames).map((currency)=>(
                            <option className='p-1' key={currency} value={currency}>
                              {currencyNames[currency]}
                            </option>))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor={targetCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            target Currency</label>
                        <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-600 dark:focus:border-yellow-600' 
                        name={targetCurrency} 
                        id={targetCurrency}
                        value={targetCurrency}
                        onChange={(e)=>settargetCurrency(e.target.value)}>
                           <option value=''>Select Target Currency</option>
                           {Object.keys(currencyNames).map((currency)=>(
                            <option className='p-1' key={currency} value={currency}>
                              {currencyNames[currency]}
                            </option>))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor={amountInSoursecurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                           Amount in sourse currency </label>
                        <input 
                        type="text" 
                        id={amountInSoursecurrency} 
                        name={amountInSoursecurrency}
                        onChange={(e)=>setAmountInSoursecurrency(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-600 dark:focus:border-yellow-600" 
                        placeholder="Amount in sourse currency " 
                        required />
                    </div>
                    <button  className='bg-yellow-600 hover:bg-yellow-300 text-white font-semibold py-2 px-4 rounded-md'>Get the target currency</button>

                   
                </form>
            </section>
        </div>
        {loading?null:<section className='lg:mx-72  mt-5 text-xl'>
        {amountInSoursecurrency} {currencyNames[sourceCurrency]} is equal to {''}
        <span className='text-yellow-500 font-semibold'>{amountInTargetcurrency} </span> {currencyNames[targetCurrency]}
        </section>}
        
        
    </div>
  )
}

export default MainPage;