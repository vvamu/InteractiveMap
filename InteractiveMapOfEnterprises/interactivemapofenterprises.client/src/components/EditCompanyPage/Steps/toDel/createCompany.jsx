import companiesService from "../../../../services/companiesService";
import ApplicationUrl from "../../../../models/ApplicationUrl";

export default async function createCompany({ newData, setErrors, handleReturn }) {


    try {
        let data = await companiesService.create(newData);

        if (!data) {
            let resUrl = ApplicationUrl.User.app.get + currentUser?.id
            handleReturn == null ? document.location = resUrl : document.location = resUrl

        }
        let resUrl = ApplicationUrl.Company.app.get + data.id
        handleReturn == null ? document.location = resUrl : document.location = resUrl

    }
    catch (ex) {
        let err = [{ message: ex?.message ?? ex }];
        setErrors(err);
    }
}