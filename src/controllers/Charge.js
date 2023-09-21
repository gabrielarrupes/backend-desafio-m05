const connection = require("../services/connection");


const postCharge = async (req, res) => {
    const { id } = req.customers;
    const {
        value,
        duedate,
        status,
        description
    } = req.body;

    try {
        const charge = await connection("charge").insert({
            idCustomer: id,
            value,
            duedate,
            status,
            description
        });

        if (!charge) {
            return res
                .status(400)
                .json("Não foi possível concluir o cadastro de cobrança");
        }

        return res.status(201).json("Cobrança cadastrada com sucesso.");
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};

module.exports = { postCharge }