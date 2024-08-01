const {Fabricante, Produto} = require ('./model/assosiacao')
const conn = require ('./db/conn')

async function syncDataBase(){
    try{
        await conn.sync({force:true})
        console.log('Tabelas criadas e banco de dados sincronizado com sucesso!')
    }catch(err){
        console.error('Erro na sincronização com o banco de dados!', err)
    }finally{
        conn.close()
        console.log('Conexão com o banco de dados finalizada!')
    }
}
syncDataBase()