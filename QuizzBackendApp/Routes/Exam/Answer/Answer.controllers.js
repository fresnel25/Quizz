const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();


const getAllResponse = async(req, res) =>{
    try{
        const Allresponse = await prisma.response.findMany({
            include:{
                question:{
                    select:{
                        titre:true,
                    }
                }
            }
        });
        return res.status(200).json({
            success: true,
            Allresponse: Allresponse
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getResponse = async(req, res)=>{
    try{
        const {id} = req.params
        const response = await prisma.response.findUnique({
            where:{
                id: parseInt(id)
            },
            include:{
                question:{
                    select:{
                        titre:true,
                    }
                }
            }
        });
        if(!response){
            return res.status(404).json({
                success: false,
                message: "cette response n'existe pas"
            })
        }
        return res.status(200).json({
            success: true,
            response: response,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const CreateResponse = async(req, res) =>{
    try{
        const {titre, QuestionId} = req.body
        const response = await prisma.response.create({
            data:{
                titre:titre,
                question:{
                    connect:{
                        id:QuestionId
                    }
                }
            }
        })
        return res.status(200).json({
            success: true,
            response: response
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

const UpdateResponse = async(req, res)=>{
    try{
        const{id} = req.params
        const {titre, QuestionId} = req.body

        const response = await prisma.response.update({
            where:{
                id: parseInt(id)
            },
            data:{
                titre:titre,
                question:{
                    connect:{
                        id:QuestionId
                    }
                }
            }
        });
        return res.status(200).json({
            success: true,
            response: response
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const DeleteResponse = async(req, res)=>{
    try{
        const {id} = req.params
        const response = await prisma.response.findUnique({
            where:{
                id: parseInt(id)
            },
        });
        if(!response){
            return res.status(404).json({
                success: false,
                message: "cette response n'a pas été trouvée"
            })
        }
        await prisma.response.delete({
            where:{
                id: parseInt(id)
            },
        });
        return res.status(200).json({
            success:true,
            message: "response supprimée avec succès"
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
getAllResponse,
getResponse,
CreateResponse,
UpdateResponse,
DeleteResponse,
}