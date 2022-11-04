const express = require('express') // Подключение модуля express(framework). веб-фреймворк для приложений Node.js, предоставляющий обширный набор функций для мобильных и веб-приложений.
const path = require('path') //Подключаем модуль path для рвботы с каталогами и путями к файлам
const {v4} = require('uuid') //генерирует идентификаторы по запросу клиента.
const app = express() //запускаем модуль express

let CONTACTS = [ //создаем переменную контакт для данных клиента
  {id: v4(), name: 'IGOR', value: '+373699855867', marked: false}   
] //массив данных которые отображаются на странице (рандомный ID, имя и номер телефона)
app.use(express.json())

//GET - to get a data
app.get('/api/contacts', (req, res) => {
  setTimeout(() => {
    res.status(200).json(CONTACTS) 
  }, 1000)
})
//POST - call the method to create a new contact
app.post('/api/contacts', (req, res) => {
  const contact = {...req.body, id: v4(), marked: false} //our obiect
  CONTACTS.push(contact)
  res.status(201).json(contact) //status(201) means the item has been created
})
//DELETE - deleting an entry (recorder)
app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
  res.status(200).json({message: 'Контакт был удален'}) 
})
//// PUT - updates/changes the element; mark the contact; in this case, mark the contact
app.put('/api/contacts/:id', (req, res) => {
  const idx = CONTACTS.findIndex(c => c.id === req.params.id) 
  CONTACTS[idx] = req.body
  res.json(CONTACTS[idx])
})


app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {  
  res.sendFile(path.resolve(__dirname, 'client', 'index.html')) 
})
//method .listen - specify port 3000 on which the server will be launched
app.listen(3000, () => console.log('Server has been started on port 3000...')) 

