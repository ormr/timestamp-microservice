import * as express from 'express';
import * as cors from 'cors';

const app: express.Application = express();
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get('/api/timestamp/:date?', (req, res) => {
  const { date } = req.params;

  if (!date) {
    return res.json({
      unix: Date.now(),
      utc: new Date().toUTCString()
    })
  }
  // if date in yyyy-mm-dd format then transform to number
  const formattedDate = isNaN(+date) ? +(new Date(date)) : +date;

  const unix = formattedDate
  const utc = new Date(formattedDate).toUTCString();

  if (!unix || !utc || utc === 'Invalid Date') {
    return res.json({
      error: 'Invalid Date'
    });
  }

  return res.json({
    unix,
    utc
  });
});

const PORT = 9000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`[app]: Server started on http://localhost:${PORT}`);
});