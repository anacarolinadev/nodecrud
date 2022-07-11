const express = require('express');

const server = express();

const port = process.env.PORT || 80;

server.use(express.json());

const listaProdutos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  }
    ]
}

//Regressar um item
server.get('/listaProdutos/:id', (req, res) => {
    const {id} = req.params;

    let index = listaProdutos.produtos.findIndex(element => element.id == id);

    return res.json(listaProdutos.produtos[index]);

});

//Regressar todos os itens
server.get('/listaProdutos', (req, res) => {
    return res.json( listaProdutos);
});

//Adicionar novo item
server.post('/listaProdutos', (req, res) => {
    if (validateInputData(req, res)) {
        let produto = req.body;
        produto.id = listaProdutos.produtos.length + 1
        listaProdutos.produtos.push(produto);

        return res.json(listaProdutos);
    }
});

//Atualizar produto
server.put('/listaProdutos/:id', (req, res) => {
    const {id} = req.params;

    let index = listaProdutos.produtos.findIndex(element => element.id == id);

    if (index > -1) {
        if (validateInputData(req, res)) {
            let produto = listaProdutos.produtos[index];
        
            produto.id = id;
            produto.descricao = req.body.descricao;
            produto.valor = req.body.valor;
            produto.marca = req.body.marca;
        
            return res.json(listaProdutos);
        }
    } else {
        return res.status(404).json({message: "Produto não encontrado!"});
    }


});

//Excluir produto
server.delete('/listaProdutos/:id', (req, res) => {
    const {id} = req.params;

    let index = listaProdutos.produtos.findIndex(element => element.id == id);

    if (index > -1) {

        let removed = listaProdutos.produtos.splice(index, 1);

        res.json({message : "O produto foi excluído",
                produto : removed});
    } else {
        return res.status(404).json({message: "Produto não encontrado!"});
    }
});

function validateInputData(req, res) {
    if(!req.body.descricao){
        res.status(400).json({message: "Campo 'descricao' é obrigatório."});
        return false;
    }else if(!req.body.valor){
        res.status(400).json({message: "Campo 'valor' é obrigatório."});
        return false;
    }else if(!req.body.marca){
        res.status(400).json({message: "Campo 'marca' é obrigatório."});
        return false;
    }else{
        return true;
    }
}







server.listen(port, function () {
    console.log(`Servidor rodando na porta ${port}`);
});


 