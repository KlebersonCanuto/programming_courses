const Comment = require('../controller/commentController');

const create = async (req, res) => {
  try{
    const comment = await Comment.create(req.body);
    res.status(200).send({data: comment});
  } catch(err){
    res.status(400).send();
  }
}

const update = async (req, res) => {
  try{
    const id = req.params.id;
    const comment = await Comment.update(id, req.body);
    res.status(200).send({data: comment});
  } catch(err){
    res.status(400).send();
  }
}

const remove = async (req, res) => {
  try{
    const id = req.params.id;
    const comment = await Comment.remove(id);
    res.status(200).send({data: comment});
  } catch(err){
    res.status(400).send();
  }
}

module.exports = {
  create,
  update,
  remove
};