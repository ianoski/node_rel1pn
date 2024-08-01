const express = require ('express')
const app = express()
const cors = require ('cors')

const conn = require('./db/conn')
const Fabricante = require ('./model/Fabricante')
const Produto = require ('./model/Produto')
const { response } = require('express')

const PORT = 3000
const hostname = 'localhost'
//----------------------------------//
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
//----------------------------------//

app.post('/produto', async (req,res)=>{
    const valores = req.body
    console.log(valores)
    try{
        if(valores.fabricanteId == 1){
            const pesq = await Produto.create(valores, {raw: true})
            res.status(201).json(pesq)
        }else{
            res.status(404).json({message: 'Fabricante não encontrado!'})
        }
    }catch(err){
        console.error('Não foi possível consultar os dados!', err)
        res.status(500).json({message:'Não foi possível consultar os dados!'})
    }
})


app.get('/fabricante', async (req,res)=>{
    const valores = req.query
    console.log(valores)

    try{
        const pesq = await Fabricante.findOne({where: {marca: valores.marca}, raw: true})
        if(pesq == null){
            console.log('Dados não encontrados!')
            res.status(404).json({message: 'Dados não encontrados!'})
        }else if (pesq.marca == valores.marca){
            console.log(pesq.marca)
            res.status(200).json(pesq.marca)
        }
    }catch(err){
        console.error('Não foi possível consultar os dados!', err)
        res.status(500).json({message:'Não foi possível consultar os dados!'})
    }
})

app.post('/fabricante', async (req,res)=>{
    const valores = req.body
    console.log(valores)
    
    try{
        const pesq = await Fabricante.create(valores, {raw:true})
        console.log(pesq)
        res.status(200).json(pesq)
    }catch(err){
        console.error('Não foi possível gravar os dados!', err)
        res.status(500).json({message:'Não foi possível gravar os dados!'})
    }
})

app.get('/', (req,res)=>{
    console.log('Aplicação rodando!')
    res.status(200).json({message: 'Aplicação rodando!'})
})

//----------------------------------//
conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`servidor rodando em ${hostname}:${PORT}`)
    })
}).catch((err)=>{
    console.log('Erro ao conectar banco e dados!', err)
})