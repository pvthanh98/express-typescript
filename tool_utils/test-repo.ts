import {QuestionRepository} from "../src/repositories/question.repository";

(async function execute(){
    // // const questionRepo = new QuestionRepository();
    // // const question = await questionRepo.findByTitle("Question 1");
    // // console.log(question);

    
    // const rawData = await QuestionRepository.query(`SELECT * FROM question where question.title='Question 1'`)
    // console.log(rawData)

    QuestionRepository.insertCustom({
        title:"Question 1",
        text: "Description"
    })

})()