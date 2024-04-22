const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const Register = async (req, res) => {
  try {
    // variables à utiliser pour créer un Student
    const { nom, prenom, email, password } = req.body;
    // vérifier sur l'utilisateur existe
    const CheckStudent = await prisma.student.findUnique({
      where: {
        email,
      },
    });
    if (CheckStudent) {
      return res.status(200).json({
        success: false,
        message: "cet utilisateur existe déja",
      });
    }

    const student = await prisma.student.create({
      data: {
        nom,
        prenom,
        email,
        password: hashSync(password, 10),
      },
    });
    // delete Student.password;

    return res.json({
      success: true,
      student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await prisma.student.findUnique({
      where: {
        email,
      },
    });
    if (!student) {
      return res.status(200).send({
        success: false,
        message: "cet email n'est associé à aucun utilisateur, veuillez vous enregistrer",
      });
    }
    if (!compareSync(password, student.password)) {
      return res.status(200).send({
        success: false,
        message: "ce mot de passe est incorrecte",
      });
    }
    const token = jwt.sign(
      {
        studentId: student.id,
      },
      secret
    );

    return res.status(200).json({
        success:true,
        message:"vous êtes connecté",
        token,
        student
    });
  } catch (error) {
    return res.status(500).json({
        success:false,
        message: error.message
    });
  }
};


const getAllStudent = async (req, res) => {
  try {
    const allStudents = await prisma.student.findMany({
    });
    return res.status(200).json({
        success: true,
        allStudents
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSingleStudent = async(req, res) =>{
    try{
        const {id} = req.params;
        const student = await prisma.student.findUnique({
            where:{
                id:parseInt(id)
            },
            include:{
                studentExams:true,
                payExams:true,
            }
        });
        if(!student){
          return res.status(404).json({
            success:false,
            message:"cet utilisateur n'a pas été trouvé"
          })
        }
        return res.status(200).json({
          success: true,
          student:student
        });
    }
    catch(error){
      return res.status(500).json({
        success:false,
        message: error.message
      })
    }
}



module.exports = {
  getAllStudent,
  getSingleStudent,
  Register,
  login,
};
