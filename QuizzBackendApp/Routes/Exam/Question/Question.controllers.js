const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();


const getAllQuestion = async(req, res) =>{
    try{
        const AllQuestion = await prisma.question.findMany({
            include:{
                responses:true,
                exam:{
                    select:{
                        titre:true,
                    }
                }
            }
        });
        return res.status(200).json({
            success: true,
            AllQuestion: AllQuestion
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getQuestion = async(req, res)=>{
    try{
        const {id} = req.params
        const question = await prisma.question.findUnique({
            where:{
                id: parseInt(id)
            },
            include:{
                responses:true,
                exam:{
                    select:{
                        titre:true,
                    }
                }
            }
        });
        if(!question){
            return res.status(404).json({
                success: false,
                message: "cette question n'existe pas"
            })
        }
        return res.status(200).json({
            success: true,
            question: question,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const CreateQuestion = async(req, res) =>{
    try{
        const {titre, topicId} = req.body
        const question = await prisma.question.create({
            data:{
                titre:titre,
                topic:{
                    connect:{
                        id:topicId
                    }
                }
            }
        })
        return res.status(200).json({
            success: true,
            question: question
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

const UpdateQuestion = async(req, res)=>{
    try{
        const{id} = req.params
        const {titre, topicId} = req.body

        const question = await prisma.question.update({
            where:{
                id: parseInt(id)
            },
            data:{
                titre: titre,
                topic:{
                    connect:{
                        id:topicId
                    }
                }
            }
        });
        return res.status(200).json({
            success: true,
            question: question
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const DeleteQuestion = async(req, res)=>{
    try{
        const {id} = req.params
        const question = await prisma.question.findUnique({
            where:{
                id: parseInt(id)
            },
            include:{
                responses:true
            }
        });
        if(!question){
            return res.status(404).json({
                success: false,
                message: "cette question n'a pas été trouvée"
            })
        }
        await prisma.question.delete({
            where:{
                id: parseInt(id)
            },
        });
        return res.status(200).json({
            success:true,
            message: "question supprimée avec succès"
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    getAllQuestion,
    getQuestion,
    CreateQuestion,
    UpdateQuestion,
    DeleteQuestion
}