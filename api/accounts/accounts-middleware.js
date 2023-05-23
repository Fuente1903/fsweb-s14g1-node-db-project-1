const yup = require('yup');

exports.checkAccountPayload = (req, res, next) => {
  const schema = yup.object().shape({
    name: yup.string().trim().min(3).max(100).required(),
    budget: yup.number().required().positive().lessThan(1000000),
  });

  try {
    schema.validateSync(req.body);
    next();
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.checkAccountNameUnique = (req, res, next) => {
  const { name } = req.body;
  
  if (isAccountNameTaken(name)) {
    return res.status(400).json({ message: "that name is taken" });
  }

  next();
};

exports.checkAccountId = (req, res, next) => {
  const { id } = req.params;

  if (!accountExists(id)) {
    return res.status(404).json({ message: "account not found" });
  }

  next();
};
