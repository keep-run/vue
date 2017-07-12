var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Book = mongoose.model('books');//�����ݿⷵ��user����

/* GET home page. */
/*router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});*/

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//��ȡ���е�����
router.get('/getBooks', function (req, res, next) {
    console.log('----------------------get all books--------------------');
    Book.find({}, function (err, docs) {
        if (err) {
            res.end('error');
            return next();
        }
        res.json(docs);
    })
});

//���һ������
router.post('/addBook', function (req, res, next) {
    var book = new Book({
        name: req.body.name,
        author: req.body.author,
        publisher: req.body.publisher
    });
    console.log('----------------------add a book----------------------');
    book.save(function (err, docs) {
        if (!err) {
            res.redirect('/getBooks');
        }
    })
});

//ɾ��ָ��������
router.post('/deleteBook', function (req, res) {
    console.log('----------------------delete a book--------------------');
    var book = req.body;
    Book.remove({_id: book._id}, function (err, docs) {
        if (err) {
            console.log('err:' + err);
        } else {
            console.log('delete succeed��' + docs);
            res.redirect('/getBooks');
        }
    });
});

//��������
router.post('/updateBook',function(req,res){
    console.log('----------------------update a book--------------------');
    var targetBook=req.body;
    Book.update({_id:targetBook._id},{
        name:targetBook.name,
        author:targetBook.author,
        publisher:targetBook.publisher
    },function(err,docs){
        if (err) {
            console.log('err:' + err);
        } else {
            console.log('update succeed' + docs);
            res.redirect('/getBooks');
        }
    })
});
module.exports = router;
