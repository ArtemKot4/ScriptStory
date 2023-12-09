type information = "age" | "race" | "place" | "fraction" | "attitude" | "name";
type math_sep = "+" | "-" | "*" | "/" | "**" 

interface IDescription {
  name?: string;
  age?: number;
  fraction?: fraction;
  place?: string /*Место жительства:3*/;
  race?: "human" | "fluffy";
  attitude?: 0;
}

class Person {
  public static list: IDescription[] = [];
  public description: IDescription = {
  };
  constructor(description: IDescription) {
    let desc = this.description;
    desc = description;
    desc.attitude=0
    Person.list.push(desc);
  }
  public getName(): string {
    return (
      this.description.name[0].toUpperCase() +
      this.description.name.slice(1).toString()
    );
  }
  public static getForAll(info: information): universal {
    for(var i in Person.list){
        return Person.list[i][info];
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
    const start = this.description.attitude + type + number;
       
        
    if(this.description && this.description.attitude < 200 && number <= 20 ){
        this.description.attitude = eval(start);
    Game.message(this.description.name + ": {"+"race: "+this.description.race + ", equals: "+ type + number + "\n,attitude: " + this.description.attitude+"}");
    }
  };

  public get(): universal {
    return "script_story:" + this.description.name + "<>";
  }
}
