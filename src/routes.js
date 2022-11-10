const express = require('express');
/*const parser = require ('mongo-parse')*/
const router = express.Router();
const feed = require('./models/feed');

/********************************/
/*           Routes             */
/********************************/

/**
 * Homepage where all routes are shown
 */
router.get('/', async (req, res) => {
  console.log('/ route called');

  /*const tekst = parser.parse(await feed.find());*/
  const feeds = JSON.parse(JSON.stringify(await feed.find().sort({"datum":-1})));
  var body = "";
  for(var i=0 ;i<feeds.length;i++){  
    
    const [jaar, maand, dag] = feeds[i].datum.split('-');
    const dagl = dag.length;

    const ndag=dag.substring(0,dagl-14);
   
    body = body + '<H3>' + feeds[i].titel + '</h3>' + ndag + "-" + maand + "-" + jaar + '<p>' + feeds[i].inhoud + '<a href=' + feeds[i].link + '>Meer lezen</a>' + '</p><hr>';
  } 
  res.send('<html> <h1 align=center>IT Topics - newsfeed</h1>  <h2></h2> '
  +'<hr/>'
  +body
  +'</html>'
  );
});

router.post('/', async (req, res) => {
  console.log('/feed/create route called');
  try {
    res.send(await feed.create(req.body));
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});

 router.get('/:id', async (req, res) => {
  console.log('/feed/:id route called');
  try {
    res.send(await feed.findById(req.params.id));
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});

 router.put('/:id', async (req, res) => {
  console.log('/feed/update/:id route called');
  try {
    res.send(await feed.findByIdAndUpdate(req.params.id, { $set: req.body }));
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});

 router.delete('/:id', async (req, res) => {
  console.log('/feed/delete/:id route called');
  try {
    res.send(await feed.findByIdAndDelete(req.params.id));
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;