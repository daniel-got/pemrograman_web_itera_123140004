class Schedule {
  constructor(id,day, subject, time, room, lecturer) {
    this.id=id;
    this.day=day;
    this.subject=subject;
    this.time=time;
    this.room=room;
    this.lecturer=lecturer;
  }

  update(updates){
    Object.assign(this, updates);
    return this;
  }
}

export default Schedule;
