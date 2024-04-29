const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAlltopic = async (req, res) => {
  try {
    const Alltopic = await prisma.topic.findMany({
      include: {
        questions: true,
        exam: {
          select: {
            titre: true,
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      Alltopic: Alltopic,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const gettopic = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await prisma.topic.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        questions: true,
        exam: {
          select: {
            titre: true,
          },
        },
      },
    });
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "cette topic n'existe pas",
      });
    }
    return res.status(200).json({
      success: true,
      topic: topic,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const Createtopic = async (req, res) => {
  try {
    const { titre, ExamId } = req.body;
    const topic = await prisma.topic.create({
      data: {
        titre: titre,
        topic: {
          connect: {
            id: ExamId,
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      topic: topic,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const Updatetopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, ExamId } = req.body;

    const topic = await prisma.topic.update({
      where: {
        id: parseInt(id),
      },
      data: {
        titre: titre,
        topic: {
          connect: {
            id: ExamId,
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      topic: topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const Deletetopic = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await prisma.topic.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        questions: true,
      },
    });
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "cette topic n'a pas été trouvée",
      });
    }
    await prisma.topic.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({
      success: true,
      message: "topic supprimée avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAlltopic,
  gettopic,
  Createtopic,
  Updatetopic,
  Deletetopic,
};
