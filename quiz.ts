 import inquirer from "inquirer";
 import chalk from "chalk";
 
const apiLink="https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";

let fetchData = async ( data:string)=>{
   let fetchquiz:any = await fetch(data);
   let res = await fetchquiz.json();
   return res.results;
};
let data = await fetchData(apiLink);

let startQuiz = async()=>{
   let score:number=0;
   //for user 
   let name = await inquirer.prompt({
      type:"input",
      name:"userName",
      message:"What is your Name",
   });
    
   for(let i=1;i<10;i++){
      let answers=[...data[i].incorrect_answers,data[i]
      .correct_answer];
      let ans = await inquirer.prompt({
         type:"list",
         name:"quiz",
         message:data[i].question,
        choices: answers.map((val : any)=>val),
      });
     if (ans.quiz== data[i].correct_answer){
      ++score;
      console.log(chalk.bold.italic.blue("Correct"));
      }else{
         console.log(`Correct answer is ${chalk.bold.italic.red(data[i].correct_answer)}`)
      }
   }
  console.log(`Dear ${chalk.blue.bold(name.userName)} your score
  is ${chalk.red.bold(score)} out of ${chalk.yellow.bold('10')}`);
}
startQuiz(); 
