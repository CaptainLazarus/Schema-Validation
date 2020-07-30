const Ajv = require('ajv');
const express = require('express');
const bodyParser = require('body-parser');

const ajv = new Ajv({ allErrors: true });

app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const schema = { 
    "type": "object",
    "required": [
        "hello"
    ],
    "properties": {
      "hello": { "type": "string" },
    },
    "minProperties": 1,
    "maxProperties": 3
    // "additionalProperties": {
    //     "type": "string",
    // }
};

const test = ajv.compile(schema);

function verify(obj) {
    const isValid = test(obj);
    return isValid ? {type:'0' , obj: obj} : {type:'1' , errors: test.errors}
}

app.listen(3000 , () => {
    console.log('Server Listening');
});

app.post('/' , (req , res) => {
    console.log(req.body);
    // console.log(verify(req.body));
    output = verify(req.body);
    // res.send(output.errors);
    if(output.type==1){
        var s = ' ';
        for(i=0 ; i < (output.errors.length) ; i+=1){
            s = s + output.errors[i].message + '\n';
        }
        res.send(s);
    }
    else{
        res.send(output.obj);
    }
});