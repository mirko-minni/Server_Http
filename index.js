const http = require('http'); //Modulo core

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    switch(req.method){ //SWITCH PER I METODI CLIENT-SERVER
        case 'GET':
            switch(req.url){ //SWITCH PER L'INVIO DELLE INFORMAZIONI
                case '/':
                    res.end('Benvenuto nel Server HTTP. \n');
                break;
                case '/about':
                    res.end('Informazioni sull\'applicazione. \n')
                break;
                default:
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.end('Page not found');
                break;
            }
        case 'POST':
            switch(req.url){
                case '/api':
                    let body = ' ';
                    req.on('data', (data)=>{
                        body += data;
                    });
                    req.on('end', ()=>{
                        res.end(`Dati ricevuti: ${body}`); //PREPARAZIONE DI RISPOSTA ALLA RICHIESTA
                    })
                break;
                default:
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.end('Page not found');
                break;
            }
        default: //CASO IN CUI NON CI SIA UN METODO NOTO
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Method not supported');
        break;
    }
});

const port = 3000;
server.listen(port, ()=>{
    console.log(`Server is listening on port`, port);
});
