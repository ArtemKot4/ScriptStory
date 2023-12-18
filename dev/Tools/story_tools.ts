var dialogs = [];
var quests = [];

function questRegistry(name: string, isActive: boolean): void {
	for (var i in dialogs) {
		for (var n in quests) {
			quests.push({ name: name, isActive: isActive });
		}
	}
}

function teleportPlayer(x: number, y: number, z: number): void {
	Entity.addPosition(Player.get(), x, y, z);
}

function dialogRegistry(
	dialog: string,
	question: string,
	first: string,
	second: string,
	third: string,

	isActive: boolean,
	talker: number,

	button_1 ? : {},
	button_2 ? : {},
	button_3 ? : {}
): void {
	dialogs.push({
		dialog: dialog,
		// previousquest: previousquest,
		// nextquest: nextquest,
		question: question,
		first: first,
		second: second,
		third: third,

		isActive: isActive,
		talker: talker,
		button_1: button_1,
		button_2: button_2,
		button_3: button_3
	});
}

function translate(format: string, args?: any[]): string {
	format = Translation.translate(format);
	if (args !== undefined) {
		if (!Array.isArray(args)) {
			args = [args];
		}
		args = args.map((value) => "" + value);
		format = java.lang.String.format(format, args);
	}
	return "" + format;
}

function isNumeralVerb(count: number): bool {
	if (count < 0) {
		count = Math.abs(count);
	}
	return count % 10 == 1 && count % 100 != 11;
}

function isNumeralMany(count: number): bool {
	if (count < 0) {
		count = Math.abs(count);
	}
	return count % 10 == 0 || count % 10 >= 5 || count % 100 - count % 10 == 10;
}

function translateNumeral(count: number, whenZero: string, whenVerb: string, whenOtherwise: string, args?: any[]): string {
	count = parseInt("" + count);
	if (args !== undefined) {
		if (!Array.isArray(args)) {
			args = [args];
		}
	} else {
		args = [count];
	}
	if (count != 0 && !isNumeralMany(count)) {
		let plural = "" + count;
		plural = plural.substring(0, plural.length - 1);
		args = args.map((value) => value == count ? plural : value);
	}
	return translate(count == 0 ? whenZero : isNumeralVerb(count) ? whenVerb :
		isNumeralMany(count) ? whenOtherwise.replace("%?", "") : whenOtherwise.replace("%?", count % 10), args);
}

function registerNumeralTranslation() {
	if (arguments.length % 2 == 1) {
		throw new RangeError("Numeral translations should be formatted in ('format', { .. translations }, ..)");
	}
	for (let i = 0, l = arguments.length; i < l; i += 2) {
		if (arguments[i].includes("%?")) {
			const format = Object.assign({}, arguments[i + 1]);
			for (const key in format) {
				format[key] = "" + format[key];
			}
			for (let i = 2; i <= 4; i++) {
				for (const key in format) {
					format[key] = format[key].replace("%?", i);
				}
				Translation.addTranslation(arguments[i].replace("%?", i), format);
			}
		} else {
			Translation.addTranslation(arguments[i], arguments[i + 1]);
		}
	}
}
