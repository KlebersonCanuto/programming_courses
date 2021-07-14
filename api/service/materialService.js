const Material = require('../controller/materialController');

const get = async (req, res) => {
  try{
    const id = req.params.id;
    const material = await Material.getById(id);
    res.status(200).send({data: material});
  } catch(err){
    res.status(400).send();
  }
}

const create = async (req, res) => {
  try{
    const material = await Material.create(req.body);
    res.status(200).send({data: material});
  } catch(err){
    res.status(400).send();
  }
}

const update = async (req, res) => {
  try{
    const id = req.params.id;
    const material = await Material.update(id, req.body);
    res.status(200).send({data: material});
  } catch(err){
    res.status(400).send();
  }
}

const remove = async (req, res) => {
  try{
    const id = req.params.id;
    const material = await Material.remove(id);
    res.status(200).send({data: material});
  } catch(err){
    res.status(400).send();
  }
}

module.exports = {
  get,
  create,
  update,
  remove
};