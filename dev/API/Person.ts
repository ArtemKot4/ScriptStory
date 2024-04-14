interface PersonDescriptor {
  race: race, attitude: 0, place: place, quests: object[], isDead: boolean
}

class Person {
  public static data = {}
  constructor(public name, race: race, place: place) {
     Person.data[name] = {race: race, attitude: 0, place: place, quests: [], isDead: false, dialogLock: false}
  };
  public static addAttitude(name: string, count: int) {
    if(Person.data[name].attitude >= 100) return;
        Person.data[name].attitude += count   
  };
  public static decreaseAttitude(name: string, count: int) {
    const attitude = Person.data[name].attitude;
    if(attitude - count < 0) 
    return Person.data[name].attitude = Math.abs(count - attitude);
    Person.data[name].attitude -= count
  };
  public static getPersonsByRace(race: race) {
    const result = [];
    const data = Person.data as PersonDescriptor[];
    for(const i in data) {
      if(data[i].race === race) {
        result.push(i);
      }
    };
    Game.message(String(result));
    return result;
  };
  public dialogUpdatable(ui: UI.Container) {
    const data = Person.data[this.name];
    if(!data || data.quests && data.quests.length === 0) {
      throw new Error("Не получилось получить персонажа в списке или список квестов равен нулю: " + data) }
      const desc = data.quests[0];
    return {
      ui,
      update: function() {
         if(ui.isOpened() === false) { 
          alert("Я уничтожился!");
          this.remove = true; };
          ui.setText("Question", desc.question);
          ui.setText("answer_1", desc.answer_1);
          ui.setText("answer_2", desc.answer_2);
          ui.setText("answer_3", desc.answer_3);
          ui.setText("Talker", this.name.toLowerCase());
      }
    }
  };
};