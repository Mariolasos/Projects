import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from 'src/app/shared/models/todo.model';

@Pipe({
  name: 'archiveFilter'
})
export class ArchiveFilterPipe implements PipeTransform {

  transform(tasks: Todo[],archive: string): Todo[]{
    return tasks.filter(task=>{
      if(archive=="archive" && task.archive==true){
        return true;
      }else if(archive!=="archive" && task.archive==false){
        return true;
      }
    });
  }

}
