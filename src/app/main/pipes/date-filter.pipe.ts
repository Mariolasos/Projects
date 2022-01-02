import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from 'src/app/shared/models/todo.model';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(tasks: Todo[],option: string): Todo[] {
    let filteredTasks :Todo[] = [];
    let date= new Date();
    date.setHours(23,59,59);
    
    switch(option){
      case "today":
        for(let i in tasks){
          if(tasks[i].date<date){
            filteredTasks.push(tasks[i]);
          }
        }
        break;
    }
    return filteredTasks;
  }

}
