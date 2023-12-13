class Event {
    public name: name;
    public isExists: boolean = false;
    public action: () => void;

    constructor(action?: ()=>void) {
      this.action = action;
    }
  
    public start(): void {
      this.isExists !== true && this.action !== undefined
        ? this.action()
        : Game.message(Translation.translate("Sorry,but this event is over"));
    }
  
    public static moveTo(x: int, y: int, z: int): void {
      const player = Player.getLocal();
      black.openAs(BLACK);
      setTimeSecond(() => {
        alert("Сработало?");
        black.close();
        Entity.setPosition(player, x, y, z);
      }, 5);
    }
  }
  
  var test = new Event(()=>Event.moveTo(1000,100,1000));
  