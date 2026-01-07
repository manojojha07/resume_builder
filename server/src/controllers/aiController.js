import Resume from '../models/resumeModel.js'
import ai from '../config/ai.js'

// constrol for enhance summmury
// post /api.ai.enhanche
// enhanceProfessionalSummary
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an expert in resume writing. Your task is to enhance the professional summary of a resume. 
          The summary should be 1-2 sentences highlighting key skills, experience, and career objectives. 
          Make it compelling and ATS-friendly. Only return the enhanced text.`
        },
        {
          role: "user",
          content: userContent
        }
      ]
    });

    const enhancedContent = response.choices[0].message.content;

    return res.status(200).json({ enhancedContent });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "AI failed to enhance summary"
    });
  }
};
// constrol for enhance job desc
// 

export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) {
            return res.status(400).json({ message: "Missing required fileds" });
        }
      const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: "You are an expert in resume writing Your task is to enhance the job description of a resume. the job description should be only in 1-2 sentences also highlighting key responsibilties and achivments. Use action verbs and quantifiable results where possible. Make it ATS-firendly. and only return text no options or anything else ." },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });
    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
    } catch (error) {
 return res.status(400).json({message: error.message});
    }
}




// uploading Resume to database


export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText || !title) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt = "You are an expert AI Agent extracting data from resumes.";
    const userPrompt = `
      Extract data from this resume: ${resumeText}
      Provide data in this JSON format (no extra text):
      {
        professional_summary: "",
        skills: [],
        personal_info: {
          full_name: "", email: "", phone: "", location: ""
        },
        experience: [],
        project: [],
        education: []
      }
    `;
    

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);

    const newResume = await Resume.create({ userId, title, ...parsedData });
    res.json({ resumeId: newResume._id });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};




