import {instance} from "../../../assets/settings/instance-api";

export const packNameAPI = {
	getCards() {
		return instance.get('cards/card');
	},
	createCards() {
		return instance.post('cards/card');
	},
	deleteCards() {
		return instance.delete('cards/card');
	},
	updateCards() {
		return instance.delete('cards/card');
	},
}


