import Table from "../../lib/Table";

export default function handler(req, res) {
  const x = req.body.arrayX;
  const y = req.body.arrayY;

  const table1 = new Table(x, y);
  const result = table1.getAll();

  res.status(200).json(result);
}
