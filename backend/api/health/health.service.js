/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:12:35
 * @modify date 2021-10-26 07:53:38
 * @desc [description]
 */
const pool = require("../../config/database");

module.exports = {

    notifyMonthlyCheck: (data, callBack) => {

        const d = new Date();
        let date = d.getDate();
        //date=2;
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
        const found = array.filter(element => element == date);


        if (found.length > 0) {
            pool.query(`SELECT COUNT(AssetId)AssetUncheckedCount FROM asset_details WHERE EmployeeId=? AND MonthlyAssetCheck=False AND IsAvailable = 0 ;`, [data.EmployeeId],
                (error, results, fields) => {
                    console.log("COUNTING",results[0].AssetUncheckedCount);

                    if (results[0].AssetUncheckedCount>0) {
                        pool.query(`SELECT  assets.IsIdentifiable,asset_details.AssetId,asset_details.AssetName,asset_details.EmployeeId,asset_details.AssetDetails,
                        asset_details.Comments from asset_details INNER JOIN assets on assets.CategoryId=asset_details.CategoryId 
                        WHERE EmployeeId = ? AND MonthlyAssetCheck=False AND IsIdentifiable=1;`, [data.EmployeeId],
                            (error1, results1, fields1) => {
                                // if (error1) {
                                //     fields1="Error occured";
                                //     console.log("error e",fields1);
                                //     return callBack(error1, results1, fields1);
                                // }
                                // else {
                                    fields1="Montly Check list given";
                                    console.log("thik tae" ,fields1);
                                    return callBack(0, results1, fields1);
                                }

                            
                        )
                    }
                    else {
                        console.log("eta error" ,error);
                        fields="ALL Assets Checked or no assets assigned";
                        return callBack(error,0,fields);
                    }


                }
            )
        }
        else {
            fields="ALL Assets Checked or no assets assigned";
            return callBack(error, 0, fields);
        }

    },

    assetHealthInfo: (data, callBack) => {
            pool.query(`UPDATE asset_details SET IsOkay=?, Comments=?, MonthlyAssetCheck=? where AssetId =?;`, 
            [data.IsOkay, data.Comments, data.MonthlyAssetCheck, data.AssetId],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error,results);
                    }
                    return callBack(null, true);
                }
            )
    },





        

}

