import config from '../utils/config';

const wavesSvg = `
<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='85' fill='#ffffff'>
  <defs>
    <pattern id='korosBasic' x='0' y='0' width='106' height='85' patternUnits='userSpaceOnUse'>
      <path transform='scale(5.3)' d='M0,800h20V0c-4.9,0-5,2.6-9.9,2.6S5,0,0,0V800z' />
    </pattern>
  </defs>
  <rect width='100%' height='30' fill='url(#korosBasic)' />
</svg>
`;

const mailTemplate = (text: string) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
        .container 
        {
            background-color: #00005E;
            
        }
        .header {
            text-align: center;
            margin-top: -60px;
            padding-bottom: 5px;
        }
        .header h1 {
            color: #ffffff;
            font-family:Helvetica, Neue, sans-serif;
            font-weight: 500;
            font-size: large;
        }
        .wave {
            transform: rotate(180deg);
            /*position: relative;*/
            /*upper: 40px;*/
            /*margin-bottom: -70px;*/
        }
        .body {
            padding-top: 5px;
            padding-bottom: 5px;
            background-color: #ffffff;
            text-align: left;
        }
        .body pre {
            font-family:Helvetica, Neue, sans-serif;
            background-color: #ffffff;
            font-size: medium;
            word-wrap: break-word;
            white-space: pre-line;
        }
        .logo {
          padding-top: 20px;
        }
        
        .logo img {

        }
        
        .logo h1 {
          font-size: 12px;

        }

        </style>

        </head>
        <body>

        <div class="container">
        
        <div class="body">
        <pre>${text}</pre>
        </div>

        <div class="header">
        <div class="wave">
        ${wavesSvg}
        </div>
        
        <div class="logo">
         <img src=${config.APP_URL}/Helsinki_white_logo.png alt="Helsinki Logo" width="60px"/> 
         <h1>OsTu</h1>
        </div>
        
        </div>

        </div>

        </body>
        </html>
    `;
}

export default mailTemplate;