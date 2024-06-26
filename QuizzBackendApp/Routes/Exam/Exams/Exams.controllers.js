const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllExam = async (req, res) => {
  try {
    const Allexam = await prisma.exam.findMany({
      include: {
        topics: true,
        studentExams: true,
      },
    });
    return res.status(200).json({
      success: true,
      Allexam: Allexam,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getExam = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await prisma.exam.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        topics: true,
        studentExams: true,
      },
    });
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "cette exam n'existe pas",
      });
    }
    return res.status(200).json({
      success: true,
      exam: exam,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const CreateExam = async (req, res) => {
  try {
    const { titre } = req.body;
    const exam = await prisma.exam.create({
      data: {
        titre: titre,
      },
    });
    return res.status(200).json({
      success: true,
      exam: exam,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const UpdateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre } = req.body;

    const exam = await prisma.exam.update({
      where: {
        id: parseInt(id),
      },
      data: {
        titre: titre,
      },
    });
    return res.status(200).json({
      success: true,
      exam: exam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const DeleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await prisma.exam.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        topics: true,
        studentExams: true,
      },
    });
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "cette exam n'a pas été trouvée",
      });
    }
    await prisma.exam.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({
      success: true,
      message: "exam supprimée avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllExam,
  getExam,
  CreateExam,
  UpdateExam,
  DeleteExam,
};
