import itemModel from '../models/itemModel';

const {
  create, getItemQuery,
} = itemModel;


/**
 *
 *
 * @export
 * @class ItemController
 */
export default class ItemController {
  /**
     * 
     *
     * @static
     * @param {object} req
     * @param {object} res
     * @param {function} next
     * @returns {object} Item Details
     * @memberof ItemController
     */
  static async createItem(req, res) {
    try {
      const data = {...req.body, bucketList_id: req.params.id};
      const newItem = await create(data);
      return res.status(201).json({
        status: 'success',
        data: newItem,
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
  
}