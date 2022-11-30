const express = require ('express')
const cors = require ('cors')
const path = require('path')
const fs = require('fs');
const uniqid = require ('uniqid')


const app = express();
const PORT = 3001;

app.use(cors());
// app.use(express.json());

app.use(express.urlencoded({ extended:true}));
app.use(express.json());

app.use(express.static('Develop/public'));



app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'));

})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'));

})

app.get('/api/notes',(req,res) => {
    fs.readFile('./Develop/db/db.json', 'utf8', (error,data) =>{
        console.log(data)
        res.send(data)
    })
})

app.post('/api/notes',(req,res) => {
    fs.readFile('./Develop/db/db.json', 'utf8', (error,data) =>{
        let notes = JSON.parse(data)
        notes.push ({...req.body,id:uniqid()})
        fs.writeFile('./Develop/db/db.json',JSON.stringify(notes), (error) =>{
            res.json(req.body)
        })

    })
})

app.delete('/api/notes/:id',(req,res) => {
    fs.readFile('./Develop/db/db.json', 'utf8', (error,data) =>{
        let notes = JSON.parse(data)
       let filterNotes = notes.filter((note) =>{
        return note.id !== req.params.id  
       })
        fs.writeFile('./Develop/db/db.json',JSON.stringify(filterNotes), (error) =>{
            res.json(req.body)
        })

    })
})

app.listen(PORT, () => {
console.log("server listening"+PORT)
})
