const {detectText} = require("../services/index");
const {OCRService} = require("../services/index");

const ocrService = new OCRService();

// use a POST -> process using Cloud Vision
const upload = async (req, res) => {
    try {
        const result = await detectText("https://pbs.twimg.com/media/FkcR718VEAAMEtL.jpg:large");
        const ocr = await ocrService.createRecord(result.name, result.lastname, result.identity_num, result.dob, result.issue_date, result.expiry_date);
        
        return res.status(201).json({
            data: ocr,
            success: true,
            message: "Successfully processed and added a record",
            err: {}
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Error in text detection service",
            err: error
        });
    }
};

module.exports = {
    upload
};