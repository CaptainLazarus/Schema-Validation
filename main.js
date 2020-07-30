const Ajv = require('ajv');
const express = require('express');
const bodyParser = require('body-parser');
app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ajv = new Ajv({ allErrors: true });


const schema = require('./schema_storage');
class Verify{
    verifySchema(obj , schemaType) {
        const test = ajv.compile(schema[schemaType]);
        const isValid = test(obj);
        var output = isValid ? {type:'0' , obj: obj} : {type:'1' , errors: test.errors}
        if(output.type==1){
            var s = ' ';
            for(var i=0 ; i < (output.errors.length) ; i+=1){
                s = s + output.errors[i].message + '\n';
            }
            return s;
        }
        else{
            return output.obj;
        }
    }
}


app.listen(3000 , () => {
    console.log('Server Listening');
});

app.post('/' , (req , res) => {
    console.log(req.body);
    var v = new Verify();
    // schemaType = 'sms';
    // console.log(schema['sms']);
    res.send(v.verifySchema(req.body , 'sms'));
});