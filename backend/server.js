// this file was required to get the unit test to run.
const app = require('./app');
const port = process.env.PORT || 54321;

app.listen(port, () => console.log(`app listening on port ${port}`));