export class Todo {
  id: number;
  title: string;
  content: string;
  assignee: string;
  assigneeName: string;
  status: 'unfinished' | 'complete';
  startTime?: Date;
  time: 4 | 6 | 8 | 10 | 12;

  constructor() {
    this.id = 0;
    this.title = '';
    this.content = '';
    this.assignee = '';
    this.status = 'unfinished';
    this.assigneeName = '';
    this.time = 4;
  }
}
