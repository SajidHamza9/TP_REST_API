const db = require('../db/dbManager');
const newsModal = require('../Model/newsModal').newsModal;


exports.checkArticle=(req,res,next,id)=>{
        db.getArticle(id)
        .then(article=> {
            if(article){
                res.article=article;
                next()
            }else{
                res.status(404).json({msg: 'ressource not found'})
            }
        })
        .catch(err =>res.status(500).json(err))
}

exports.checkParams=(req,res,next)=>{
    let params={limit: 5, offset: 0, order : 'desc',orderBy:'date'}
    if(req.query.sort){
        if(req.query.sort.toLowerCase()==='date desc') {
            // next()
        }
        else 
        switch(req.query.sort.toLowerCase()){
            case 'date asc': 
                params.order='asc'
            break;
            case 'title asc':
                params.orderBy='title'
                params.order='asc'
            break;
            case 'title desc':
                params.orderBy='title'
            break;
            default:
                res.status(400).json({msg: 'bad value for sorting'});
                return;
        }
           
    }
    if(req.query.limit && req.query.offset){
        if(req.query.limit>0 && req.query.offset>=0) {
            params.limit=Number(req.query.limit);
            params.offset=Number(req.query.offset);
            // next();
        }
        else {
            res.status(400).json({msg: 'bad values of pagination'});
            return;
        }
    }
    req.params=params;
    next()
    
}

exports.checkData=(req, res, next) =>{
    if (req.body.title && req.body.content) {
      next();
    } else {
      res.status(400).json({ msg: "bad data on payload" });
    }
}

exports.getNews = (req, res) => {
    
    db.count().then(number=>{
        const previous= req.params.offset==0 ? null:  req.params.offset-req.params.limit;
        const nextO=req.params.limit+req.params.offset;
        metadata={
            pagination : {offset : req.params.offset,
            limit : req.params.limit,
            nextOffset : nextO>= number.number ? null : nextO,
            previousOffset :previous<0 ? 0 : previous,
            totalCount : number.number},
        
            sortedBy : {
                field : req.params.orderBy,
                order : req.params.order
            }
        }
        db.getAll(req.params)
        .then(list=>{
            let response={}
            response.items=list;
            response.metadata=metadata;
            res.status(200).json(response)
        })
        .catch(err=> res.status(500).json(err))
    })

        
    
};

exports.getArticle = (req, res, next) => {
    res.status(200).json(res.article);
};

exports.getFirst=(req,res,next)=>{
    db.getOne('desc')
    .then(list=>{
        res.status(200).json(list)
    })
    .catch(err=> res.status(500).json(err))
}

exports.getLast=(req,res,next)=>{
    db.getOne('asc')
    .then(last=>{
        res.status(200).json(last)
    })
    .catch(err=> res.status(500).json(err))
}

exports.getFirst=(req,res,next)=>{
    db.getOne('desc')
    .then(first=>{
        res.status(200).json(first)
    })
    .catch(err=> res.status(500).json(err))
}

exports.getNumber=(req,res,next)=>{
    db.count()
    .then(number=>{
        res.status(200).json(number)
    })
    .catch(err=> res.status(500).json(err))
}

exports.postNews = (req, res, next) => {
    db.addNews(req.body)
    .then(doc=>{
        res.status(201).json(doc)
    })
    .catch(err=> res.status(500).json(err))
};

exports.updateNews = (req, res, next) => {
    db.updateNews(req.body,res.article.id)
    .then(doc=>{
        // what to send ??
        res.status(200).json()
    })
    .catch(err=> res.status(500).json(err))
};

exports.deleteNews = (req, res, next) => {
    db.deleteNews(res.article.id)
    .then(doc=>{
        res.status(204).send()
    })
    .catch(err=> res.status(500).json(err))
};