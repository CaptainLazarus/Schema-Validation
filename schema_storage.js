module.exports = {
    "email": { 
        "type": "object",
        "required": [
            "email",
            "subject",
            "html"
        ],
        "properties": {
          "email": { "type": "string" },
          "subject": { "type": "string" },
          "html": { "type": "string" },
        },
        // "minProperties": 3,
        // "maxProperties": 3
    } , 
    "sms": { 
        "type": "object",
        "required": [
            "number",
            "message"
        ],
        "properties": {
          "number": { "type": "string" },
          "message": { "type": "string" },
        },
        // "minProperties": 3,
        "maxProperties": 3
    } ,
}