const express = require('express');
const bodyparser = require('body-parser');

const { PORT } = require('./config/serverConfig.js');
const ApiRoutes = require('./routes/index');

// const OCR_Record_Repository = require('./repository/ocr_record_repository.js')
// const OCRService = require('./services/ocr_service.js')

const setupAndStartServer = async () =>{

    // create the express object
    const app = express();

    // middlewares
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended : true}));

    app.use('/api', ApiRoutes);

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.listen(PORT, ()=>{
        console.log(`Started server at ${PORT}`);


        // const repo = new OCR_Record_Repository();
        // repo.createRecord("Pratik", "Sarkate", '100','2002-04-22', "2023-12-05", "2030-01-01");
        // repo.deleteRecord(116);
        // repo.getRecord(11116);
        // repo.updateRecord("Pratik", "S", '116','2002-04-22', "2023-12-05", "2030-01-01")
        // console.log(OCRService)
    }
    );
}

setupAndStartServer();