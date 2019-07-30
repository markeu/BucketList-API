import bucketListModel from '../models/bucketListModel';

const {
  create
} = bucketListModel;


/**
 *
 *
 * @export
 * @class BucketListController
 */
export default class BucketListController {
  /**
     * 
     *
     * @static
     * @param {object} req
     * @param {object} res
     * @param {function} next
     * @returns {object} bucketListsDetails
     * @memberof BucketListController
     */
  static async createBucketList(req, res) {
    try {
      const data = {...req.body, created_by: req.user.id};
      const newBucketList = await create(data);
      return res.status(201).json({
        status: 'success',
        data: newBucketList,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }
}