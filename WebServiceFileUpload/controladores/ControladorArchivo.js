var mysql = require('mysql');
var config = require('.././database/database.js');

module.exports = {

    guardarArchivo: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var nombre = req.body.filename;
        var archivo = req.body.value;
        var tipo_archivo = req.body.filetype;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("INSERT INTO `archivos` (`nombre`, `archivo` , `tipoArchivo`) VALUES ('"+nombre+"', '"+archivo+"', '"+tipo_archivo+"')", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);

            }
        });

    },

    listarAchivos: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT archivos.id, archivos.nombre FROM archivos", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);

            }
        });

    },

    listarAchivosPorCodigo: function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var id = req.query.id;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT archivos.nombre, archivos.archivo, archivos.tipoArchivo FROM archivos WHERE id = "+id+" ", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
            } else {
                db.end();
                res.send(rows);
            }   
        });

    },
}
