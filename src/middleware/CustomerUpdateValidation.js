const existsInDatabase = require("../utils/existsInDatabase.js");


const CustomerUpdateValidation = (joiSchema) => async (req, res, next) => {
    try {
        const {
            name,
            email,
            cpf,
            telephone,
            cep,
            logradouro,
            complemento,
            bairro,
            cidade,
            estado
        } = req.customers;

        const currentEmail = req.body.email;
        const currentCPF = req.body.cpf;

        const areObjectsEqual = async (fisrtObject, secondObject) => {


            return (
                fisrtObject.name === secondObject.name &&
                fisrtObject.email === secondObject.email &&
                fisrtObject.cpf === secondObject.cpf &&
                fisrtObject.telephone === secondObject.telephone &&
                fisrtObject.cep === secondObject.cep &&
                fisrtObject.logradouro === secondObject.logradouro &&
                fisrtObject.complemento === secondObject.complemento &&
                fisrtObject.bairro === secondObject.bairro &&
                fisrtObject.cidade === secondObject.cidade &&
                fisrtObject.estado === secondObject.estado
            )
        };

        const checkNoChange = await areObjectsEqual(req.customers, req.body);

        if (checkNoChange) {
            return res
                .status(400)
                .json({ message: "Ao menos um campo deve ser alterado" });
        }

        await joiSchema.validateAsync(req.body);

        if (email !== currentEmail || cpf !== currentCPF) {
            await existsInDatabase(req, (database = "customers"));
        }

        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = CustomerUpdateValidation
