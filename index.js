const express = require('express')
const morgan = require('morgan');
const app = express()
const cors = require('cors')

app.use(cors())
morgan.token('body', (req) => JSON.stringify(req.body));


app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));



let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!!!!!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const date = new Date();
  const info = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `;

  response.send(info);
});


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});


app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({ error: 'The name or number is missing' });
  }

  const duplicate = persons.find(person => person.name === name);
  if (duplicate) {
    return response.status(400).json({ error: 'name must be unique' });
  }

  const id = Math.floor(Math.random() * 10000); 

  const person = {
    id, 
    name, 
    number, 
  };

  persons = persons.concat(person);
  response.status(201).json(person);
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
