import bucketListModel from '../models/bucketListModel';

const {
  create, getbucketListQuery, selectOneBucketList
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

  /**
   * @description Get all bucketlists
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} bucketListsDetails
   * @memberof BucketListController
   */
  static async getAllbucketLists(req, res, next) {
    try {
      const allBucketLists = await getbucketListQuery();
      if (allBucketLists.length > 0) {
        return res.status(200).json({
            status: 'success',
            data: allBucketLists,
          });
      }
      return res.status(400).json({
        status: 'error',
        error: 'There are no bucketlist in this database',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }

/**
   * @description Get specific bucketlist
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} bucketListsDetails
   * @memberof BucketListController
   */
  static async getSpecificBucketList(req, res, next) {
    try {
      const { id } = req.params;
      const bucketListDetails = await selectOneBucketList(parseInt(id, 10));
      if (bucketListDetails) {
        return  res.status(200).json({
            status: 'success',
            data: bucketListDetails ,
          });
      }
        return  res.status(400).json({
            status: 'error',
            error: 'Bucketlist not found',
          });
    }catch (err) {
    return res.status(500).json({
      status: 'error',
      error: 'Internal server error',
    });
    }
  }
}