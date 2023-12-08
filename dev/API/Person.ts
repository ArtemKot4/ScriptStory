type information = "age" | "race" | "place" | "fraction" | "attitude";
type math_sep = "+" | "-" | "*" | "/" | "**" 

interface IDescription {
  name: string;
  age: number;
  fraction: fraction;
  place: string /*Место жительства:3*/;
  race: "human" | "fluffy";
  attitude?: 0;
}

class Person {
  public static list: IDescription[] = [];
  public description: IDescription = {
    name: "Default",
    age: 0,
    fraction: "neutral",
    attitude: 0,
    place: "standart",
    race: "human",
  };
  constructor(description: IDescription) {
    let desc = this.description;
    desc = description;
    desc.attitude=desc.attitude||0;
    Person.list.push(desc);
  }
  public getName(): string {
    return (
      this.description.name[0].toUpperCase() +
      this.description.name.slice(1).toString()
    );
  }
  public static getForAll(value: name): void {
    for (var i in Person.list) {
        if(Person.list[i].hasOwnProperty(value)) return Person.list[i][value];
    }
  }
  public static getAll(): universal {
    for (var i in Person.list) {
      return "script_story:" + Person.list[i].name + "<>";
    }
  }

  public getInfo(param: information): universal {
    return this.description[param];
  };
  public setAttitude(type: math_sep,number: int): void {
    const start = "" + this.description.attitude+type+number;
   
    if(this.description.attitude<200 && number <= 20 ){
    eval(start);
    Game.message(type + " " + number + "\nattitude: " + this.description.attitude);
    }
  };

  public get(): universal {
    return "script_story:" + this.description.name + "<>";
  }
}
