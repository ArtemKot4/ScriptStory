interface IDescription {
  name: string;
  age: number;
  place: place /*Место жительства*/;
  race: race;
}

let ent = [];

class Person {
  public static list: any[] = [];
  public name: name;
  public age: int;
  public place: place;
  public race: race;
  public attitude = 0;
  constructor(description: IDescription) {
    description = {
      name: this.name,
      age: this.age,
      place: this.place,
      race: this.race,
    };
    Person.list.push(description, this.attitude);
    alert("constructor: " + JSON.stringify(description));
  }
  public getName(): string {
    return this.name[0].toUpperCase() + this.name.slice(1).toString();
  }
  public static getForAll(info: string): string[] {
    const infos: string[] = [];
    for (let i = 0, l = Person.list.length; i < l; i++) {
      const person = Person.list[i];
      if (person && person[info]) {
        infos.push(person[info]);
      }
    }
    return infos;
  }
  public static getAll(): string {
    for (var i in Person.list) {
      return "script_story:" + Person.list[i].name + "<>";
    }
  }

  public getInfo(param: information): universal {
    return this[param];
  }
  public setAttitude(type: math_sep, number: int): void {
    const start = this.attitude + type + number;

    if (this.name && this.attitude < 200 && number <= 20) {
      this.attitude = eval(start);
      Game.message(
        this.name +
          ": {" +
          "equals: " +
          type +
          number +
          "\n, attitude: " +
          this.attitude +
          "}"
      );
      for (var i in Person.list) {
        const person = Person.list[i];
        if (person.name == this.name) {
          Person.list[i].attitude = this.attitude;
        }
      }
    }
  }

  public completeModel(name: name, type: parts, texture: name) {
    const dir: string = __dir__ + "person/";
    const actor: ActorRenderer = new ActorRenderer();
    const mesh: RenderMesh = new RenderMesh();
    mesh.importFromFile(dir + "models/" + name, "obj", {
      invertV: false,
      noRebuild: false,
    });
    actor.addPart(name, type, mesh).setTexture(dir + "textures/" + texture);

    const attach = new AttachableRender(ent[this.name]);
    attach.setRenderer(actor);
  }

  public get(): string {
    return "script_story:" + this.name + "<>";
  }
}



Callback.addCallback("EntityAdded", (entity: int) => {
  const all: string[] = Person.getForAll("name");
  if (Entity.getTypeName(entity) == Person.getAll()) {
    alert(JSON.stringify("Имена мобов получены: " + all));
    ent.push({ [String(all)]: entity });
  }
});
