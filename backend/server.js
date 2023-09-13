const express = require("express");
const cors = require("cors");
const Corbado = require("@corbado/node-sdk");

const app = express();
const PORT = 3001;
const config = new Corbado.Configuration(
  "pro-503401103218055321",
  "corbado1_RCSsaCrCnTJoDJj2cyVvwQ6BcHey4w"
);
const corbado = new Corbado.SDK(config);
const _ = require("lodash");
const dataGenerator = require("./data");
const data = dataGenerator.generateData();

// Middleware to verify JWT
const verifyJWT = (req, res, next) => {
  corbado.session.getCurrentUser(req).then((user) => {
    if (user.authenticated) {
      req.user = user;
      next();
    } else {
      res
        .status(401)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
  });
};

app.use(cors());

// Route to get mock data (protected)
app.get("/data", verifyJWT, (req, res) => {
  let filteredData = [...data];

  // Filtering
  if (req.query.filter) {
    const filters = JSON.parse(req.query.filter);
    Object.keys(filters).forEach((key) => {
      filteredData = filteredData.filter((item) => item[key] === filters[key]);
    });
  }

  // Sorting
  if (req.query.sortBy) {
    const sortBy = JSON.parse(req.query.sortBy);
    filteredData = _.orderBy(
      filteredData,
      sortBy.map((s) => s.id),
      sortBy.map((s) => (s.desc ? "desc" : "asc"))
    );
  }

  // Pagination
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  res.json(paginatedData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
