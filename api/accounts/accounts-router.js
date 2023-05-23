const express = require('express');
const router = express.Router();

const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require('./accounts-middleware');

function getAccounts() {
  return [];
}

function getAccountById(id) {
  return null;
}

function createAccount(account) {
  return account;
}

function updateAccount(id, account) {
  return account;
}

function deleteAccount(id) {
  return null;
}

router.get('/', (req, res, next) => {
  const accounts = getAccounts();
  res.json(accounts);
});

router.get('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params;
  const account = getAccountById(id);

  if (!account) {
    return res.status(404).json({ message: 'Account not found' });
  }

  res.json(account);
});

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  const accountData = req.body;
  const createdAccount = createAccount(accountData);
  res.status(201).json(createdAccount);
});

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  const { id } = req.params;
  const accountData = req.body;
  const updatedAccount = updateAccount(id, accountData);
  res.json(updatedAccount);
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params;
  const deletedAccount = deleteAccount(id);
  res.json(deletedAccount);
});

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

module.exports = router;
