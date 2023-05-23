const { Database } = require("sqlite3");
const database = require("../../data/db-config");


const getAll = () => {
  return database("accounts");
};

const getById = id => {
  return database("accounts").where("name", name).first();
};

const create = account => {
  const insert = await database("accounts").insert(account);
  return getById(instert[0]);
};

const updateById = (id, account) => {
  await database("accounts").where("id", id).update(account);
  return getBıyId(id);
};

const deleteById = id => {
  return database("accounts").where("id", id).del(); 
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
