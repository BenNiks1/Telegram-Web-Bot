import PocketBase from "pocketbase";
const pb = new PocketBase(process.env.VUE_APP_API_URL);

class DataBase {
	dates = [];

	getServices = async () => {
		const records = await pb.collection('services').getFullList(200, {
			sort: '-created',
		});

		return records || [];
	};

	getRecords = async () => {
		try {
			const records = await pb.collection('records').getFullList(200, {
				sort: '-created',
			});

			return records || [];
		} catch (error) {
			return [];
		}
	}

	getBusyDates = async () => {
		const allRecords = await this.getRecords();

		if(allRecords?.length) {
			const busyDates = allRecords.map((record) => record.date);

			return busyDates || [];
		} else {
			return [];
		}
	}
}

export default new DataBase();
