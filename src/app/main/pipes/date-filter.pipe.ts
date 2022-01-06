import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from 'src/app/shared/models/todo.model';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(tasks: Todo[],option: string): Todo[] {
    let filteredTasks :Todo[] = [];
    let dateEnd = new Date();
    let dateStart = new Date();
    switch(option){
      case "account":
        return tasks;
      case "archive":
        return tasks;
      case "this week":
        let lastDay=(dateEnd.getDate() - dateEnd.getDay())+7;
        dateEnd=new Date(new Date().setDate(lastDay));
        break;
      case "this month":
        dateEnd=new Date(dateEnd.getFullYear(),dateEnd.getMonth()+1,0);
        break;
    }
    dateStart.setHours(0,0,0);
    dateEnd.setHours(23,59,59);
    console.log(dateEnd);
    
    tasks.forEach(task=>{
      let taskDate = new Date(task.date);
      if(taskDate.getTime()<dateEnd.getTime()&&taskDate.getTime()>dateStart.getTime()){
        filteredTasks.push(task);
      }
    })
    return filteredTasks;
  }

}
