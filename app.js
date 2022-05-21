const axios=require('axios');
const cheerio=require('cheerio');
const express=require('express');

async function getPharmacies (lon,lat){
    try {
        // const siteUrl=`https://www.vrisko.gr/en/pharmacy-duties/near-me/?lon=${lon}&lat=${lat}`;
        const siteUrl='https://www.vrisko.gr/efimeries-farmakeion/thessaloniki/'
        const res=await axios({
            method:"PUT",
            url:siteUrl,
            headers:{
                'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36'}
    })

    const $ = cheerio.load(res.data,{ignoreWhitespace:true});
    const elemSelector='#results-container > div';
       
    
    const titlelist=[];
    const onDutyHourslist=[];
    const vicinitylist=[];
    const onDutyNowlist=[];
    const phonelist=[];


    $(elemSelector).each((parentIdx,parentElem)=>{
            const phone=$(parentElem).find(' div.duty-container-btn > div > table > tbody > tr > td > a > div > div').html();
            const title=$(parentElem).find('  table > tbody > tr > td > div > a > strong').text();
            const onDutyHours=$(parentElem).find('   div.duty-container-hours > div > span.firstTime').text().trim();
            const vicinity=$(parentElem).find(' div.duty-container-left > span').text();
            const onDutyNow=$(parentElem).find('  table > tbody > tr > td > div > div.DutyActive > span').text();

           
            if(phone){
                phonelist.push(phone)
            }
            if(title){
                titlelist.push(title)
            }
            if(onDutyHours){
                onDutyHourslist.push(onDutyHours)
            }
            if(vicinity){
                vicinitylist.push(vicinity)
            }
            if(onDutyNow){
                onDutyNowlist.push(true)
            }else{onDutyNowlist.push(false)}
        
    })

    let results=[];

    for(let i=0;i<=titlelist.length-1;i++){
        results.push({'title':titlelist[i],'phone':phonelist[i],'onDutyHours':onDutyHourslist[i],'vicinity':vicinitylist[i],'onDutyNow':titlelist.length<1?onDutyNowlist[i]:i<2?onDutyNowlist[i]:onDutyNowlist[i+1]})
    }
    return res.data;    
    
    } catch (error) {
        console.error(error)
    }
}


const app=express();

app.get('/',(req,res)=>{
    res.send("hello world");
})

app.get('/api/pharmacy-duties',async (req,res)=>{
    try{
        const lon=req.query.lon;
        const lat=req.query.lat;
        const pharmacies=await getPharmacies(lon,lat)
        return res.status(200).json({
            result:pharmacies
        })
    }catch(err){
        return res.status(500).json({
            err:err.toString(),
        })
    }
})

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})




