const mysql = require("mysql") //npm包


//use 数据库
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "walletProject",
  port: 3306
})



//db.query可以操作mysql中curd , 所以封装promise的返回
db._query = function (sql, prepare = []) {
  return new Promise(resolve => {
    db.query(sql, prepare, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        console.log(err)
      }
    })
  })
}

module.exports = db  