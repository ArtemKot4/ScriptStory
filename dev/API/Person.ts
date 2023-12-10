interface IDescription {
  name: string;
  age: number;
  fraction: fraction;
  place: string /*Место жительства:3*/;
  race: race;
}

let ent = [];

class Person {
  public static list: any[] = [];
  public description: any = {};
  public attitude = 0;
  constructor(description: IDescription) {
    let desc = this.description;
    desc = description;
    Person.list.push(desc, this.attitude);
    alert("constructor: " + this.description);
  }
  public getName(): string {
    return (
      this.description.name[0].toUpperCase() +
      this.description.name.slice(1).toString()
    );
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
    }; 
  public static getAll(): string {
    for (var i in Person.list) {
      return "script_story:" + Person.list[i].name + "<>";
    }
  }

  public getInfo(param: information): universal {
    return this.description[param];
  }
  public setAttitude(type: math_sep, number: int): void {
    const start = this.attitude + type + number;
    const desc = this.description;
    if (
      desc.name  &&
      this.attitude < 200 &&
      number <= 20
    ) {
      this.attitude = eval(start);
      Game.message(
        desc.name +
          ": {" +
          "equals: " +
          type +
          number +
          "\n, attitude: " +
          this.attitude +
          "}"
      );
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

    const attach = new AttachableRender(ent[this.description.name]);
    attach.setRenderer(actor);
  }

  public get(): string {
    return "script_story:" + this.description.name + "<>";
  }
}

Callback.addCallback("EntityAdded", (entity: int) => {
  const all: string[] = Person.getForAll("name");
  if (Entity.getTypeName(entity) == Person.getAll()) {
    alert(JSON.stringify("Имена мобов получены: " + all));
    ent.push({all: entity})
  }
});
