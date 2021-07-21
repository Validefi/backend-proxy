const mysql = require('mysql');
const express = require('express');
const WebSocket = require('ws');
const os = require('os');
const cluster = require('cluster');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const clusterWorkerSize = process.env.CLUSTER_WORKER_SIZE || os.cpus().length;
console.log('Worker Threads Max = ', clusterWorkerSize);

const router = require('./routes');

// if (clusterWorkerSize > 1) {
//     if (cluster.isMaster) {
//         for (let i = 0; i < clusterWorkerSize; i++) {
//             cluster.fork();
//         }

//         cluster.on('exit', function (worker) {
//             console.log('Worker', worker.id, ' has exitted.');
//         });
//     } else {
// const router = express.Router();

const wss = new WebSocket.Server({ port: 5000 });
const port = 8080;
const app = express();
const connection = mysql.createConnection({
    connectionLimit: 100,
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
});

function getSomeTx(limit = 10) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM V1_BSC_TX order by blockint desc LIMIT ?`;
        connection.query(sql, [limit], function (err, results, fields) {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    });
}

// Middleware for bodyparser
app.use(express.json()); // Make sure it comes back as json
app.use(cors());
// To handle CORS error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    next();
});

// Make the connection
connection.connect(function (err) {
    if (err) {
        console.log('connection error', err.stack);
        return;
    }

    console.log(`connected to database`);
    // allowing Route
    try {
        wss.on('connection', (ws) => {
            ws.send(
                JSON.stringify({
                    status: 'connecting',
                    data: 'Connected ~ Accepted your Connection',
                })
            );
            ws.on('message', (message) => {
                console.log(`Received message => ${message}`);
                if (message == 'getData') {
                    getSomeTx()
                        .then((data) => {
                            ws.send(JSON.stringify({ status: true, data }));
                        }) // if successful
                        .catch((err) => {
                            ws.send(JSON.stringify({ status: false, err }));
                        }); // if error
                }
                if (message == 'close') {
                    ws.close();
                }
            });
        });
    } catch (socketerr) {
        console.log(socketerr, 'SOCKET ERR');
    }

    app.get('/classifiedData', (req, res) => {
        return getSomeTx()
            .then((data) => {
                return res.json(data);
            }) // if successful
            .catch((err) => {
                return res.status(500).json(err);
            }); // if error
    });
});

// Independent of DB
app.post('/getNews', (req, res) => {
    console.log('News');
    const { token } = req.headers;
    if (token) {
        if (token == 'VALIDEFI_NEWS_XS345&DS^89212nd') {
            // Replacing by jwt auth later
            axios
                .get(
                    'https://cryptopanic.com/api/v1/posts/?auth_token=4e9c8f5cac351108505dcd6c893154ca40c627c7&public=true'
                )
                .then((response) => {
                    return res.status(200).json({
                        status: true,
                        data: response.data.results,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    return res.status(500).json({
                        status: false,
                        message: 'Service Unavailable',
                    });
                });
        } else {
            return res.status(400).json({
                status: false,
                message: 'Malformed Token, Try again',
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: 'Need Token to access Api',
        });
    }
});

app.post('/getTxAddr', (req, res) => {
    const { token } = req.headers;
    console.log('dd');
    if (token) {
        if (token == 'VALIDEFI_TXS_XS345&DS^89212nd') {
            // Replacing by jwt auth later
            var limit = 10; // default
            var { network, address, limit } = req.body;
            if (!(network && address)) {
                return res.status(400).json({
                    status: false,
                    message: 'Network & Address is Required [Proper Values]',
                });
            } else {
                axios
                    .get(
                        `https://stg-api.unmarshal.io/v1/${network}/address/${address}/transactions?page=1&pageSize=${limit}&auth_key=VGVtcEtleQ%3D%3D`
                    )
                    .then((response) => {
                        return res.status(200).json({
                            status: true,
                            data: response.data.transactions,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        return res.status(500).json({
                            status: false,
                            message: 'Service Unavialable',
                        });
                    });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: 'Malformed Token, Try again',
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: 'Need Token to access Api',
        });
    }
});

app.use(router);

// router.get('/basic',(req,res) => {
//     return res.json("Working")
// })
app.listen(port, () =>
    console.log(
        `Express server listening on port ${port} and worker ${process.pid}`
    )
);
// }
// }
