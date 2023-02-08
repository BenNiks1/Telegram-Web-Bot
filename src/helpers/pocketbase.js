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

	createRecord = async (userData) => {
		if(typeof userData === 'object' && Object.keys(userData).length) {
			try {
				const result = await pb.collection('records').create(userData);
				return result;
			} catch (error) {
				throw new Error('Can\'t create new record');
			}
		} else {
			throw new Error('userData was not provided properly');
		}
	}
}

export default new DataBase();
