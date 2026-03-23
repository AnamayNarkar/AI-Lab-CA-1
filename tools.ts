import * as fs from 'fs';
import { DynamicTool } from 'langchain/tools';

const gettimeTableTool = new DynamicTool({
    name:"get_timetable_tool",
    description: "used to receive the timetable for the users exams"+
    "use this when you need to get information about the users exams in order to suggest a study schedule or anyting related",
    func: async ()=>{
        const data = JSON.parse(fs.readFileSync("exams.json", "utf-8"))
        console.log(data)
        const today = new Date().toISOString().split("T")[0];
        return JSON.stringify({today, ...data}, null,2);
    }
})

const getSyllabustool = new DynamicTool({
    name:"get_syllabus_tool",
    description: "used to get the syllabus for all subjects for the exam"+
    "use this when you need to get information about the users exams subjects in order to suggest a study schedule or anyting related",
    func: async ()=>{
        const data = JSON.parse(fs.readFileSync("syllabus.json", "utf-8"))
        console.log(data)
        const today = new Date().toISOString().split("T")[0];
        return JSON.stringify({today, ...data}, null,2);
    }
})


const getuserProgressTool = new DynamicTool({
    name:"get_user_progress_tool",
    description: "used to get the users completed syllabus for all subjects for the exam"+
    "use this when you need to get information about the users preparation for the exam subjects in order to suggest a study schedule or anyting related",
    func: async ()=>{
        const data = JSON.parse(fs.readFileSync("user_progress.json", "utf-8"))
        console.log(data)
        const today = new Date().toISOString().split("T")[0];
        return JSON.stringify({today, ...data}, null,2);
    }
})

export const allTools = [
    gettimeTableTool,
    getSyllabustool,
    getuserProgressTool
]