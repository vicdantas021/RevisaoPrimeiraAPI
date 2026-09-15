const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let ALUNOS = [
    { id: 1, nome: "Amanda", cuso: "Desenvolvimento de sistemas" },
    { id: 2, nome: "Victória", cuso: "Redes de computadores" },
    { id: 3, nome: "Felipe", cuso: "Administração" },
    { id: 4, nome: "Manuela", cuso: "Desenvolvimento de sistemas" },
];

app.get("/", (req, res) => {
    res.json({
        mensagem: "API alunos funcionando!"
    });
});

app.get("/alunos", async (req, res) => {
    try {
        const [resultado] = await conexao.query("SELECT * FROM alunos");
        res.status(200).json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensagem: "Erro ao buscar alunos"
        });
    }
});


app.get("/alunos/:id", (req, res) => {
    const id = Number(req.params.id);

    const aluno = ALUNOS.find(a => a.id === id);

    if (!aluno) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        })
    }
    res.status(200).json(aluno);
});

app.post("/alunos/cadastrar", (req, res) => {
    const { nome, cuso } = req.body;

    if (!nome || !cuso) {
        return res.status(400).json({ mensagem: "Nome e curso são obrigatórios" });
    }

    const novoId = ALUNOS.length > 0 ? Math.max(...ALUNOS.map(aluno => aluno.id)) + 1 : 1;

    // const novoId = ALUNOS.length > 0? ALUNOS(ALUNOS.length - 1).id + 1 : 1;

    const novoAluno = {
        id: novoId,
        nome: nome,
        cuso: cuso
    };

    ALUNOS.push(novoAluno);

    res.status(201).json({
        mensagem: "Aluno Cadastrado com sucesso"
    })
});

app.put("/alunos/:id", (req, res) => {
    const id = Number(req.params.id);
    const { nome, cuso } = req.body;

    const indice = ALUNOS.findIndex(aluno => aluno.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    if (!nome || !cuso) {
        return res.status(400).json({
            mensagem: "Nome e curso são obrigatórios"
        });
    }

    ALUNOS[indice] = {
        id: id,
        nome: nome,
        cuso: cuso
    };

    res.status(200).json({
        mensagem: "Aluno atualizado com sucesso",
        aluno: ALUNOS[indice]
    })

});

const PORTA = 3000;

app.listen(PORTA, () => {
    console.log("Servidor iniciado com sucesso");
    console.log(`http://localhost:${PORTA}`);
});