const mailTemplate = (title: string, textUnderHeading: string, subHeading: string, text: string) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
        .container 
        {
            padding: 30px;
            background-color: #f5f5f5;
        }
        .header {
            margin-left: 50px;
            margin-bottom: 20px;
            text-align: left;
        }
        .header h1 {
            text-decoration: underline;
        }
        .header i {
            padding-top: 1px;
        }
        .line hr {
            border: 1px solid black;
        }
        .line {
            padding: 5px;
        }
        .subheader {
            margin-top: 10px;
            margin-left: 50px;
            margin-bottom: 5px;
            text-align: left;
        }
        .body {
            margin-left: 50px;
            text-align: left;
        }
        .body pre {
            font-family:Helvetica, Neue, sans-serif;
        }

        </style>
        </head>
        <body>

        <div class="container">
        <div class="header">
        <h1>${title}</h1>
        <i>${textUnderHeading}</i>
        </div>
        
        <div class="line">
        <hr>
        </div>

        <div class="subheader">
        <strong>${subHeading}</strong>
        </div>

        <div class="body">
        <pre>${text}</pre>
        </div>
        </div>

        </body>
        </html>
    `;
}

export default mailTemplate;