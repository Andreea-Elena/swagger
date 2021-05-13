const AutomobileService=require("../service/AutomobileService");


const getAllDataCsv = async(req, res, next)=>{
    AutomobileService.getAllDataCsv(req, res, next)
}

module.exports={
    getAllDataCsv
}