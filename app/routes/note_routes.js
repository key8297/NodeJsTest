var ObjectID = require('mongodb').ObjectID;
const errorMessage = 'An error has occured';

module.exports = function(app, db) {
  app.get('/notes/test', (req,res) => {
    const result = 'test';
    res.send(result);
  })

  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':errorMessage});
      } else {
        res.send(item);
      }
    });  
  });

  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': errorMessage + err }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete('/notes/:id', (req,res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err,item) => {
      if (err) {
        res.send({ 'error' : errorMessage});
      } else {
        res.send('Note ' + id + ' deleted');
      }
    });
  });

  app.put('/notes/:id', (req,res) => {
    const id = req.params.id;
    const details = { '_id' : new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
        res.send({'error': errorMessage + err})
      } else {
        res.send(note);
      }
    });
  });
};