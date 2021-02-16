const mysql = require('mysql');

const connection = mysql.createConnection({
  password: '',
  user: 'root',
  database: 'news',
  host: 'localhost',
  port: '3306',
});

connection.connect();

let newsdb = {};

newsdb.getAll = (params) => {
  return new Promise((resolve,reject)=>{
    connection.query("SELECT * FROM newstab order by "+params.orderBy+" "+params.order+" limit ? offset ? ",[params.limit,params.offset],(err,res)=>{
      err ? reject(err) : resolve(res);
    });
  });
};

newsdb.getArticle = (id) => {
  return new Promise((resolve,reject)=>{
    connection.query("SELECT * FROM newstab where id = ?",[id],(err,res)=>{
      err ? reject(err) : resolve(res[0]);
    });
  });
};

newsdb.getOne=(position)=>{
  return new Promise((resolve,reject)=>{
    connection.query("SELECT * FROM newstab order by date "+position +" limit 1",(err,res)=>{
      err ? reject(err) : resolve(res[0]);
    });
  });
}

newsdb.count=()=>{
  return new Promise((resolve,reject)=>{
    connection.query("SELECT count(*) as number FROM newstab ",(err,res)=>{
      err ? reject(err) : resolve(res[0]);
    });
  });
}

newsdb.count=()=>{
  return new Promise((resolve,reject)=>{
    connection.query("SELECT count(*) as number FROM newstab ",(err,res)=>{
      err ? reject(err) : resolve(res[0]);
    });
  });
}

newsdb.addNews = (news) => {
  return new Promise((resolve,reject)=>{
  connection.query('INSERT INTO newstab SET ?', news, (err, res) => {
    if(err) resolve(err)
    else {
      connection.query('select * from newstab where id = '+res.insertId,(er,re)=>{
        er ? reject(er) : resolve(re[0])
      });
    }
  });
});
};

newsdb.updateNews = (news,id) => {
  return new Promise((resolve,reject)=>{
  connection.query('UPDATE newstab SET ? where id = '+id, news, (err, res) => {
    err ? reject(err) : resolve(res);
  });
});
};

newsdb.deleteNews = (id) => {
  return new Promise((resolve,reject)=>{
  connection.query('DELETE FROM newstab where id = ?', id, (err, res) => {
    err ? reject(err) : resolve(res);
  });
});
};
module.exports = newsdb;
