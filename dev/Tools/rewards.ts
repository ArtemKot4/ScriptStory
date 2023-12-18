enum ERewards {
	UTEN = "uten"
}

registerNumeralTranslation(
	"no utens", { ru: "нет утенов" },
	"%s1 uten", { ru: "%s1 утен" },
	"%s%? utens", { ru: "%s%? утена" },
	"%s utens", { ru: "%s утенов" }
);

enum EEasingTypes {
	LINEAR = (x) => x,
	SINE = (x) => 1 - Math.cos((x * Math.PI) / 2),
	QUAD = (x) => x * x,
	CUBIC = (x) => x * x * x,
	QUART = (x) => x * x * x * x,
	QUINT = (x) => x * x * x * x * x,
	EXPO = (x) => x === 0 ? 0 : Math.pow(2, 10 * x - 10),
	CIRC = (x) => 1 - Math.sqrt(1 - Math.pow(x, 2)),
	BACK = (x) => 2.70158 * x * x * x - 1.70158 * x * x,
	ELASTIC = (x) => x === 0 ? 0 : x === 1 ? 1 :
		-Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * (2 * Math.PI) / 3)
}

class Reward {
	private static readonly window = (() => {
		const window = new UI.Window({
			drawing: [
				{
					type: "background",
					color: android.graphics.Color.TRANSPARENT
				}
			],
			elements: {
				reward_image: {
					type: "image",
					x: 12,
					y: 149,
					height: 32,
					width: 38
				},
				reward_text: {
					type: "text",
					x: 57,
					y: 154,
					font: {
						size: 18,
						color: android.graphics.Color.WHITE,
						shadow: 0.5
					}
				}
			}
		});
		window.setBlockingBackground(false);
		window.setAsGameOverlay(true);
		window.setTouchable(false);
		window.setDynamic(false);
		return window;
	})();
	private static imageElement: UI.UIImageElement;
	private static textElement: UI.UITextElement;

	public static obtain(reward: ERewards, count?: number = 0) {
		let bitmap = "missing_texture";
		let text = "?";
		switch (reward) {
			case ERewards.UTEN:
				bitmap = "thirteen_lights.uten";
				text = translateNumeral(count, "no utens", "%s1 uten", "%s%? utens");
				break;
			default:
				throw new ReferenceError("Reward " + reward + " couldn't be obtained!");
		}
		new Reward(bitmap, text).enqueue();
	}

	private static current: Reward;
	private static rewards: Reward[] = [];

	public static get() {
		return this.current;
	}

	public static next() {
		if (this.rewards.length == 0) {
			return;
		}
		if (this.current != null) {
			this.current.close();
		}
		this.rewards.shift().display();
	}

	private bitmap: string;
	private text: string;
	private easing: EEasingTypes;
	private delta: number;

	constructor(bitmap: string, text: string, easing?: EEasingTypes) {
		this.bitmap = bitmap;
		this.text = text;
		this.easing = easing ?? EEasingTypes.BACK;
	}

	public display() {
		if (this.current != this) {
			this.current.close();
		}
		this.current = this;
		this.window.preOpen();
		this.prepare();
		this.run();
		this.window.postOpen();
	}

	public enqueue(force: bool = false) {
		if (force && this.current != this) {
			this.current.close();
		}
		if (this.current != null) {
			this.rewards.push(this);
			return;
		}
		this.display();
	}

	public close() {
		if (this.current == this) {
			this.current = null;
		}
		this.window.close();
	}

	protected readonly offsetX: number = 500;
	protected readonly offsetY: number = UI.getScreenRelativeHeight() - 149;

	protected prepare() {
		this.window.layout.setAlpha(1);
		if (this.imageElement == null) {
			this.imageElement = this.window.getElements().get("reward_image");
		} else {
			this.setOffset(this.imageElement, 0, 0);
		}
		this.imageElement.setBinding("bitmap", this.bitmap);
		if (this.textElement == null) {
			this.textElement = this.window.getElements().get("reward_text");
		} else {
			this.setOffset(this.textElement, 0, 0);
		}
		this.textElement.setBinding("text", this.text);
	}

	private run() {
		this.delta = 0;
		Threading.initThread("obtain_reward", () => {
			while (this.current == this) {
				this.update();
				if (this.delta == 0) {
					break;
				}
				java.lang.Thread.sleep(16);
			}
			runOnMainThread(() => {
				if (this.current == this) {
					this.next();
				}
			});
		});
	}

	protected static readonly setOffset(element: UI.UIElement, x: number, y: number) {
		element.setPosition(element.description.x + x, element.description.y + y);
	}

	protected update() {
		this.delta++;
		if (this.delta <= 120) {
			const offset = this.offsetX * this.easing((120 - this.delta) / 120);
			this.setOffset(this.imageElement, offset, 0);
			this.setOffset(this.textElement, offset, 0);
		} else if (this.delta >= 300 && this.delta <= 420) {
			const progress = (this.delta - 300) / 120;
			this.window.layout.setAlpha(1 - progress);
			const offset = this.offsetY * progress;
			this.setOffset(this.imageElement, 0, offset);
			this.setOffset(this.textElement, 0, offset);
		} else if (this.delta >= 450) {
			this.delta = 0;
		}
	}
};

Callback.addCallback("LevelDisplayed", () => {
	for (let i = 0; i < 5; i++) {
		Reward.obtain(ERewards.UTEN, Math.floor(Math.random() * 256 - 128));
	}
});
