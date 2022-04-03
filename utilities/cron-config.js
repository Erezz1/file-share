const fs = require('fs');
const cron = require('node-cron');

const cronFn = () => {
    cron.schedule("59 23 * * *", () => {
        let fileUploads = fs.readdirSync(`${ __dirname }/../uploads`);
    
        if ( fileUploads.length > 0 ) {

            fileUploads.forEach( file => {
                fs.unlink(`${ __dirname }/../uploads/${ file }`, ( err ) => {
                    if ( err ) {
                        console.log( err );
                    }
                });
            })
        };
    });
}

module.exports = cronFn;
